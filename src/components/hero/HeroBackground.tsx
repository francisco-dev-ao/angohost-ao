
import React from 'react';
import { motion } from 'framer-motion';
import { imageRevealVariants } from '@/lib/animations';

const HeroBackground = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-angohost-800/30 to-angohost-900/30 z-10"></div>
      <motion.div 
        className="aspect-video w-full relative"
        variants={imageRevealVariants}
        initial="hidden"
        animate="visible"
      >
        <img 
          src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" 
          alt="Equipe ANGOHOST" 
          className="w-full h-full object-cover rounded-lg brightness-105 contrast-110"
        />
      </motion.div>
    </div>
  );
};

export default HeroBackground;
