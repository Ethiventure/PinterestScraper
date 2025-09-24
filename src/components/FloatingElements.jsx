import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Heart,
  Star,
  Circle,
  Triangle,
  Square,
  Hexagon
} from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    { Icon: Sparkles, color: 'text-pink-400', size: 'w-6 h-6', delay: 0 },
    { Icon: Zap, color: 'text-yellow-400', size: 'w-5 h-5', delay: 1 },
    { Icon: Heart, color: 'text-red-400', size: 'w-4 h-4', delay: 2 },
    { Icon: Star, color: 'text-purple-400', size: 'w-7 h-7', delay: 0.5 },
    { Icon: Circle, color: 'text-blue-400', size: 'w-3 h-3', delay: 1.5 },
    { Icon: Triangle, color: 'text-green-400', size: 'w-5 h-5', delay: 2.5 },
    { Icon: Square, color: 'text-orange-400', size: 'w-4 h-4', delay: 3 },
    { Icon: Hexagon, color: 'text-cyan-400', size: 'w-6 h-6', delay: 3.5 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => {
        const Icon = element.Icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} ${element.size} opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut'
            }}
          >
            <Icon />
          </motion.div>
        );
      })}

      {/* Additional geometric shapes */}
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.div
          key={`shape-${index}`}
          className="absolute opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            background: `linear-gradient(45deg, var(--main), var(--accent-${Math.random() > 0.5 ? '1' : '2'}))`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
