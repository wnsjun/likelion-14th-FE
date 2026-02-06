export default function EventCard({
  title,
  date,
  isDisabled = false,
  colSpan = 1,
  description = '',
}) {
  // 1. date가 문자열이고, '일'이라는 글자가 포함되어 있는지 확인
  const isStringDate = typeof date === 'string';
  const hasDayString = isStringDate && date.includes('일');

  // 2. 비활성 상태가 아니고, '일'이 포함된 경우에만 테두리 표시
  const showBorder = !isDisabled && hasDayString;

  // colSpan 값에 따른 Tailwind 클래스 매핑
  const getColSpanClass = (span) => {
    switch (span) {
      case 4:
        return 'col-span-1 lg:col-span-4';
      case 3:
        return 'col-span-1 lg:col-span-3';
      case 2:
        return 'col-span-1 lg:col-span-2';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${getColSpanClass(colSpan)}`}>
      {/* 제목 부분 */}
      <div
        className={`
          px-6 py-2 text-center flex items-center justify-center rounded-lg transition-all duration-200
          ${
            isDisabled
              ? 'bg-gray-04 text-bg-dark'
              : 'bg-bright-orange-02 text-bg-dark hover:shadow-lg'
          }
        `}
      >
        <div className="text-[16px] font-semibold sm:text-[18px] sm:font-bold ">
          {title}
        </div>
      </div>

      {/* 날짜 부분 */}
      <div
        className={`
          px-4 py-3 text-center flex items-center justify-center rounded-lg transition-all duration-200
          ${
            // '일'이 포함된 날짜면 활성 색상, 아니면(8월, 추후공지 등) 흐린 색상
            hasDayString
              ? 'text-gray-02 '
              : 'text-gray-04 opacity-60'
          }
          ${
            showBorder ? 'border border-px border-gray-02' : ''
          }
        `}
      >
        <div
          className={
            hasDayString
              ? 'text-[16px] font-semibold sm:text-[18px] sm:font-bold '
              : 'text-[16px] font-regular sm:text-[18px] sm:font-regular '
          }
        >
          {date}
        </div>
      </div>
      {description && (
        <div className="text-gray-03 body-14-regular">{description}</div>
      )}
    </div>
  );
}
