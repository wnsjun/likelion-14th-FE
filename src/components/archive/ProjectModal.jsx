import { useState, useEffect, useRef, useCallback } from 'react';

// 슬라이더 손잡이
import handleIcon from '../../assets/archive/handle.svg';

const ProjectModal = ({ isOpen, onClose, project }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const imagesContainerRef = useRef(null);

    const images = project?.images || [];
    const totalImages = images.length;

    const IMAGE_WIDTH = 467;
    const IMAGE_HEIGHT = 267;
    const IMAGE_GAP = 1;
    const totalWidth = (IMAGE_WIDTH + IMAGE_GAP) * totalImages - IMAGE_GAP;

    // 슬라이더 위치 계산
    const handleSliderInteraction = useCallback((clientX) => {
        if (!sliderRef.current || !imagesContainerRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));

        const containerWidth = imagesContainerRef.current.offsetWidth;
        const maxScroll = Math.max(totalWidth - containerWidth, 0);
        const newScroll = percentage * maxScroll;

        setScrollPosition(newScroll);
        imagesContainerRef.current.scrollLeft = newScroll;
    }, [totalWidth]);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (imagesContainerRef.current && !isDragging) {
            setScrollPosition(imagesContainerRef.current.scrollLeft);
        }
    };

    // 모달 열릴 때 초기화
    useEffect(() => {
        if (isOpen) {
            setScrollPosition(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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

    // 렌더링 조건 체크 (hooks 이후에!)
    if (!isOpen || !project) return null;

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

    // 손잡이 위치 계산 (%)
    const containerWidth = imagesContainerRef.current?.offsetWidth || 800;
    const maxScroll = Math.max(totalWidth - containerWidth, 1);
    const handlePosition = (scrollPosition / maxScroll) * 100;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            onClick={onClose}
        >
            {/* 모달 컨테이너 */}
            <div
                className="relative w-full max-w-[657px] rounded-[11px] border border-[#515154] bg-[#2D2D2D] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 상단 컨텐츠 영역 */}
                <div className="p-6 md:p-8 pb-4">
                    {/* 닫기 버튼 */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors cursor-pointer z-10"
                    >
                        ✕
                    </button>

                    {/* 카테고리 */}
                    <p className="body-14-regular text-gray-02">
                        {project.category}
                    </p>

                    {/* 서비스 이름 */}
                    <h2 className="title-32-semibold text-white mt-2">
                        {project.title}
                    </h2>

                    {/* 서비스 설명 */}
                    <p className="body-16-regular text-gray-02 mt-3 max-w-[90%]">
                        {project.subtitle}
                    </p>

                    {/* 팀원 정보 */}
                    <div className="mt-6 md:mt-8 ml-0 md:ml-[370px] flex flex-col gap-3">
                        {/* 기획/디자인 */}
                        <div className="flex items-center">
                            <span className="body-14-semibold text-gray-04 w-[85px]">기획/디자인</span>
                            <span className="body-14-regular text-gray-02 ml-5">
                                {project.designer || '이름'}
                            </span>
                        </div>

                        {/* 프론트엔드 */}
                        <div className="flex items-center">
                            <span className="body-14-semibold text-gray-04 w-[85px]">프론트엔드</span>
                            <span className="body-14-regular text-gray-02 ml-5">
                                {project.frontend || '이름'}
                            </span>
                        </div>

                        {/* 백엔드 */}
                        <div className="flex items-center">
                            <span className="body-14-semibold text-gray-04 w-[85px]">백엔드</span>
                            <span className="body-14-regular text-gray-02 ml-5">
                                {project.backend || '이름'}
                            </span>
                        </div>
                    </div>

                    {/* 슬라이더 바 */}
                    <div className="mt-6 w-full">
                        <div
                            ref={sliderRef}
                            className="relative h-0.5 bg-[#515154] rounded-full cursor-pointer"
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

                {/* 이미지 갤러리 */}
                <div
                    ref={imagesContainerRef}
                    className="w-full overflow-x-auto"
                    style={{
                        height: 'clamp(150px, 40vw, 267px)',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onScroll={handleScroll}
                >
                    <div className="flex gap-[1px] h-full" style={{ width: 'max-content' }}>
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`${project.title} - ${index + 1}`}
                                className="flex-shrink-0 object-cover h-full"
                                style={{ aspectRatio: '467/267' }}
                                draggable={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
