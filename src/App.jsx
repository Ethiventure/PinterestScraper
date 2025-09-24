import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Eye,
  Settings,
} from 'lucide-react';
import Header from './components/Header';
import ScrapingForm from './components/ScrapingForm';
import ResultsDisplay from './components/ResultsDisplay';
import SettingsPanel from './components/SettingsPanel';
import FloatingElements from './components/FloatingElements';

function App() {
  const [activeTab, setActiveTab] = useState('scrape');
  const [isPublicBoard, setIsPublicBoard] = useState(true);
  const [scrapingResults, setScrapingResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'scrape', label: 'SCRAPE', icon: Download, color: 'var(--main)' },
    { id: 'results', label: 'RESULTS', icon: Eye, color: 'var(--accent-1)' },
    { id: 'settings', label: 'SETTINGS', icon: Settings, color: 'var(--accent-2)' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />

      <div className="relative z-10">
        <Header />

        {/* Main Navigation */}
        <motion.div
          className="flex justify-center mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-2 flex gap-2 rounded-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'neon-glow text-black'
                      : 'text-white hover:text-pink-400'
                  }`}
                  style={{
                    background: activeTab === tab.id ? tab.color : 'transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="container mx-auto px-4 pb-20">
          <AnimatePresence mode="wait">
            {activeTab === 'scrape' && (
              <motion.div
                key="scrape"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ScrapingForm
                  isPublicBoard={isPublicBoard}
                  setIsPublicBoard={setIsPublicBoard}
                  setScrapingResults={setScrapingResults}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  error={error}
                  onScrapeComplete={() => setActiveTab('results')}
                />
              </motion.div>
            )}

            {activeTab === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ResultsDisplay results={scrapingResults} error={error} />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
