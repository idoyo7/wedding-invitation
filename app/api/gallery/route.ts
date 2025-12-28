import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { weddingConfig } from '../../../src/config/wedding-config';

export async function GET() {
  try {
    // 갤러리 폴더 경로
    const galleryDir = path.join(process.cwd(), 'public/images/gallery');
    const thumbsDir = path.join(galleryDir, 'thumbs');
    
    // 폴더가 존재하지 않는 경우
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json({ images: weddingConfig.gallery.images, thumbs: [] });
    }
    
    // 폴더 내 파일 목록 읽기
    const files = fs.readdirSync(galleryDir);
    const thumbFiles = fs.existsSync(thumbsDir) ? fs.readdirSync(thumbsDir) : [];
    
    // 스마트 이미지 선택: full + thumb 각각 선택
    const smartImages: string[] = [];
    const smartThumbs: string[] = [];
    
    // image1~image9까지 확인
    for (let i = 1; i <= 9; i++) {
      const webpFile = `image${i}.webp`;
      const jpgFile = `image${i}.jpg`;
      const thumbWebpFile = `image${i}.webp`;
      
      if (files.includes(webpFile)) {
        // WebP가 존재하면 WebP 사용
        smartImages.push(`/images/gallery/${webpFile}`);
      } else if (files.includes(jpgFile)) {
        // WebP가 없고 JPG가 존재하면 JPG 사용
        smartImages.push(`/images/gallery/${jpgFile}`);
      }

      // 썸네일은 thumbs 디렉토리 우선 (없으면 full로 fallback)
      if (thumbFiles.includes(thumbWebpFile)) {
        smartThumbs.push(`/images/gallery/thumbs/${thumbWebpFile}`);
      } else if (files.includes(webpFile)) {
        smartThumbs.push(`/images/gallery/${webpFile}`);
      } else if (files.includes(jpgFile)) {
        smartThumbs.push(`/images/gallery/${jpgFile}`);
      }
    }
    
    return NextResponse.json({ images: smartImages, thumbs: smartThumbs });
  } catch (error) {
    console.error('갤러리 이미지 로드 오류:', error);
    return NextResponse.json(
      { 
        error: '갤러리 이미지를 불러오는 중 오류가 발생했습니다.',
        images: weddingConfig.gallery.images, // 에러 시 config 설정 반환
        thumbs: []
      }, 
      { status: 500 }
    );
  }
} 