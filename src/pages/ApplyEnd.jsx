  import { useNavigate } from 'react-router-dom';
  import cryingLion from '../assets/apply/CryingLion.svg';
  import ButtonApply from '../layout/ButtonApply';

  const ApplyEnd = () => {
    const navigate = useNavigate();

    return (
      <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        
        {/* 1. 로고 영역 */}
        <img 
          src={cryingLion} 
          alt="likelion logo" 
          className="w-[124px] mb-12"
        />

        {/* 2. 안내 문구 영역 */}
        <h1 className="title-32-semibold sm:title-48-semibold text-[#FFF] mb-12 text-center">
          홍익대 멋사 14기 지원이
          
          {/* 👇 수정됨: 기본은 줄바꿈(<br>) 적용, sm 이상에서는 숨김(hidden) */}
          <br className="sm:hidden" />
          
          {/* 띄어쓰기를 위해 ' 마감되었어요' 앞에 공백 한 칸 두는 것이 좋습니다 */}
          {' '}마감되었어요
        </h1>
        
        <p className="body-16-regular sm:body-18-regular text-gray-02 text-center mb-16 leading-relaxed break-keep">
          멋진 여정을 향한 여러분의 관심에 진심으로 감사드립니다<br/>
          아쉽게도 14기 모집은 마감되었습니다. <br className="md:hidden" />
          향후 진행될 15기모집에서 여러분의 도전을 기다리겠습니다
        </p>

      {/* 3. 홈으로 이동 버튼 */}
      <button
        onClick={() => navigate('/')}
        className="flex justify-center items-center gap-[10px] px-[24px] py-[16px] rounded-[100px] border border-[#BA4E23] bg-[#6C2D14] text-white font-semibold hover:opacity-90 transition-all cursor-pointer"
        >
        홈으로 이동
      </button>

      </div>
    );
  };

  export default ApplyEnd;