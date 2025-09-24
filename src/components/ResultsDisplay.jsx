import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  Image as ImageIcon,
  Grid,
  List,
  Link,
  Table,
  Copy,
  Check,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const ResultsDisplay = ({ results = [], error = null }) => {
  const [viewMode, setViewMode] = React.useState('grid');
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateTSVData = () => {
    const headers = ['Title', 'URL', 'Image URL', 'Keyword', 'Description'].join('\t');
    const rows = results.map(result => [
      result.title || 'N/A',
      result.url || 'N/A',
      result.image || 'N/A',
      result.keyword || 'N/A',
      result.description || 'N/A'
    ].join('\t'));
    return [headers, ...rows].join('\n');
  };

  if (error && results.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="glass-card p-12 max-w-2xl mx-auto text-yellow-200">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">SCRAPING ISSUE</h2>
          <p className="text-xl text-yellow-100">
            {error}
          </p>
        </div>
      </motion.div>
    );
  }

  if (results.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="glass-card p-12 max-w-2xl mx-auto">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ImageIcon className="w-24 h-24 text-pink-400 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 text-pink-400">NO RESULTS YET</h2>
          <p className="text-xl text-gray-300">
            Start scraping to see your Pinterest board results here!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <motion.div
          className="glass-card p-4 mb-6 border border-yellow-500/40 bg-yellow-500/10 text-yellow-100 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertTriangle size={24} />
          {error}
        </motion.div>
      )}

      <div className="glass-card p-8 mb-8">
        <motion.h2
          className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.3 }}
        >
          <Sparkles className="text-yellow-400" />
          SCRAPING RESULTS
          <Sparkles className="text-yellow-400" />
        </motion.h2>

        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-pink-400">
            {results.length} PINS FOUND
          </span>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* View Mode Toggle */}
          <div className="glass-card p-2 flex rounded-full">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-full transition-all ${
                viewMode === 'grid'
                  ? 'bg-pink-500 text-black'
                  : 'text-pink-400 hover:text-pink-300'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-full transition-all ${
                viewMode === 'list'
                  ? 'bg-pink-500 text-black'
                  : 'text-pink-400 hover:text-pink-300'
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('links')}
              className={`p-3 rounded-full transition-all ${
                viewMode === 'links'
                  ? 'bg-pink-500 text-black'
                  : 'text-pink-400 hover:text-pink-300'
              }`}
            >
              <Link size={20} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-full transition-all ${
                viewMode === 'table'
                  ? 'bg-pink-500 text-black'
                  : 'text-pink-400 hover:text-pink-300'
              }`}
            >
              <Table size={20} />
            </button>
          </div>

          {/* Copy TSV Button (only show in table mode) */}
          {viewMode === 'table' && (
            <motion.button
              onClick={() => copyToClipboard(generateTSVData())}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
                copied
                  ? 'bg-green-500 text-black'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'COPIED!' : 'COPY FOR SHEETS'}
            </motion.button>
          )}

          {/* Download All Button */}
          <motion.button
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => copyToClipboard(results.map(result => result.url).join('\n'))}
          >
            <Download size={20} />
            COPY ALL LINKS
          </motion.button>
        </div>
      </div>

      {/* Results Display */}
      {viewMode === 'links' && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
            <Link className="w-6 h-6" />
            CLICKABLE LINKS
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <motion.a
                key={result.id ?? index}
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-gray-800/50 hover:bg-pink-500/20 border border-pink-500/30 hover:border-pink-400 transition-all duration-300 text-pink-300 hover:text-pink-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex items-center gap-3">
                  <ExternalLink size={16} className="text-pink-400" />
                  <span className="font-bold">{result.title}</span>
                </div>
                <div className="text-sm text-gray-400 ml-7 truncate">{result.url}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {viewMode === 'table' && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Table className="w-6 h-6" />
            SPREADSHEET DATA
          </h3>
          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="whitespace-pre-wrap text-green-400">
              {generateTSVData()}
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Click "COPY FOR SHEETS" above, then paste directly into Google Sheets or Excel
          </p>
        </motion.div>
      )}

      {(viewMode === 'grid' || viewMode === 'list') && (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {results.map((result, index) => (
            <motion.div
              key={result.id ?? index}
              className="glass-card p-4 group hover:neon-glow transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={result.image || 'https://via.placeholder.com/400x300?text=No+Preview'}
                      alt={result.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-bold text-pink-400 mb-2 truncate">{result.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{result.description}</p>
                  <div className="flex items-center justify-between">
                    <button
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      onClick={() => copyToClipboard(result.image || '')}
                    >
                      <Download size={16} />
                    </button>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <img
                    src={result.image || 'https://via.placeholder.com/200x200?text=No+Preview'}
                    alt={result.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-pink-400">{result.title}</h3>
                    <p className="text-gray-400 text-sm">{result.url}</p>
                    {result.description && (
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{result.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-yellow-400 hover:text-yellow-300 p-2 rounded-full hover:bg-yellow-400/10 transition-all"
                      onClick={() => copyToClipboard(result.image || '')}
                    >
                      <Download size={16} />
                    </button>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 p-2 rounded-full hover:bg-blue-400/10 transition-all"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;
