'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingConfig } from '../../config/wedding-config';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
  duration?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  animation = 'slideUp',
  delay = 0,
  duration = 0.6 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, // 한 번만 애니메이션 실행
    margin: "-50px" // 50px 전에 미리 트리거
  });
  const { effects } = weddingConfig;

  // 이펙트가 비활성화되어 있으면 애니메이션 없이 렌더링
  if (!effects.enabled || !effects.scrollAnimation) {
    return <div ref={ref}>{children}</div>;
  }

  // 애니메이션 variants 정의
  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;

