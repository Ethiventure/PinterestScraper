import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Folder, 
  Image as ImageIcon,
  Zap,
  Download,
  Palette,
  Monitor,
  Save,
  RotateCcw
} from 'lucide-react';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    downloadPath: '/Downloads/Pinterest',
    maxConcurrentDownloads: 5,
    imageQuality: 'high',
    fileNaming: 'keyword_number',
    createSubfolders: true,
    skipDuplicates: true,
    minImageSize: { width: 450, height: 500 },
    maxImageSize: { width: 2000, height: 2000 },
    retryAttempts: 3,
    delayBetweenRequests: 1000
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSizeChange = (dimension, value) => {
    setSettings(prev => ({
      ...prev,
      minImageSize: {
        ...prev.minImageSize,
        [dimension]: parseInt(value) || 0
      }
    }));
  };

  const resetToDefaults = () => {
    setSettings({
      downloadPath: '/Downloads/Pinterest',
      maxConcurrentDownloads: 5,
      imageQuality: 'high',
      fileNaming: 'keyword_number',
      createSubfolders: true,
      skipDuplicates: true,
      minImageSize: { width: 450, height: 500 },
      maxImageSize: { width: 2000, height: 2000 },
      retryAttempts: 3,
      delayBetweenRequests: 1000
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <Settings className="w-12 h-12 text-yellow-400" />
          <h2 className="text-5xl font-bold">SETTINGS</h2>
        </motion.div>
        <p className="text-xl text-gray-300">Configure your scraping preferences</p>
      </div>

      {/* Download Settings */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
          <Download className="w-6 h-6" />
          DOWNLOAD SETTINGS
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-pink-300 font-bold mb-2">DOWNLOAD PATH</label>
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
              <input
                type="text"
                value={settings.downloadPath}
                onChange={(e) => handleSettingChange('downloadPath', e.target.value)}
                className="w-full pl-12 pr-4 py-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-pink-300 font-bold mb-2">MAX CONCURRENT DOWNLOADS</label>
            <input
              type="number"
              value={settings.maxConcurrentDownloads}
              onChange={(e) => handleSettingChange('maxConcurrentDownloads', parseInt(e.target.value))}
              className="w-full px-4 py-3"
              min="1"
              max="10"
            />
          </div>

          <div>
            <label className="block text-pink-300 font-bold mb-2">IMAGE QUALITY</label>
            <select
              value={settings.imageQuality}
              onChange={(e) => handleSettingChange('imageQuality', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-pink-500 rounded-lg text-pink-400"
            >
              <option value="low">Low (236px)</option>
              <option value="medium">Medium (474px)</option>
              <option value="high">High (736px)</option>
              <option value="original">Original</option>
            </select>
          </div>

          <div>
            <label className="block text-pink-300 font-bold mb-2">FILE NAMING</label>
            <select
              value={settings.fileNaming}
              onChange={(e) => handleSettingChange('fileNaming', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-pink-500 rounded-lg text-pink-400"
            >
              <option value="keyword_number">keyword_001.jpg</option>
              <option value="title">pin_title.jpg</option>
              <option value="timestamp">timestamp.jpg</option>
              <option value="original">original_name.jpg</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.createSubfolders}
              onChange={(e) => handleSettingChange('createSubfolders', e.target.checked)}
              className="w-5 h-5 text-pink-500"
            />
            <span className="text-pink-300 font-bold">CREATE SUBFOLDERS BY KEYWORD</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.skipDuplicates}
              onChange={(e) => handleSettingChange('skipDuplicates', e.target.checked)}
              className="w-5 h-5 text-pink-500"
            />
            <span className="text-pink-300 font-bold">SKIP DUPLICATE IMAGES</span>
          </label>
        </div>
      </motion.div>

      {/* Image Filtering */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
          <ImageIcon className="w-6 h-6" />
          IMAGE FILTERING
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-yellow-300 font-bold mb-2">MIN WIDTH (px)</label>
            <input
              type="number"
              value={settings.minImageSize.width}
              onChange={(e) => handleSizeChange('width', e.target.value)}
              className="w-full px-4 py-3 border-yellow-400"
              min="0"
            />
          </div>

          <div>
            <label className="block text-yellow-300 font-bold mb-2">MIN HEIGHT (px)</label>
            <input
              type="number"
              value={settings.minImageSize.height}
              onChange={(e) => handleSizeChange('height', e.target.value)}
              className="w-full px-4 py-3 border-yellow-400"
              min="0"
            />
          </div>
        </div>
      </motion.div>

      {/* Performance Settings */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          PERFORMANCE
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-red-300 font-bold mb-2">RETRY ATTEMPTS</label>
            <input
              type="number"
              value={settings.retryAttempts}
              onChange={(e) => handleSettingChange('retryAttempts', parseInt(e.target.value))}
              className="w-full px-4 py-3 border-red-400"
              min="1"
              max="10"
            />
          </div>

          <div>
            <label className="block text-red-300 font-bold mb-2">DELAY BETWEEN REQUESTS (ms)</label>
            <input
              type="number"
              value={settings.delayBetweenRequests}
              onChange={(e) => handleSettingChange('delayBetweenRequests', parseInt(e.target.value))}
              className="w-full px-4 py-3 border-red-400"
              min="100"
              step="100"
            />
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={resetToDefaults}
          className="px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded-full font-bold flex items-center gap-2 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={20} />
          RESET TO DEFAULTS
        </motion.button>

        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-full font-bold flex items-center gap-2 neon-glow transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={20} />
          SAVE SETTINGS
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPanel;