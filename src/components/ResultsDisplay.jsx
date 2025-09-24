import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Image as ImageIcon,
  Grid,
  List,
  Filter
} from 'lucide-react';

const ResultsDisplay = ({ results = [] }) => {
  const [viewMode, setViewMode] = React.useState('grid');
  const [filter, setFilter] = React.useState('all');

  if (results.length === 0) {
    return (
      <motion.div 
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="glass-card p-12 max-w-2xl mx-auto">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <ImageIcon className="w-24 h-24 mx-auto text-pink-400" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 text-pink-400">NO RESULTS YET</h2>
          <p className="text-xl text-gray-300">
            Start scraping to see your Pinterest pins appear here!
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
      {/* Header Controls */}
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">SCRAPED RESULTS</h2>
            <p className="text-pink-300">Found {results.length} pins</p>
          </div>
          
          <div className="flex items-center gap-4">
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
            </div>

            {/* Download All Button */}
            <motion.button
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 neon-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              DOWNLOAD ALL
            </motion.button>
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
      }`}>
        {results.map((result, index) => (
          <motion.div
            key={result.id}
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
                    src={result.image}
                    alt={result.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-bold text-pink-400 mb-2 truncate">{result.title}</h3>
                <div className="flex items-center justify-between">
                  <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
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
                  src={result.image}
                  alt={result.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-pink-400">{result.title}</h3>
                  <p className="text-gray-400 text-sm">{result.url}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-yellow-400 hover:text-yellow-300 p-2 rounded-full hover:bg-yellow-400/10 transition-all">
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
    </motion.div>
  );
};

export default ResultsDisplay;