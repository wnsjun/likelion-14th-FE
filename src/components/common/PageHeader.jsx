const PageHeader = ({ title, subtitle, description }) => {
  return (
    <section className="py-16 w-full border-b border-gray-07">
      {/* 소제목 */}
      <p className="body-16-semibold text-orange-04 mb-2 lg:mb-0">{subtitle}</p>

      {/* lg:items-end : 1024px 이상에서 하단 정렬 */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">
        
        {/* 대제목 */}
        <h1 className="font-bold leading-none text-[48px] md:text-[80px] lg:text-[100px] xl:text-[120px] break-words lg:shrink-0">
          {title}
        </h1>

        {/* 설명글 영역 */}
        <div className="w-full lg:pb-2">
          <p className="body-16-semibold md:body-16-semibold text-gray-05 leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;