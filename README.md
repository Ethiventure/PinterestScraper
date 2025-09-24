# Pinterest Scraper Web App

This project provides a modern web interface and API for scraping public Pinterest board URLs. The frontend is built with React and Vite, and the backend uses FastAPI to consume the public RSS feed that Pinterest exposes for boards.

## Features

- Animated single-page UI with dedicated tabs for scraping, viewing results, and configuring preferences.
- Backend endpoint (`POST /api/scrape`) that reads the RSS feed for any public Pinterest board and extracts pin metadata.
- Keyword, width, and height filters to narrow the results that are displayed.
- Copy helpers for quickly exporting pin data as TSV or copying all pin links.

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies

```bash
pip install -r requirements.txt
```

### Run the development servers

Start the FastAPI backend first:

```bash
uvicorn backend.app:app --reload
```

In a new terminal, start the Vite development server:

```bash
npm run dev
```

The React app will be available on [http://localhost:5173](http://localhost:5173). Requests to `/api/*` are proxied to the FastAPI server at `http://localhost:8000`.

## Scraping limitations

- The API relies on Pinterest's public RSS feed, so only public boards are supported. Private boards still require the original desktop automation script.
- Some pins may not expose width or height metadata; these entries are still returned but may not pass size filters if Pinterest omits the dimensions.

## Production build

To build the frontend for production, run:

```bash
npm run build
```

The compiled assets will be located in the `dist/` directory.
