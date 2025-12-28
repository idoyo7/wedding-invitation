'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../../config/wedding-config';

// 개발 환경에서만 표시되는 이펙트 컨트롤러
const EffectsController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 프로덕션 환경에서는 표시하지 않음
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const { effects } = weddingConfig;

  return (
    <ControllerContainer>
      <ToggleButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        $isOpen={isOpen}
      >
        🎨
      </ToggleButton>
      
      <AnimatePresence>
        {isOpen && (
          <ControlPanel
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <PanelTitle>🎭 이펙트 설정</PanelTitle>
            
            <EffectGroup>
              <EffectLabel>
                <EffectToggle 
                  type="checkbox" 
                  checked={effects.enabled}
                  readOnly
                />
                전체 이펙트 활성화
              </EffectLabel>
            </EffectGroup>

            <EffectGroup>
              <EffectLabel>
                <EffectToggle 
                  type="checkbox" 
                  checked={effects.pageTransition}
                  readOnly
                />
                페이지 트랜지션
              </EffectLabel>
              
              <EffectLabel>
                <EffectToggle 
                  type="checkbox" 
                  checked={effects.scrollAnimation}
                  readOnly
                />
                스크롤 애니메이션
              </EffectLabel>
              
              <EffectLabel>
                <EffectToggle 
                  type="checkbox" 
                  checked={effects.imageHover}
                  readOnly
                />
                이미지 호버 효과
              </EffectLabel>
            </EffectGroup>

            <EffectGroup>
              <EffectLabel>
                <EffectToggle 
                  type="checkbox" 
                  checked={effects.galleryAnimation}
                  readOnly
                />
                갤러리 애니메이션
              </EffectLabel>
              
              <EffectLabel>
                <EffectToggle 
                  type="checkbox" 
                  checked={effects.buttonAnimation}
                  readOnly
                />
                버튼 애니메이션
              </EffectLabel>
            </EffectGroup>

            <EffectGroup>
              <EffectDescription>
                떨어지는 요소: <strong>{effects.fallingElements}</strong>
                <br />
                <small style={{ color: '#888', fontSize: '11px' }}>
                  옵션: none, hearts, petals, snow, sparkles, minimal, geometric
                </small>
              </EffectDescription>
            </EffectGroup>

            <Note>
              💡 이펙트 설정을 변경하려면 <code>wedding-config.ts</code>의 <code>effects</code> 섹션을 수정하세요.
            </Note>
          </ControlPanel>
        )}
      </AnimatePresence>
    </ControllerContainer>
  );
};

const ControllerContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const ToggleButton = styled(motion.button)<{ $isOpen: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isOpen ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  };
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ControlPanel = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 0;
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
`;

const PanelTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const EffectGroup = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EffectLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EffectToggle = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const EffectDescription = styled.div`
  font-size: 14px;
  color: #666;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
`;

const Note = styled.div`
  font-size: 12px;
  color: #888;
  line-height: 1.4;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  
  code {
    background: #f1f3f4;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: monospace;
  }
`;

export default EffectsController;
