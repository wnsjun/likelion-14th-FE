import more from '../../assets/icon/right.svg';

const PartCard = ({ track }) => {
  return (
    <div
      className={`
        group p-[24px] md:p-[32px] rounded-[16px] cursor-pointer transition-all duration-200 
        /* ✅ 1. 너비 분기 처리 */
        w-[211px] shrink-0      /* 기본: 211px 고정 (모바일 가로스크롤용) */
        sm:w-full sm:shrink-0   /* sm 이상: 100% 너비 확보 및 찌그러짐 방지 */
        lg:w-full               /* lg 이상: 그리드 칸에 맞춤 */
        h-full
        ${track.bgColor} ${track.hoverBgColor} ${track.pressedBgColor}
      `}
    >
      {/* ✅ 2. 레이아웃 흐름 분기 (사용자 요청 핵심 로직)
        - 기본(Mobile): flex-col (상하 구조)
        - sm~lg(Tablet): flex-row (좌우 구조 - 넓은 공간 활용)
        - lg~(Desktop): lg:flex-col (다시 상하 구조 - 좁은 그리드 칸 대응)
      */}
      <div className="flex flex-col sm:flex-row lg:flex-col gap-[20px] md:gap-[32px] items-start h-full">
        {/* 상단 라인: 아이콘과 화살표 (모바일/데스크탑 그리드에서는 한 줄에 위치) */}
        <div className="flex flex-row justify-between items-start w-full sm:w-auto lg:w-full">
          {/* 아이콘 */}
          <div className="shrink-0">
            <img
              alt="트랙 아이콘"
              src={track.imgSrc}
              className="w-[54px] md:w-[160px] aspect-square object-contain shrink-0"
            />
          </div>
        </div>

        {/* 텍스트 영역: 제목과 설명 */}
        <div className="flex flex-col h-full justify-between">
          <div className="text-[18px] font-bold md:text-[24px] md:font-bold lg:text-[20px] lg:font-bold text-[#080300] break-keep">
            {track.title}
          </div>
          <div className="font-regular text-[14px] md:font-medium md:text-[16px] text-gray-07 whitespace-pre-line break-keep leading-snug">
            {track.description}
          </div>
        </div>
      </div>
    </div>
  );
};

// // 화살표 컴포넌트 분리 (중복 방지)
// const ArrowIcon = ({ track }) => (
//   <img
//     alt="화살표"
//     src={more}
//     className={`
//       w-[40px] h-[40px] md:w-[46px] md:h-[46px] p-[10px] md:p-[12px]
//       rounded-full transition-all duration-200
//       ${track.iconBgColor} ${track.hoverIconBgColor} ${track.pressedIconBgColor}
//     `}
//   />
// );

export default PartCard;
