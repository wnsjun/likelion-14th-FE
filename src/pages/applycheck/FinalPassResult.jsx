import { useNavigate } from 'react-router-dom';

const FinalPassResult = ({ name }) => {
  const navigate = useNavigate();
  const firstName = name && name.length >= 3 ? name.slice(1) : name;

  return (
    <div className="w-full flex flex-col items-start px-8">
      
      {/* 타이틀 */}
      <div className="mb-[48px] pt-8">
        <div className="flex items-end mb-2">
          <span className="title-32-semibold text-white mr-1 pr-2">
            {name}
          </span>
          <span className="title-20-bold text-white">
              님
          </span>
        </div>
        <h1 className="title-32-semibold text-white">
          최종 합격입니다 🎉
        </h1>
      </div>

      {/* 축하 메시지 본문 */}
      <div className="body-16-regular text-gray-03 mb-8 leading-relaxed whitespace-pre-wrap">
        긴 선발 과정 동안 열정적으로 임해주셔서 진심으로 감사드립니다.<br/><br/>
        
        치열한 경쟁을 뚫고 <span className="text-white font-bold">홍익대학교 멋쟁이사자처럼 14기 아기사자</span>가<br/>
        되신 것을 진심으로 축하드립니다!<br/>
        <br/>
        <span className="text-white font-bold">{firstName}</span> 님과 함께 만들어갈 14기의 여정이 무척 기대됩니다.<br/>
        앞으로 멋진 성장을 함께 이루어나가길 소망합니다.
      </div>

      {/* OT 및 향후 안내 카드 */}
      <div className="w-full max-w-[340px] bg-bg-secondary rounded-[8px] p-6 mb-[60px] border border-gray-07">
        <h3 className="body-18-semibold text-orange-04 mb-3">
          📢 향후 일정 안내
        </h3>
        <p className="body-14-regular text-gray-02 leading-relaxed">
          합격자 단톡방 초대 및 오리엔테이션(OT) 관련 안내는<br/>
          지원서에 기재해주신 <span className="text-white font-medium">전화번호(문자/카톡)</span>를 통해<br/>
          순차적으로 연락드릴 예정입니다.<br/>
          <br/>
          조금만 기다려주세요! 🦁
        </p>
      </div>

      {/* 하단 (문의처 & 홈 버튼) */}
      <div className="w-full flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <span className="body-16-semibold text-gray-02 ml-1">추가 문의</span>
          <div className="flex gap-2">
            <div className="flex px-[24px] py-[8px] justify-center items-center gap-[10px] rounded-[100px]  bg-gray-07 text-gray-01 body-14-semibold">
              010-3120-2936
            </div>
            <div className="flex px-[24px] py-[8px] justify-center items-center gap-[10px] rounded-[100px]  bg-gray-07 text-gray-01 body-14-semibold">
              hongik.likelion@gmail.com
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex justify-center items-center gap-[10px] px-[24px] py-[16px] rounded-[100px] border border-orange-04 bg-orange-01 text-white font-semibold hover:bg-orange-01-hover cursor-pointer transition-all"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default FinalPassResult;