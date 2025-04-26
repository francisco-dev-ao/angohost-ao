
import { Variants } from "framer-motion";

/**
 * Text animation variants
 */
export const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 }
  }
};

/**
 * Image reveal animation variants
 */
export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8 }
  }
};

/**
 * Container animation variants with staggered children
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

/**
 * Item animation variants for use within containers
 */
export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

/**
 * Fade in animation variants
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

/**
 * Scale animation variants
 */
export const scaleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

/**
 * Slide in from left animation variants
 */
export const slideFromLeftVariants: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

/**
 * Slide in from right animation variants
 */
export const slideFromRightVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};
