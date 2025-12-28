#!/bin/bash

# 이미지 비율 확인 스크립트

echo "🔍 이미지 비율 분석 중..."

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ORIGINAL_DIR="$PROJECT_ROOT/public/images/original"

echo "📂 분석 대상: $ORIGINAL_DIR"
echo ""

for i in 1 2 3 4 5 6 7 8 9 10 11 12 13; do
    image_file="$ORIGINAL_DIR/image${i}.jpg"
    if [ -f "$image_file" ]; then
        # identify 명령으로 이미지 정보 가져오기
        if command -v identify &> /dev/null; then
            dimensions=$(identify -format "%wx%h" "$image_file")
            width=$(echo $dimensions | cut -d'x' -f1)
            height=$(echo $dimensions | cut -d'x' -f2)
            
            # 비율 계산
            if [ "$width" -gt 0 ] && [ "$height" -gt 0 ]; then
                ratio=$(echo "scale=2; $width / $height" | bc 2>/dev/null || echo "$(($width * 100 / $height))e-2")
                
                # 방향 결정
                if [ "$width" -gt "$height" ]; then
                    orientation="가로형 📱"
                elif [ "$height" -gt "$width" ]; then
                    orientation="세로형 📱"
                else
                    orientation="정사각형 ⬜"
                fi
                
                echo "image${i}.jpg: ${width}x${height} (${ratio}) ${orientation}"
            fi
        else
            # identify가 없으면 file 명령 사용
            file_info=$(file "$image_file")
            echo "image${i}.jpg: $file_info"
        fi
    else
        echo "image${i}.jpg: 파일 없음 ❌"
    fi
done

echo ""
echo "🎨 추천 갤러리 비율:"
echo "• 3:2 비율 - 일반적인 사진 비율"
echo "• 4:3 비율 - 디지털 카메라 표준"
echo "• 16:9 비율 - 와이드 스크린"
echo "• Masonry 레이아웃 - 원본 비율 유지"
