import { useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/apply/icon-home.svg';


const FinalPendingResult = ({ name }) => {
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
          예비 합격 대상자입니다
        </h1>
      </div>

      {/* 안내 메시지 본문 */}
      <div className="body-16-regular text-gray-03 mb-8 leading-relaxed whitespace-pre-wrap">
        먼저 긴 선발 과정 동안 열정적으로 임해주신 <span className="text-white font-bold">{firstName}</span> 님께<br/>
        진심으로 감사의 말씀을 드립니다.<br/>
        <br/>
        아쉽게도 이번 최종 합격 명단에는 포함되지 못하셨으나,<br/>
        우수한 역량을 갖추고 계시기에 <span className="text-white font-bold">예비 합격 대상자</span>로 선정되셨습니다.<br/>
        <br/>
        추후 <span className="text-orange-04 font-semibold">미등록 인원 발생 시 순차적으로</span><br/>
        개별 연락을 드릴 예정이오니, 너른 양해 부탁드리며<br/>
        조금만 더 기다려 주시면 감사하겠습니다.
      </div>

      {/* 추가 안내 카드 */}
      <div className="w-full max-w-[340px] bg-bg-secondary rounded-[8px] p-6 mb-[56px] sm:mb-51 border border-gray-07">
        <h3 className="body-18-semibold text-gray-01 mb-3">
          🔔 추가 합격 안내
        </h3>
        <p className="body-14-regular text-gray-02 leading-relaxed">
          추가 합격 연락은 기재해주신 연락처로<br/>
          개별 유선 연락 혹은 문자를 드릴 예정입니다.
        </p>
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

export default FinalPendingResult;