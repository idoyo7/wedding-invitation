'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding-config';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { effects } = weddingConfig;

  // 이펙트가 비활성화되어 있으면 애니메이션 없이 렌더링
  if (!effects.enabled || !effects.pageTransition) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: 20
      }}
      animate={{ 
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -20
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
        staggerChildren: 0.1
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

