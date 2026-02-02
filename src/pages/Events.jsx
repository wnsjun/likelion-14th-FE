import EventSeason from '../components/events/EventSeason';
import PageHeader from "../components/common/PageHeader";

export default function Events() {
  // 1학기
  const eventsSemester1 = [
    {
      month: '3월',
      events: [
        { title: 'OT', date: '3월 10일', isDisabled: false },
        { title: 'MT', date: '3월 13일 ~ 14일', isDisabled: false },
        { title: <span className="break-keep inline-block leading-tight">
            정기 세션 #1
          </span>, date: '3월 19일', isDisabled: false },
        { title: <span className="break-keep inline-block leading-tight">
            정기 세션 #2
          </span>, date: '3월 26일', isDisabled: false },
      ],
    },
    {
      month: '4월',
      events: [
        { title: <span className="break-keep inline-block leading-tight">
            정기 세션 #3
          </span>, date: '4월 2일', isDisabled: false },
        { title: <span className="break-keep inline-block leading-tight">
            정기 세션 #4
          </span>, date: '4월 9일', isDisabled: false },
        { title: '휴회', date: '중간고사 기간', isDisabled: true },
        { title: <span className="break-keep inline-block leading-tight">
            정기 세션 #5
          </span>, date: '4월 30일', isDisabled: false },
      ],
    },
    {
      month: '5월',
      events: [
        { title: <span className="break-keep inline-block leading-tight">
            정기 세션 #6
          </span>, date: '5월 7일', isDisabled: false },
        { title: <span className="break-keep inline-block leading-tight">
            정기 세션 #7
          </span>, date: '5월 14일', isDisabled: false },
        { title: <span className="break-keep inline-block leading-tight">
            기획/디자인 발표
          </span>, date: '5월 21일', isDisabled: false },
        { title: (<span className="break-keep inline-block leading-tight">
            해커톤 팀빌딩
          </span>), date: '5월 28일', isDisabled: false },
      ],
    },
    {
      month: '6월',
      events: [
        { title: '휴회', date: '기말고사 기간 + 해커톤 준비', isDisabled: true, colSpan: 4},
      ],
    },
  ];

  // 방학
  const eventsSummer = [
    {
      month: '7월',
      events: [
        { title: '애거돈', date: '해커톤 한달 전 진행', isDisabled: false },
        { title: <span className="break-keep inline-block leading-tight">
            방학 세션 진행
          </span>, date: (
            <span className="text-center leading-tight">
              매주 1회
              {/* lg(1024px) 이상에서는 br 태그를 숨김 -> 한 줄로 표시 */}
              <br className="lg:hidden" />
              {' '}학교에서 대면으로 진행
            </span>
            ), isDisabled: false, colSpan: 3 },
      ],
    },
    {
      month: '8월',
      events: [
        { title: '해커톤', date: '8월', isDisabled: false },
      ],
    },
  ];

  // 2학기
  const eventsSemester2 = [
    {
      month: '9월',
      events: [],
    },
    {
      month: '10월',
      events: [
        { title: (
          <span className="break-keep inline-block leading-tight">
            데모데이 준비 및 점검
          </span>), 
          date: '팀별 개별 미팅', isDisabled: false, colSpan: 4 },
      ],
    },
    {
      month: '11월',
      events: [
        { title: '데모데이', date: '11월', isDisabled: false },
      ],
    },
  ];

  return (
    <div className="bg-bg-dark min-h-screen text-white">
      {/* 컨텐츠 섹션 */}
      <section className="py-20">        
        {/* 1학기에만 description 전달 */}
        <EventSeason 
          season="1학기" 
          monthsData={eventsSemester1} 
          seasonColor="#FFFFFF"
          description={
            <p className="body-14-regular text-gray-05 pb-8">
              *세션은 매주 목요일 진행됩니다
            </p>
          } 
        />

        {/* 나머지 계절은 description 없이 사용 */}
        <EventSeason season="방학" monthsData={eventsSummer} seasonColor="#DC8563" />
        <EventSeason season="2학기" monthsData={eventsSemester2} seasonColor="#FFFFFF" />
      
      </section>
    </div>
  );
}