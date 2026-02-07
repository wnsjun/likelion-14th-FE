import { useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/apply/icon-home.svg';

const FailResult = ({ name, type }) => {
  const navigate = useNavigate();
  const firstName = name.length >= 3 ? name.slice(1) : name;

  const titleText = type === 'doc' ? '1차 서류 전형 불합격입니다' : '최종 불합격입니다';

  return (
    <div className="w-full flex flex-col items-start">
      
      {/* Part 1. 상단 타이틀 */}
      <div className="mb-[48px] pt-32">
        <div className="flex items-end mb-2">
          {/* 이름 */}
          <span className="title-32-semibold text-white mr-1 pr-2">
            {name}
          </span>
          {/* 님 */}
          <span className="title-20-bold text-white">
             님
          </span>
        </div>
        <h1 className="title-32-semibold text-white">
          {titleText}
        </h1>
      </div>

      {/* Part 2. 합격 메시지 */}
      <div className="body-16-regular text-gray-03  leading-relaxed whitespace-pre-wrap mb-14 sm:mb-51">
        먼저 귀한 시간 할애하여 멋쟁이 사자처럼 14기 선발에 지원해주셔서 매우 감사드립니다.<br/><br/>
        비록 이번 모집에서는 아쉬운 마음으로 소식을 전해드리지만<br/>
        <span >{firstName}</span> 님의 앞날과 성장을 홍익대 멋사가 진심으로 응원하겠습니다.<br/>
        <br/>
        더욱 성장해있을 <span >{firstName}</span> 님의 모습을 15기 모집에서 다시 뵐 수 있기를 진심으로 소망합니다.
      </div>

      {/* 하단 (추가 문의 & 홈 버튼) */}
      <div className="w-full flex justify-between items-end mb-10">
        <div className="flex flex-col gap-2 pb-14 sm:pb-0">
        <span className="body-16-semibold text-gray-02 ml-1">추가 문의</span>
         <div className="flex flex-col sm:flex-row gap-2">
           <div className="w-fit  flex px-[24px] py-[8px] justify-center items-center gap-[10px] rounded-[100px]  bg-gray-07 text-gray-01 body-12-semibold sm:body-14-semibold">
             010-3120-2936
           </div>
           <div className="w-fit flex px-[24px] py-[8px] justify-center items-center gap-[10px] rounded-[100px]  bg-gray-07 text-gray-01 body-12-semibold sm:body-14-semibold">
            hongik.likelion@gmail.com
           </div>
          </div>
       </div>
      
        <button
          onClick={() => navigate('/')}
          className="flex justify-center items-center gap-[10px] px-[24px] py-[16px] rounded-[100px] border border-orange-04 bg-orange-01 text-white font-semibold hover:bg-orange-01-hover cursor-pointer transition-all"
        >
          <img 
            src={HomeIcon} 
            alt="Home" 
            className="lg:hidden w-6 h-6" 
          />
      
          {/* 2. 1024px 이상(lg 이상)에서만 보임 -> 기본은 숨김(hidden), lg부터 보임(block) */}
          <span className="hidden lg:block">
            홈으로 이동
          </span> 
         </button>
       </div>  
    </div>
  );
};

export default FailResult;