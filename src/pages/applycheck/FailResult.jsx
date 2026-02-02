import { useNavigate } from 'react-router-dom';

const FailResult = ({ name, type }) => {
  const navigate = useNavigate();
  const firstName = name.length >= 3 ? name.slice(1) : name;

  const titleText = type === 'doc' ? '1차 서류 전형 불합격입니다' : '최종 불합격입니다';

  return (
    <div className="w-full flex flex-col items-start px-8">
      
      {/* Part 1. 상단 타이틀 */}
      <div className="mb-[48px] pt-20">
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
      <div className="body-16-regular text-gray-03 mb-45 leading-relaxed whitespace-pre-wrap">
        먼저 귀한 시간 할애하여 멋쟁이 사자처럼 14기 선발에 지원해주셔서 매우 감사드립니다.<br/><br/>
        비록 이번 모집에서는 아쉬운 마음으로 소식을 전해드리지만<br/>
        <span >{firstName}</span> 님의 앞날과 성장을 홍익대 멋사가 진심으로 응원하겠습니다.<br/>
        <br/>
        더욱 성장해있을 <span >{firstName}</span> 님의 모습을 15기 모집에서 다시 뵐 수 있기를 진심으로 소망합니다.
      </div>

      {/* 하단 (추가 문의 & 홈 버튼) */}
      <div className="w-full flex justify-between items-end">
        
        {/* 왼쪽: 추가 문의 영역 */}
        <div className="flex flex-col gap-2">
          <span className="body-16-semibold text-gray-02 ml-1">추가 문의</span>
          
          <div className="flex gap-2">
            {/* 전화번호 칩 */}
            <div className="flex px-[24px] py-[8px] justify-center items-center gap-[10px] rounded-[100px]  bg-gray-07 text-gray-01 body-14-semibold">
              010-3120-2936
            </div>
            
            {/* 이메일 칩 */}
            <div className="flex px-[24px] py-[8px] justify-center items-center gap-[10px] rounded-[100px]  bg-gray-07 text-gray-01 body-14-semibold">
              hongik.likelion@gmail.com
            </div>
          </div>
        </div>

        {/* 오른쪽: 홈으로 이동 버튼 */}
        <button
          onClick={() => navigate('/')}
          className="flex justify-center items-center gap-[10px] px-[24px] py-[16px] rounded-[100px] border border-orange-04 bg-orange-01 text-white font-semibold hover:bg-orange-01-hover cursor-pointertransition-all"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default FailResult;