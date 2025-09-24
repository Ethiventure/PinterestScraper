import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Folder, 
  Image as ImageIcon, 
  Download,
  Palette,
  Zap,
  Save
} from 'lucide-react';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    downloadPath: '/Downloads/Pinterest',
    imageFormat: 'jpg',
    maxImages: 100,
    concurrent: 5,
    retryAttempts: 3,
    timeout: 30
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <Settings className="text-yellow-400" />
          SCRAPER SETTINGS
          <Settings className="text-yellow-400" />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Download Settings */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-pink-400 flex items-center gap-2">
              <Download size={24} />
              DOWNLOAD SETTINGS
            </h3>
            
            <div>
              <label className="block text-pink-400 font-bold mb-2">
                DOWNLOAD PATH
              </label>
              <div className="relative">
                <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
                <input
                  type="text"
                  value={settings.downloadPath}
                  onChange={(e) => setSettings({...settings, downloadPath: e.target.value})}
                  className="w-full pl-12 pr-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-pink-400 font-bold mb-2">
                IMAGE FORMAT
              </label>
              <select
                value={settings.imageFormat}
                onChange={(e) => setSettings({...settings, imageFormat: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border-2 border-pink-500 rounded-lg text-pink-400"
              >
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>

            <div>
              <label className="block text-pink-400 font-bold mb-2">
                MAX IMAGES PER SCRAPE
              </label>
              <input
                type="number"
                value={settings.maxImages}
                onChange={(e) => setSettings({...settings, maxImages: parseInt(e.target.value)})}
                className="w-full px-4 py-3"
                min="1"
                max="1000"
              />
            </div>
          </motion.div>

          {/* Performance Settings */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
              <Zap size={24} />
              PERFORMANCE SETTINGS
            </h3>
            
            <div>
              <label className="block text-yellow-400 font-bold mb-2">
                CONCURRENT DOWNLOADS
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={settings.concurrent}
                onChange={(e) => setSettings({...settings, concurrent: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="text-center text-yellow-300 mt-2 font-bold">
                {settings.concurrent} simultaneous downloads
              </div>
            </div>

            <div>
              <label className="block text-yellow-400 font-bold mb-2">
                RETRY ATTEMPTS
              </label>
              <input
                type="number"
                value={settings.retryAttempts}
                onChange={(e) => setSettings({...settings, retryAttempts: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border-yellow-400"
                min="1"
                max="10"
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-bold mb-2">
                TIMEOUT (seconds)
              </label>
              <input
                type="number"
                value={settings.timeout}
                onChange={(e) => setSettings({...settings, timeout: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border-yellow-400"
                min="5"
                max="120"
              />
            </div>
          </motion.div>
        </div>

        {/* Color Palette Preview */}
        <motion.div 
          className="mt-12 p-6 glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Palette size={24} />
            MAXIMALIST COLOR PALETTE
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-2" style={{background: 'var(--main)'}}></div>
              <span className="text-sm font-bold">MAIN</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-2" style={{background: 'var(--accent-1)'}}></div>
              <span className="text-sm font-bold">ACCENT 1</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-2" style={{background: 'var(--accent-2)'}}></div>
              <span className="text-sm font-bold">ACCENT 2</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-2" style={{background: 'var(--text)'}}></div>
              <span className="text-sm font-bold">TEXT</span>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-xl flex items-center gap-3 mx-auto hover:from-purple-600 hover:to-pink-700 transition-all duration-300 neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save size={24} />
            SAVE SETTINGS
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;