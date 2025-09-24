import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';

const ResultsDisplay = ({ results }) => {
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
      <div className="glass-card p-8 mb-8">
        <motion.h2 
          className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.3 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              className="glass-card p-4 group hover:neon-glow transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download size={16} />
                  </motion.button>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-pink-400 mb-2 line-clamp-2">
                {result.title}
              </h3>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  ID: {result.id}
                </span>
                <motion.a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <ExternalLink size={16} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-700 transition-all duration-300 neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DOWNLOAD ALL RESULTS
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;