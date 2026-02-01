const ProjectCard = ({ image, category, title, subtitle, onClick }) => {
    return (
        <div
            className="flex w-full p-4 flex-row md:flex-col items-center md:items-start gap-4 md:gap-[10px] rounded-2xl border border-[#2D2D2D] bg-[#1C1C1C] transition-all duration-300 hover:border-[#DABE5A] cursor-pointer"
            onClick={onClick}
        >
            {/* 이미지 */}
            <div
                className="w-[200px] h-[150px] md:w-full md:h-[200px] flex-shrink-0 rounded-2xl bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            />

            {/* 정보 영역 */}
            <div className="flex flex-col gap-[6px] md:gap-[10px] flex-1 md:w-full">
                {/* 카테고리 */}
                <p className="detail-12-regular text-gray-02 text-left md:text-right">
                    {category}
                </p>

                {/* 제목 */}
                <h3 className="body-18-semibold text-white">
                    {title}
                </h3>

                {/* 서브타이틀 */}
                <p className="body-14-regular text-gray-02">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard;
