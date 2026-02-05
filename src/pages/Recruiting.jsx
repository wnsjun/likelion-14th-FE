import EventCard from '../components/events/EventCard';
import Track from '../components/home/Track';
import ButtonApply from '../layout/ButtonApply';

const Recruiting = () => {
  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <div alt="모집 대상" className="mb-[96px] flex flex-col gap-y-[24px]">
        <div className="title-20-bold text-white">모집 대상</div>
        <div className="body-18-regular text-gray-02">
          홍익대학교 재학생, 휴학생, 졸업유예생 (단, 반드시 1년간 활동이
          가능해야 합니다.)
        </div>
      </div>

      {/* 2. 서류 제출 기간 (변경 없음) */}
      <div
        alt="서류 제출 기간"
        className="mb-[96px] flex flex-col gap-y-[24px]"
      >
        <div className="title-20-bold text-white">서류 제출 기간</div>
        <div className="body-18-regular text-gray-02">
          2026년 2월 16일 - 2월 26일 23:59
        </div>
      </div>

      {/* 3. 모집 일정 (반응형 적용) */}
      <div alt="모집 일정" className="mb-[104px] flex flex-col gap-y-[24px]">
        <div className="title-20-bold text-white">모집 일정</div>
        {/* [Grid 설정 설명]
            1. grid-cols-2 : 기본값 (1440px 미만일 때 2개씩 2줄 = 2x2)
            2. min-[1440px]:grid-cols-4 : 1440px 이상일 때 4개씩 1줄 (1x4)
        */}
        <div className="grid grid-cols-2 min-[1440px]:grid-cols-4 gap-[20px]">
          <EventCard title="서류 접수" date="2월 16일 - 26일" />
          <EventCard title="서류 합격 발표" date="3월 1일" />
          <EventCard
            title="면접"
            date="3월 3일 - 5일"
            description="*면접은 대면으로 진행됩니다"
          />
          <EventCard title="최종 발표" date="3월 7일" />
        </div>
      </div>

      {/* 4. 모집 트랙 (변경 없음) */}
      <div alt="모집 트랙" className="mb-[104px]">
        <Track type="recruiting" />
      </div>

      {/* 5. 필참 행사 (반응형 적용) */}
      <div alt="필참 행사" className="mb-[144px] flex flex-col gap-y-[24px]">
        <div className="title-20-bold text-white">필참 행사</div>
        {/* [Grid 설정 설명] - 모바일 퍼스트 전략
            1. grid-cols-2 : 기본값 (600px 미만일 때 2개씩 3줄)
            2. min-[600px]:grid-cols-3 : 600px ~ 1439px 일 때 3개씩 2줄
            3. min-[1440px]:grid-cols-6 : 1440px 이상일 때 6개씩 1줄
        */}
        <div className="grid grid-cols-2 min-[600px]:grid-cols-3 min-[1440px]:grid-cols-6 gap-[20px]">
          <EventCard title="OT" date="3월 10일" />
          <EventCard title="MT" date="3월 13일 - 14일" />
          <EventCard title="아이디어톤" isDisabled={false} date="5월" />
          <EventCard title="애거돈" isDisabled={false} date="7월" />
          <EventCard title="해커톤" isDisabled={false} date="8월" />
          <EventCard title="데모데이" isDisabled={false} date="11월" />
        </div>
      </div>

      {/* 6. 지원하기 버튼 (변경 없음) */}
      <div className="flex justify-center items-center">
        <ButtonApply type="long_footer" />
      </div>
    </div>
  );
};

export default Recruiting;
