import { useState, useRef, useCallback, useEffect } from 'react';

// 슬라이더 손잡이
import handleIcon from '../../assets/archive/handle.svg';

// 활동 사진 import
import img1 from '../../assets/archive/activityimg/1.jpg';
import img2 from '../../assets/archive/activityimg/2.jpg';
import img3 from '../../assets/archive/activityimg/3.jpg';
import img4 from '../../assets/archive/activityimg/4.jpg';
import img5 from '../../assets/archive/activityimg/5.jpg';
import img6 from '../../assets/archive/activityimg/6.jpg';
import img7 from '../../assets/archive/activityimg/7.jpg';
import img8 from '../../assets/archive/activityimg/8.jpg';
import img9 from '../../assets/archive/activityimg/9.jpg';
import img10 from '../../assets/archive/activityimg/10.jpg';
import img11 from '../../assets/archive/activityimg/11.jpg';
import img12 from '../../assets/archive/activityimg/12.jpg';
import img13 from '../../assets/archive/activityimg/13.jpg';
import img14 from '../../assets/archive/activityimg/14.jpg';
import img15 from '../../assets/archive/activityimg/15.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

const ActivityGallery = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 500, height: 360 });
    const [sliderWidth, setSliderWidth] = useState('100%');
    const sliderRef = useRef(null);
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    const totalImages = images.length;
    const gap = 10;

    // 반응형 크기 계산
    useEffect(() => {
        const calculateSizes = () => {
            const screenWidth = window.innerWidth;

            // 이미지 크기 계산 (화면 크기에 따라 조절)
            let imgWidth, imgHeight;
            if (screenWidth >= 1440) {
                imgWidth = 500;
                imgHeight = 360;
            } else if (screenWidth >= 1024) {
                imgWidth = 400;
                imgHeight = 288;
            } else if (screenWidth >= 600) {
                imgWidth = 320;
                imgHeight = 230;
            } else {
                imgWidth = 280;
                imgHeight = 200;
            }
            setImageSize({ width: imgWidth, height: imgHeight });

            // 슬라이더 너비 계산 (responsive-layout 콘텐츠 영역에 맞춤)
            let contentWidth;
            if (screenWidth >= 1440) {
                contentWidth = 1140;
            } else if (screenWidth >= 1024) {
                // padding: clamp(100px, 4.8vw+50px, 120px) 양쪽
                const padding = Math.min(120, Math.max(100, screenWidth * 0.048 + 50));
                contentWidth = screenWidth - padding * 2;
            } else if (screenWidth >= 600) {
                // padding: clamp(40px, 8vw, 80px) 양쪽
                const padding = Math.min(80, Math.max(40, screenWidth * 0.08));
                contentWidth = screenWidth - padding * 2;
            } else {
                // padding: 24px 양쪽
                contentWidth = screenWidth - 48;
            }
            setSliderWidth(`${contentWidth}px`);
        };

        calculateSizes();
        window.addEventListener('resize', calculateSizes);
        return () => window.removeEventListener('resize', calculateSizes);
    }, []);

    const spacerWidth = 500;
    const totalWidth = (imageSize.width + gap) * totalImages + spacerWidth;

    // 슬라이더 위치 계산
    const handleSliderInteraction = useCallback((clientX) => {
        if (!sliderRef.current || !containerRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));

        const containerWidth = containerRef.current.offsetWidth;
        const maxScroll = totalWidth - containerWidth;
        const newScroll = percentage * maxScroll;

        setScrollPosition(newScroll);
        containerRef.current.scrollLeft = newScroll;
    }, [totalWidth]);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (containerRef.current && !isDragging) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

    // 마우스 이벤트
    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleSliderInteraction(e.clientX);
    };

    // 터치 이벤트
    const handleTouchStart = (e) => {
        setIsDragging(true);
        handleSliderInteraction(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        handleSliderInteraction(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // 전역 마우스 이벤트
    useEffect(() => {
        if (!isDragging) return;

        const handleGlobalMouseMove = (e) => handleSliderInteraction(e.clientX);
        const handleGlobalMouseUp = () => setIsDragging(false);

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, handleSliderInteraction]);

    // 슬라이더 손잡이 위치 계산
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxScroll = Math.max(totalWidth - containerWidth, 1);
    const handlePosition = (scrollPosition / maxScroll) * 100;

    return (
        <div className="w-full" ref={wrapperRef}>
            {/* 이미지 컨테이너 */}
            <div
                ref={containerRef}
                className="flex gap-[10px] overflow-x-auto scrollbar-hide"
                onScroll={handleScroll}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`활동사진 ${index + 1}`}
                        className="flex-shrink-0 rounded-2xl object-cover"
                        style={{ width: `${imageSize.width}px`, height: `${imageSize.height}px` }}
                        draggable={false}
                    />
                ))}
                {/* 마지막 사진이 다 보이도록 여백 추가 */}
                <div className="flex-shrink-0 w-[200px]" />
            </div>

            {/* 슬라이더 바 */}
            <div className="mt-[50px]">
                <div
                    ref={sliderRef}
                    className="relative h-0.5 bg-[#2D2D2D] rounded-full cursor-pointer"
                    style={{ width: sliderWidth }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* 채워진 부분 */}
                    <div
                        className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-75"
                        style={{ width: `${Math.min(handlePosition, 100)}%` }}
                    />

                    {/* 손잡이 */}
                    <img
                        src={handleIcon}
                        alt="slider handle"
                        className={`absolute top-1/2 -translate-y-1/2 transition-transform duration-75 ${
                            isDragging ? 'scale-125' : 'hover:scale-110'
                        }`}
                        style={{ left: `calc(${Math.min(handlePosition, 100)}% - 10px)`, width: '20px', height: '20px' }}
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityGallery;
