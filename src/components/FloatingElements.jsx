import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Layers, 
  Circle, 
  Square, 
  Triangle,
  Star,
  Heart,
  Diamond
} from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    { Icon: Sparkles, color: 'text-pink-400', size: 'w-6 h-6', delay: 0 },
    { Icon: Zap, color: 'text-yellow-400', size: 'w-8 h-8', delay: 1 },
    { Icon: Layers, color: 'text-purple-400', size: 'w-5 h-5', delay: 2 },
    { Icon: Star, color: 'text-red-400', size: 'w-7 h-7', delay: 3 },
    { Icon: Heart, color: 'text-pink-300', size: 'w-6 h-6', delay: 4 },
    { Icon: Circle, color: 'text-blue-400', size: 'w-4 h-4', delay: 5 },
    { Icon: Square, color: 'text-green-400', size: 'w-5 h-5', delay: 6 },
    { Icon: Triangle, color: 'text-orange-400', size: 'w-6 h-6', delay: 7 },
    { Icon: Diamond, color: 'text-cyan-400', size: 'w-5 h-5', delay: 8 }
  ];

  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '8%' },
    { top: '35%', left: '3%' },
    { top: '50%', right: '5%' },
    { top: '65%', left: '7%' },
    { top: '80%', right: '10%' },
    { top: '15%', left: '50%' },
    { top: '75%', left: '45%' },
    { top: '40%', right: '30%' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => {
        const { Icon, color, size, delay } = element;
        const position = positions[index];
        
        return (
          <motion.div
            key={index}
            className={`absolute ${color} ${size} opacity-20`}
            style={position}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: 0
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
              y: [-20, 20, -20]
            }}
            transition={{
              duration: 8 + (index * 0.5),
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        );
      })}

      {/* Geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [0.5, 1, 0.5],
            rotate: [0, 360]
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear"
          }}
        >
          <div 
            className={`w-full h-full ${
              i % 3 === 0 ? 'bg-pink-500' : 
              i % 3 === 1 ? 'bg-yellow-500' : 'bg-purple-500'
            } ${
              i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'
            } opacity-20`}
          />
        </motion.div>
      ))}

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-100, 100, -100],
            x: [-50, 50, -50],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 15 + (i * 0.8),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Gradient orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl opacity-10"
          style={{
            top: `${20 + (i * 20)}%`,
            left: `${10 + (i * 25)}%`,
            width: `${100 + (i * 50)}px`,
            height: `${100 + (i * 50)}px`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, #f44ec6, transparent)' 
              : 'radial-gradient(circle, #d6164f, transparent)'
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.05, 0.2, 0.05],
            x: [-30, 30, -30],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 20 + (i * 3),
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;