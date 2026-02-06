import lion from '../assets/home/logo-lion.png';
import hongik from '../assets/home/logo-hongik.svg';
import ButtonApply from '../layout/ButtonApply';
import Introduction from '../components/home/Introduction';
import KeyComp from '../components/home/KeyComp';
import Track from '../components/home/Track';
import SeeMore from '../components/home/SeeMore';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-bg-dark reposive-layout">
      {/* 1. 전체 배경색만 담당 */}
      {/* 2. 네브바 (화면 상단 고정) */}
      <div className="fixed top-0 left-0 w-full z-50 bg-bg-dark">
        <Navbar />
      </div>
      {/* 3. 메인 히어로 섹션 */}
      {/* h-screen을 주어 한 화면을 꽉 채우고, overflow-hidden으로 사자 이미지가 삐져나오지 않게 합니다. */}
      <section className="relative w-full h-[700px] flex justify-center items-center overflow-hidden mb-[16px]">
        {/* ✅ 실제 내용물만 responsive-layout으로 감싸 중앙 정렬 */}
        <div className="responsive-layout relative w-full flex flex-col sm:items-center items-start md:items-start">
          <div className="relative z-10 mt-[20px] flex flex-col items-start sm:items-center md:items-start">
            <div className="gap-[12px] flex sm:items-center items-start justify-start mb-[24px] sm:justify-center md:justify-start w-full">
              <img src={hongik} alt="logo" className="sm:w-[43px] w-[23px]" />
              <div className="sm:text-[32px] sm:font-semibold text-[18px] font-semibold">
                홍익대학교
              </div>
            </div>
            <div className="md:font-semibold md:text-[80px] sm:text-[64px] sm:font-bold text-[48px] font-semibold text-white text-left sm:text-center md:text-left">
              멋쟁이사자처럼
            </div>
            <div className="md:text-[28px] md:font-semibold lg:text-[24px] lg:font-semibold text-[16px] font-regular text-gray-02 mt-[16px] mb-[96px] text-left sm:text-center md:text-left break-keep">
              국내 최대 규모의 IT 창업 연합 동아리
            </div>
            <ButtonApply type="long_title" className={'hidden sm:block'} />
            <ButtonApply type="short" className={'sm:hidden block'} />
          </div>

          {/* 사자 로고 (md 이상에서 절대 위치로 배치) */}
          <img
            src={lion}
            alt="logo"
            className="hidden md:block absolute right-0 top-4/7 -translate-y-1/2 lg:w-[649px] md:w-[479px] h-auto z-0"
          />
        </div>
      </section>
      {/* 4. 하단 콘텐츠 섹션들 */}
      {/* 히어로 섹션과 분리되어 있어 더 이상 겹치지 않습니다. */}
      <section className="w-full sm:mb-[88px] mb-[64px]">
        <div className="responsive-layout flex flex-col gap-[144px]">
          <Introduction />
          <KeyComp />
          <Track />

          <div className="flex flex-col sm:flex-row gap-[20px] justify-center items-center mb-[80px]">
            <SeeMore text="모집 안내 사항 바로가기" navi={'/recruiting'} />
            <SeeMore text="지난 기수 프로젝트 바로가기" navi={'/archive'} />
          </div>
        </div>
      </section>
      {/* 5. 하단 지원 버튼 및 푸터 */}
      <div className="responsive-layout flex justify-center items-center md:mb-[126px] mb-[64px]">
        <ButtonApply type="long_footer" />
      </div>
      <Footer home={true} />
    </div>
  );
};

export default Home;
