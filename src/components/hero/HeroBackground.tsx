
import React from 'react';
import { motion } from 'framer-motion';
import { imageRevealVariants } from '@/lib/animations';

const HeroBackground = () => {
  return (
    <motion.div 
      className="relative w-full h-full flex items-center justify-center"
      variants={imageRevealVariants}
      initial="hidden"
      animate="visible"
    >
      <img 
        src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" 
        alt="Equipe ANGOHOST" 
        className="w-[90%] h-auto object-contain min-h-[500px] max-h-[900px]"
      />
    </motion.div>
  );
};

export default HeroBackground;
