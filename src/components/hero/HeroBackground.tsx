
import React from 'react';
import { motion } from 'framer-motion';
import { imageRevealVariants } from '@/lib/animations';

const HeroBackground = () => {
  return (
    <motion.div 
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
      variants={imageRevealVariants}
      initial="hidden"
      animate="visible"
    >
      <img 
        src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" 
        alt="Equipe ANGOHOST" 
        className="w-[95%] h-[95%] object-contain scale-110"
      />
    </motion.div>
  );
};

export default HeroBackground;
