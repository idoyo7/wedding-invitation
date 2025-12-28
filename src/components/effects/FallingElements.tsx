'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

interface FallingElement {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const FallingElements: React.FC = () => {
  const [elements, setElements] = useState<FallingElement[]>([]);
  const { effects } = weddingConfig;

  // 이펙트가 비활성화되어 있으면 렌더링하지 않음
  if (!effects.enabled || effects.fallingElements === 'none') {
    return null;
  }

  useEffect(() => {
    // 떨어지는 요소들 생성
    const createElements = () => {
      const newElements: FallingElement[] = [];
      // 효과 타입에 따라 요소 개수 조절
      const count = effects.fallingElements === 'minimal' || effects.fallingElements === 'geometric' ? 8 : 15;

      for (let i = 0; i < count; i++) {
        const baseSize = effects.fallingElements === 'minimal' ? 0.6 : 
                        effects.fallingElements === 'geometric' ? 0.4 : 0.8;
        
        newElements.push({
          id: i,
          x: Math.random() * 100, // 0-100% 위치
          delay: Math.random() * 10, // 0-10초 지연
          duration: 8 + Math.random() * 6, // 8-14초 지속
          size: baseSize + Math.random() * 0.3, // 크기 조절
          rotation: Math.random() * 360, // 0-360도 회전
        });
      }

      setElements(newElements);
    };

    createElements();
    
    // 주기적으로 새로운 요소들 추가
    const interval = setInterval(createElements, 15000); // 15초마다 새로고침
    
    return () => clearInterval(interval);
  }, [effects.fallingElements]);

  // 떨어지는 요소의 이모지/텍스트 결정
  const getElementContent = () => {
    switch (effects.fallingElements) {
      case 'hearts':
        return ['💕', '💖', '💗', '💝', '💞'];
      case 'snow':
        return ['❄️'];
      case 'sparkles':
        return ['✨', '⭐', '💫', '🌟', '✦', '✧'];
      case 'minimal':
        return ['·', '∘', '◦', '°', '•']; // 심플한 점들
      case 'geometric':
        return ['◇', '◈', '◊', '△', '▽', '○'];
      default:
        return ['·'];
    }
  };

  const elementContents = getElementContent();

  return (
    <FallingContainer>
      {elements.map((element) => (
        <FallingElementComponent
          key={element.id}
          $elementType={effects.fallingElements}
          initial={{ 
            x: `${element.x}vw`,
            y: '-50px',
            rotate: element.rotation,
            opacity: 0
          }}
          animate={{ 
            y: '100vh',
            rotate: element.rotation + 360,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: element.duration
            }
          }}
          style={{
            fontSize: `${element.size}rem`,
          }}
        >
          {elementContents[Math.floor(Math.random() * elementContents.length)]}
        </FallingElementComponent>
      ))}
    </FallingContainer>
  );
};

const FallingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const FallingElementComponent = styled(motion.div)<{ $elementType: string }>`
  position: absolute;
  pointer-events: none;
  user-select: none;
  will-change: transform, opacity;
  
  ${props => {
    if (props.$elementType === 'minimal') {
      return `
        color: rgba(156, 163, 175, 0.4); /* 연한 회색 */
        font-weight: 100;
      `;
    }
    if (props.$elementType === 'geometric') {
      return `
        color: rgba(219, 234, 254, 0.6); /* 연한 파랑 */
        font-weight: 300;
        text-shadow: 0 0 8px rgba(219, 234, 254, 0.3);
      `;
    }
    return '';
  }}
`;

export default FallingElements;
