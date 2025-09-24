"""FastAPI application that scrapes public Pinterest board feeds."""

from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, HttpUrl

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = 15


class ScrapeRequest(BaseModel):
    """Request body for the Pinterest board scrape endpoint."""

    board_url: HttpUrl = Field(..., description="Public Pinterest board URL")
    keyword: Optional[str] = Field(
        default=None,
        description="Optional keyword filter that matches against pin titles and descriptions.",
        max_length=200,
    )
    min_width: int = Field(
        default=0, ge=0, le=10000, description="Minimum image width required for a pin to be returned."
    )
    min_height: int = Field(
        default=0, ge=0, le=10000, description="Minimum image height required for a pin to be returned."
    )
    is_public: bool = Field(default=True, description="Whether the provided board is public.")
    email: Optional[str] = Field(default=None, description="Email address (unused for public boards).")
    password: Optional[str] = Field(default=None, description="Password (unused for public boards).")


@dataclass
class Pin:
    """Structured representation of a Pinterest pin."""

    title: str
    url: str
    image: Optional[str]
    description: str
    width: Optional[int]
    height: Optional[int]
    keyword: Optional[str]

    def to_dict(self, idx: int) -> dict:
        return {
            "id": idx,
            "title": self.title,
            "url": self.url,
            "image": self.image,
            "description": self.description,
            "width": self.width,
            "height": self.height,
            "keyword": self.keyword,
        }


app = FastAPI(title="Pinterest Scraper API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _validate_board_url(board_url: str) -> str:
    parsed = urlparse(board_url)
    if "pinterest." not in parsed.netloc:
        raise HTTPException(status_code=400, detail="The supplied URL must point to pinterest.com.")

    path = parsed.path.strip("/")
    if not path:
        raise HTTPException(status_code=400, detail="The URL must reference a specific Pinterest board.")

    return f"{parsed.scheme}://{parsed.netloc}/{path}.rss"


def _extract_image_from_description(description_html: str) -> tuple[Optional[str], Optional[int], Optional[int]]:
    if not description_html:
        return None, None, None

    soup = BeautifulSoup(description_html, "html.parser")
    image = soup.find("img")
    if not image:
        return None, None, None

    src = image.get("src")
    width = image.get("width")
    height = image.get("height")

    try:
        width_int = int(width) if width is not None else None
    except ValueError:
        width_int = None
    try:
        height_int = int(height) if height is not None else None
    except ValueError:
        height_int = None

    return src, width_int, height_int


def _clean_text(html_fragment: Optional[str]) -> str:
    if not html_fragment:
        return ""
    soup = BeautifulSoup(html_fragment, "html.parser")
    return soup.get_text(" ", strip=True)


def _parse_feed_items(items, keyword: Optional[str], min_width: int, min_height: int) -> List[Pin]:
    pins: List[Pin] = []
    lowered_keyword = keyword.lower() if keyword else None

    for item in items:
        title = item.title.get_text(strip=True) if item.title else "Untitled Pin"
        link = item.link.get_text(strip=True) if item.link else ""
        description_html = item.description.get_text() if item.description else ""
        description_text = _clean_text(description_html)

        media = item.find("media:content")
        if media and media.get("url"):
            image_url = media.get("url")
            width = media.get("width")
            height = media.get("height")
        else:
            image_url, width, height = _extract_image_from_description(description_html)

        width_int = int(width) if isinstance(width, str) and width.isdigit() else width or 0
        height_int = int(height) if isinstance(height, str) and height.isdigit() else height or 0

        if lowered_keyword:
            haystack = f"{title} {description_text}".lower()
            if lowered_keyword not in haystack:
                continue

        if min_width and width_int and width_int < min_width:
            continue
        if min_height and height_int and height_int < min_height:
            continue

        pins.append(
            Pin(
                title=title,
                url=link,
                image=image_url,
                description=description_text,
                width=width_int or None,
                height=height_int or None,
                keyword=keyword,
            )
        )

    return pins


@app.get("/api/health")
def healthcheck() -> dict:
    """Simple health endpoint for monitoring."""

    return {"status": "ok"}


@app.post("/api/scrape")
def scrape_board(payload: ScrapeRequest) -> dict:
    """Scrape a public Pinterest board using its RSS feed."""

    if not payload.is_public:
        raise HTTPException(status_code=501, detail="Scraping private boards is not supported by the web API.")

    rss_url = _validate_board_url(str(payload.board_url))

    headers = {"User-Agent": USER_AGENT}
    try:
        response = requests.get(rss_url, headers=headers, timeout=REQUEST_TIMEOUT)
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail=f"Unable to reach Pinterest: {exc}") from exc

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Pinterest returned an unexpected response for that board.")

    soup = BeautifulSoup(response.text, "xml")
    items = soup.find_all("item")
    if not items:
        raise HTTPException(status_code=404, detail="No pins were found for the provided board URL.")

    pins = _parse_feed_items(items, payload.keyword, payload.min_width, payload.min_height)

    return {
        "board": {
            "request_url": str(payload.board_url),
            "rss_url": rss_url,
            "total_items": len(items),
            "returned_items": len(pins),
        },
        "pins": [pin.to_dict(idx) for idx, pin in enumerate(pins, start=1)],
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend.app:app", host="0.0.0.0", port=8000, reload=True)
