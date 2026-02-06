import EventCard from './EventCard';

export default function EventSeason({
  season,
  monthsData,
  seasonColor,
  description,
}) {
  const filteredMonths = monthsData.filter(
    (monthData) => monthData.events.length > 0
  );

  return (
    // 1. gap-3 lg:gap-6 : 모바일에서 간격을 좁혀서 오른쪽 공간 확보
    <div className="flex gap-3 lg:gap-6 mb-16">
      {/* 1. 왼쪽: 계절 제목 */}
      {/* w-12 lg:w-16 : 모바일에서 제목 영역 너비를 조금 더 줄임 */}
      <div className="flex-shrink-0 text-right pt-1 w-12 lg:w-16 sm:w-auto">
        <h2 className="title-18-bold break-keep" style={{ color: seasonColor }}>
          {season}
        </h2>
      </div>

      {/* 2. 중앙: 세로 줄 */}
      <div className="flex flex-col items-center relative">
        <div 
          className="w-[0.5px] lg:w-px flex-1 -mt-2"
          style={{ backgroundColor: seasonColor }}
        ></div>

        {/* w-2 h-2 lg:w-4 lg:h-4 : 모바일에서는 원 크기를 작게 처리 */}
        <div
          className="w-2 h-2 lg:w-4 lg:h-4 rounded-full flex-shrink-0 z-10"
          style={{ backgroundColor: seasonColor }}
        ></div>
      </div>

      {/* 3. 오른쪽: 컨텐츠 영역 */}
      <div className="flex-1 pb-8">
        {description && <div className="mb-8">{description}</div>}

        {/* 달(Month) 목록 컨테이너 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:gap-x-6 lg:block lg:space-y-12">
          {filteredMonths.map((monthData) => (
            <div key={monthData.month} className="col-span-1">
              <h3 className="title-20-bold text-white mb-4">
                {monthData.month}
              </h3>

              {/* 이벤트 카드 리스트 그리드 */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                {monthData.events.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    date={event.date}
                    isDisabled={event.isDisabled}
                    colSpan={event.colSpan}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
