import Manager from '../components/home/Manager';

const Footer = ({ home = false }) => {
  return home === true ? (
    <footer className="w-full bg-bg-secondary flex justify-center items-center sm:pt-[88px] pt-[54px] pb-[141px] overflow-hidden">
      <div className="responsive-layout overflow-hidden">
        {' '}
        {/* responsive-layout 적용 확인 */}
        {/* 핵심 수정: 
            - 기본(Mobile): flex-col
            - md(Tablet): flex-col (하지만 내부 배치를 위해 flex 활용)
            - lg(Desktop): flex-row (가로 나열)
        */}
        <div className="flex flex-col lg:flex-row gap-[64px] lg:gap-[120px] lg:min-w-0 lg:w-full">
          {/* 1. 연락처 섹션: md일 때 오른쪽으로 붙임 */}
          <div className="flex sm:flex-row lg:justify-start sm:justify-end lg:flex-col flex-col gap-[64px] shrink-0 w-full lg:w-auto md:items-end lg:items-start">
            <div className="flex flex-col gap-[32px] md:items-end lg:items-start">
              <div className="title-20-bold text-white">인스타그램</div>
              <div className="py-[8px] px-[24px] body-18-semibold text-white bg-gray-07 rounded-full w-fit">
                @likelion_hongik
              </div>
            </div>
            <div className="flex flex-col gap-[32px] md:items-end lg:items-start">
              <div className="title-20-bold text-white">이메일</div>
              <div className="py-[8px] px-[24px] body-18-semibold text-white bg-gray-07 rounded-full w-fit">
                hongik.likelion@gmail.com
              </div>
            </div>
          </div>

          {/* 2. 운영진 섹션: md일 때 왼쪽 정렬 유지 */}
          <div className="shrink-0 w-full lg:flex-1">
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
