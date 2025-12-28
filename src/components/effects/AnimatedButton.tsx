'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  onClick, 
  className,
  disabled = false,
  type = 'button',
  variant = 'primary'
}) => {
  const { effects } = weddingConfig;

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: effects.enabled && effects.buttonAnimation ? 1.05 : 1,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: effects.enabled && effects.buttonAnimation ? 0.95 : 1,
      transition: { duration: 0.1 }
    }
  };

  const Button = motion.button;

  return (
    <StyledAnimatedButton
      as={Button}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
      $variant={variant}
      $effectsEnabled={effects.enabled && effects.buttonAnimation}
    >
      {children}
    </StyledAnimatedButton>
  );
};

const StyledAnimatedButton = styled(motion.button)<{ 
  $variant: 'primary' | 'secondary' | 'ghost';
  $effectsEnabled: boolean;
}>`
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
      case 'secondary':
        return `
          background: transparent;
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--text-color);
        `;
    }
  }}
  
  &:hover {
    ${props => props.$effectsEnabled && `
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      transform: translateY(-2px);
    `}
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  ${props => props.$effectsEnabled && `
    &:hover::before {
      left: 100%;
    }
  `}
`;

export default AnimatedButton;

