import Manager from '../components/home/Manager';

const Footer = ({ home = false }) => {
  return home === true ? (
    /* ✅ 1. 최상위 부모: 절대 화면 너비를 넘지 못하게 고정 */
    <footer className="w-full bg-bg-secondary pt-[92px] pb-[141px] overflow-hidden">
      {/* ✅ 2. 스크롤 컨테이너: 
          - responsive-layout의 너비를 유지하면서 컨텐츠가 넘치면 스크롤 발생
          - scrollbar-hide를 통해 시각적으로 깔끔하게 유지
      */}
      <div className="responsive-layout overflow-x-auto scrollbar-hide">
        {/* ✅ 3. 실제 컨텐츠 래퍼: 
            - min-w-max를 통해 내부 컨텐츠(Manager 등)가 찌그러지지 않고 본래 너비를 유지하게 함
            - lg(데스크탑)에서는 다시 일반적인 flex 흐름으로 복구
        */}
        <div className="flex flex-col lg:flex-row gap-[64px] lg:gap-[120px] min-w-max lg:min-w-0 lg:w-full">
          {/* 연락처 섹션: shrink-0으로 너비 보존 */}
          <div className="flex flex-col gap-[64px] shrink-0">
            <div className="flex flex-col gap-[32px]">
              <div className="title-20-bold text-white">인스타그램</div>
              <div className="py-[8px] px-[24px] body-18-semibold text-white bg-gray-07 rounded-full w-fit">
                @likelion_hongik
              </div>
            </div>
            <div className="flex flex-col gap-[32px]">
              <div className="title-20-bold text-white">이메일</div>
              <div className="py-[8px] px-[24px] body-18-semibold text-white bg-gray-07 rounded-full w-fit">
                hongik.likelion@gmail.com
              </div>
            </div>
          </div>

          {/* 운영진 정보 섹션: 내부 카드들이 211px 너비를 지키며 나열됨 */}
          <div className="shrink-0">
            <Manager />
          </div>
        </div>
      </div>
    </footer>
  ) : (
    <footer className="h-[464px] w-full bg-[radial-gradient(59.61%_59.61%_at_50%_100%,#6E2900_0%,#080300_100%)]"></footer>
  );
};

export default Footer;
  