const PartCard = ({ track }) => {
  return (
    <div
      className={`
        group p-[24px] sm:p-[32px] rounded-[16px]
        w-[211px] sm:w-full lg:w-full shrink-0
        sm:h-[158px] md:h-[224px] lg:h-[368px] flex flex-col
        ${track.bgColor}
      `}
    >
      <div className="flex flex-col sm:flex-row lg:flex-col gap-[20px] md:gap-[32px] items-start h-full">
        {/* 1. 이미지 영역: 찌그러짐 방지를 위해 shrink-0 유지 */}
        <div className="flex flex-row justify-between items-start w-full sm:w-auto lg:w-full shrink-0">
          <div className="shrink-0">
            <img
              alt="트랙 아이콘"
              src={track.imgSrc}
              className="w-[54px] md:w-[160px] aspect-square object-contain shrink-0"
            />
          </div>
        </div>

        {/* 2. 텍스트 영역: h-full 대신 flex-1을 써야 이미지를 밀어내지 않습니다 */}
        <div className="flex flex-col flex-1 lg:w-full lg:justify-between sm:h-full sm:justify-between w-full">
          <div className="text-[18px] font-bold md:text-[24px] lg:text-[20px] text-[#080300] break-keep">
            {track.title}
          </div>
          <div className="font-regular text-[14px] sm:text-[16px] sm:w-[370px] lg:w-[302px]  sm:font-medium text-gray-07 whitespace-pre-line break-keep leading-snug mt-4">
            {track.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartCard;
