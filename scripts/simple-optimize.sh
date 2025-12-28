#!/bin/bash

# 간단한 이미지 최적화 스크립트 (jpegoptim 사용)

echo "🖼️ 간단한 이미지 최적화 시작..."

# 프로젝트 루트 찾기
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ORIGINAL_DIR="$PROJECT_ROOT/public/images/original"
GALLERY_DIR="$PROJECT_ROOT/public/images/gallery"

echo "📂 원본: $ORIGINAL_DIR"
echo "📂 출력: $GALLERY_DIR"

# 갤러리 디렉토리 생성
mkdir -p "$GALLERY_DIR"

# jpegoptim 확인
if ! command -v jpegoptim &> /dev/null; then
    echo "❌ jpegoptim이 설치되지 않음"
    echo "설치: sudo apt-get install jpegoptim"
    exit 1
fi

# 1-13번 이미지 처리
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13; do
    original="$ORIGINAL_DIR/image${i}.jpg"
    output="$GALLERY_DIR/image${i}.jpg"
    
    if [ -f "$original" ]; then
        echo "🔄 처리 중: image${i}.jpg"
        
        # 원본을 갤러리로 복사
        cp "$original" "$output"
        
        # jpegoptim으로 최적화
        jpegoptim --max=75 --strip-all "$output"
        
        # 크기 확인
        original_size=$(stat -c%s "$original" 2>/dev/null || stat -f%z "$original")
        output_size=$(stat -c%s "$output" 2>/dev/null || stat -f%z "$output")
        original_mb=$((original_size / 1024 / 1024))
        output_mb=$((output_size / 1024 / 1024))
        
        echo "✅ 완료: image${i}.jpg (${original_mb}MB → ${output_mb}MB)"
    else
        echo "⚠️ 파일 없음: $original"
    fi
done

# 불필요한 파일 제거
for i in 14 15 16 17 18 19 20; do
    rm -f "$GALLERY_DIR/image${i}.jpg"
done

echo ""
echo "🎉 최적화 완료!"
ls -lh "$GALLERY_DIR"/image*.jpg 2>/dev/null
