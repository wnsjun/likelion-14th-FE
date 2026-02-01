import { useState, useRef, useEffect } from 'react';
import ProjectCard from '../components/archive/ProjectCard';
import PaginationButton from '../components/archive/PaginationButton';
import ProjectModal from '../components/archive/ProjectModal';
import ActivityGallery from '../components/archive/ActivityGallery';
import { projects } from '../data/ProjectData';

const Archive = () => {
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [paginationWidth, setPaginationWidth] = useState('100%');
    const cardsContainerRef = useRef(null);

    const filters = ['전체', '아이디어톤', '해커톤', '데모데이'];
    const ITEMS_PER_PAGE = 6;
    const CARD_WIDTH = 360;
    const CARD_GAP = 20;

    // 카드 개수에 맞춰 페이지네이션 너비 계산
    useEffect(() => {
        const calculateWidth = () => {
            if (!cardsContainerRef.current) return;
            const containerWidth = cardsContainerRef.current.offsetWidth;
            const cardsPerRow = Math.floor((containerWidth + CARD_GAP) / (CARD_WIDTH + CARD_GAP));
            const actualCardsWidth = cardsPerRow * CARD_WIDTH + (cardsPerRow - 1) * CARD_GAP;
            setPaginationWidth(`${actualCardsWidth}px`);
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

    // 필터링된 프로젝트
    const filteredProjects = selectedFilter === '전체'
        ? projects
        : projects.filter(project => project.category === selectedFilter);

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProjects = filteredProjects.slice(startIndex, endIndex);

    // 필터 변경 시 페이지 초기화
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setCurrentPage(1);
    };

    // 페이지 변경
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 프로젝트 카드 클릭
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="mt-[5px]">
            {/* 프로젝트 섹션 - 중앙 정렬 wrapper */}
            <div className="flex justify-center w-full">
                <div className="w-full max-w-[1120px] flex flex-col">
                    {/* 필터바 */}
                    <div className="flex justify-start items-center gap-1 md:gap-[10px] mb-8 flex-wrap">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => handleFilterChange(filter)}
                                className={`
                                    cursor-pointer
                                    flex justify-center items-center
                                    px-2 py-2 md:px-4 md:py-3
                                    text-base md:body-18-regular
                                    transition-all
                                    ${selectedFilter === filter
                                        ? 'text-white rounded-[8px] border-b border-[#DABE5A]'
                                        : 'text-gray-02'
                                    }
                                `}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <h2 className="mt-[64px] title-20-bold text-white">
                        프로젝트
                    </h2>

                    {/* 프로젝트 카드 목록 */}
                    <div
                        ref={cardsContainerRef}
                        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[24px]"
                    >
                        {currentProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                image={project.image}
                                category={project.category}
                                title={project.title}
                                subtitle={project.subtitle}
                                onClick={() => handleProjectClick(project)}
                            />
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    {totalPages > 1 && (
                        <div className="mt-[24px] flex justify-between w-full">
                            <PaginationButton
                                direction="prev"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            />
                            <PaginationButton
                                direction="next"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* 프로젝트 모달 */}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            />

            <h2 className="mt-[150px] title-20-bold text-white">
                활동사진
            </h2>

            {/* 활동사진 갤러리 - 오른쪽 끝까지 */}
            <div className="mt-8 overflow-visible" style={{ marginRight: 'calc(-1 * (100vw - 100%))' }}>
                <ActivityGallery />
            </div>
        </div>
    )
};

export default Archive;
