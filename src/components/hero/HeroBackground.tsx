
import React from 'react';
import { motion } from 'framer-motion';
import { imageRevealVariants } from '@/lib/animations';

const HeroBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      variants={imageRevealVariants}
      initial="hidden"
      animate="visible"
    >
      <img 
        src="/lovable-uploads/198cbc98-86c6-4598-8d0a-bed3b41b6d9f.png" 
        alt="Equipe ANGOHOST" 
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default HeroBackground;
