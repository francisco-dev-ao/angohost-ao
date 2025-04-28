
import React from 'react';
import { motion } from 'framer-motion';
import { imageRevealVariants } from '@/lib/animations';

const HeroBackground = () => {
  return (
    <motion.div 
      className="relative h-full w-full"
      variants={imageRevealVariants}
      initial="hidden"
      animate="visible"
    >
      <img 
        src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" 
        alt="Equipe ANGOHOST" 
        className="w-full h-auto object-contain max-h-[800px]"
      />
    </motion.div>
  );
};

export default HeroBackground;
