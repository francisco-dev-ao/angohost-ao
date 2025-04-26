
import React from 'react';
import { motion } from 'framer-motion';

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8 }
  }
};

const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30 z-10"></div>
      
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          className="w-full h-full"
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
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white/10 to-transparent z-20"></div>
    </>
  );
};

export default HeroBackground;
