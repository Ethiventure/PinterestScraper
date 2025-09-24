import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Layers } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      className="text-center py-12 relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-4 left-1/4 floating-element">
        <Sparkles className="text-pink-400 w-8 h-8 pulse" />
      </div>
      <div className="absolute top-8 right-1/4 floating-element" style={{ animationDelay: '1s' }}>
        <Zap className="text-yellow-400 w-6 h-6 pulse" />
      </div>
      <div className="absolute top-12 left-1/3 floating-element" style={{ animationDelay: '2s' }}>
        <Layers className="text-red-400 w-7 h-7 pulse" />
      </div>

      <motion.h1 
        className="text-6xl md:text-8xl lg:text-9xl mb-4 text-glow"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
      >
        PINTEREST
      </motion.h1>
      
      <motion.div
        className="text-4xl md:text-6xl lg:text-7xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ 
          background: 'linear-gradient(45deg, var(--accent-1), var(--accent-2), var(--main))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        SCRAPER
      </motion.div>

      <motion.p 
        className="text-xl md:text-2xl text-pink-300 font-bold max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        MAXIMALIST • BOLD • ARTISTIC
        <br />
        <span className="text-yellow-400">Extract Pinterest boards with STYLE</span>
      </motion.p>
    </motion.header>
  );
};

export default Header;