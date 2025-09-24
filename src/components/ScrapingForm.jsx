import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Download, 
  Search, 
  Zap,
  Eye,
  EyeOff,
  Globe,
  Shield
} from 'lucide-react';

const ScrapingForm = ({ 
  isPublicBoard, 
  setIsPublicBoard, 
  setScrapingResults, 
  isLoading, 
  setIsLoading 
}) => {
  const [formData, setFormData] = useState({
    boardUrl: '',
    keyword: '',
    email: '',
    password: '',
    minWidth: 450,
    minHeight: 500
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate scraping process
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: 'Artistic Design', url: 'https://example.com/1', image: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 2, title: 'Bold Typography', url: 'https://example.com/2', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 3, title: 'Layered Composition', url: 'https://example.com/3', image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ];
      setScrapingResults(mockResults);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 mb-8">
        {/* Board Type Toggle */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-card p-2 flex rounded-full">
            <motion.button
              onClick={() => setIsPublicBoard(true)}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 ${
                isPublicBoard 
                  ? 'bg-green-500 text-black neon-glow' 
                  : 'text-green-400 hover:text-green-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} />
              PUBLIC BOARD
            </motion.button>
            <motion.button
              onClick={() => setIsPublicBoard(false)}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 ${
                !isPublicBoard 
                  ? 'bg-red-500 text-black neon-glow' 
                  : 'text-red-400 hover:text-red-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield size={20} />
              PRIVATE BOARD
            </motion.button>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Board URL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-pink-400 font-bold mb-2 text-lg">
              PINTEREST BOARD URL
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
              <input
                type="url"
                value={formData.boardUrl}
                onChange={(e) => setFormData({...formData, boardUrl: e.target.value})}
                placeholder="https://pinterest.com/username/board-name/"
                className="w-full pl-12 pr-4 py-3 text-lg"
                required
              />
            </div>
          </motion.div>

          {/* Keyword */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-pink-400 font-bold mb-2 text-lg">
              SEARCH KEYWORD
            </label>
            <input
              type="text"
              value={formData.keyword}
              onChange={(e) => setFormData({...formData, keyword: e.target.value})}
              placeholder="artistic design, bold typography, etc."
              className="w-full px-4 py-3 text-lg"
              required
            />
          </motion.div>

          {/* Login Fields (only for private boards) */}
          {!isPublicBoard && (
            <motion.div 
              className="space-y-4 p-6 rounded-lg border-2 border-red-500/30 bg-red-500/5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-red-400 font-bold text-xl flex items-center gap-2">
                <Lock size={20} />
                PRIVATE BOARD CREDENTIALS
              </h3>
              
              <div>
                <label className="block text-red-400 font-bold mb-2">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-red-500"
                  required={!isPublicBoard}
                />
              </div>
              
              <div>
                <label className="block text-red-400 font-bold mb-2">PASSWORD</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border-red-500"
                    required={!isPublicBoard}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Image Size Filters */}
          <motion.div 
            className="grid md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <label className="block text-yellow-400 font-bold mb-2">MIN WIDTH (px)</label>
              <input
                type="number"
                value={formData.minWidth}
                onChange={(e) => setFormData({...formData, minWidth: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border-yellow-400"
                min="0"
              />
            </div>
            <div>
              <label className="block text-yellow-400 font-bold mb-2">MIN HEIGHT (px)</label>
              <input
                type="number"
                value={formData.minHeight}
                onChange={(e) => setFormData({...formData, minHeight: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border-yellow-400"
                min="0"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            className="text-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`px-12 py-4 rounded-full font-bold text-xl flex items-center gap-3 mx-auto transition-all duration-300 ${
                isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 neon-glow'
              }`}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap size={24} />
                  </motion.div>
                  SCRAPING...
                </>
              ) : (
                <>
                  <Download size={24} />
                  START SCRAPING
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default ScrapingForm;