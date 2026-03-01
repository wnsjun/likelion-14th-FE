import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 추가
import arrow from '../assets/icon/arrow.svg';

const ButtonApplyFE = ({ type, className, onClick }) => {
  const navigate = useNavigate();

  // 날짜 관련 로직
  const now = new Date();
  const currentYear = now.getFullYear();


  // 🗓️ 기간 설정
  const startDate = new Date("2026-02-28T10:00:00+09:00"); // 2월 28일 10:00:00
  const endDate = new Date("2026-03-02T22:00:00+09:00"); // 3월 2일 22:00:00

  // 상태 판별
  const isBefore = now < startDate;
  const isAfter = now > endDate;
  const isOngoing = !isBefore && !isAfter;

  // ButtonApply가 결과 조회 역할을 하므로 기간이 지난 경우에는 버튼 자체를 렌더링하지 않도록 설정
  if (isAfter) {
    return null;
  }

  // 🔗 구글 폼 주소
  const GOOGLE_FORM_URL =
    'https://docs.google.com/forms/d/1wU1jXZtfOoAu_ksIwLwjeKB9eFCcHRAvPl04uhejgeo/viewform';

  // 버튼 클릭 핸들러
  const handleApply = () => {
    // 1. 기간 전
    if (isBefore) {
      alert('아직 지원 기간이 아닙니다.\n지원 기간: 2월 28일 10:00 ~ 3월 2일 22:00');
      return;
    }

    // 2. 기간 후 (마감)
    if (isAfter) {
      // 모든 타입 버튼 결과 확인 페이지로 이동
      navigate('/apply-check');
      window.scrollTo(0, 0); // 페이지 상단으로 이동
      return;
    }

    // 3. 기간 내 (지원하기)
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    if (onClick) onClick();
  };

  // 🎨 스타일 로직 설정

  // 회색 스타일 (기간 전일 때만)
  const isGrayStyle = isBefore;

  // 오렌지 스타일 (기간 중이거나 기간 후일 때)
  const isOrangeStyle = isOngoing || isAfter;

  const baseStyle =
    'flex justify-center items-center whitespace-nowrap rounded-full border-[1.5px] transition-colors duration-300';

  // 스타일 정의
  const orangeClasses =
    'bg-orange-01 hover:bg-orange-01-hover cursor-pointer border-orange-04 text-white'; // border 색상은 타입별 미세조정 필요시 덮어씌움
  const grayClasses =
    'bg-[#606060] border-[#606060] text-gray-04 cursor-pointer';

  // 타입별 크기/폰트 설정
  const long_title = 'w-fit pl-[32px] pr-[24px] py-[16px] title-20-bold';
  const short = 'w-fit px-[16px] py-[8px] body-18-semibold';
  const long_footer =
    'w-fit pl-[32px] pr-[24px] py-[16px] md:text-[20px] text-[18px] font-bold';

  // 📝 텍스트 결정 로직
  const getButtonText = () => {
    if (type === 'short') {
      if (isBefore) return '오픈예정';
      if (isAfter) return '결과 확인';
      return '추가 지원하기';
    }
    // Long types
    else {
      if (isBefore) return '아직 추가 모집 지원 기간이 아닙니다.';
      if (isAfter) return '홍대 멋사 지원결과 확인하기';
      return '프론트엔드 추가 지원하기';
    }
  };

  return (
    <button
      onClick={handleApply}
      className={`
        ${baseStyle}
        ${type === 'long_title' && long_title}
        ${type === 'short' && short}
        ${type === 'long_footer' && long_footer}
        
        ${/* 색상 적용 */ ''}
        ${isOrangeStyle ? orangeClasses : ''}
        ${isGrayStyle ? grayClasses : ''}
        
        ${/* Short 타입일 때 오렌지 보더 미세 조정 (기간 중일 때만) */ ''}
        ${type === 'short' && isOrangeStyle ? 'border-orange-02' : ''}
        
        ${className || ''}
      `}
    >
      {/* 텍스트 및 아이콘 렌더링 */}
      <div className="flex justify-center items-center">
        <span>{getButtonText()}</span>

        {/* 화살표 아이콘은 Long 타입이면서 회색 상태가 아닐 때만 표시 (선택사항) */}
        {/* 혹은 기간 전만 아니면 표시하도록 설정 */}
        {(type === 'long_title' || type === 'long_footer') && !isBefore && (
          <img
            src={arrow}
            alt="arrow"
            className="ml-[10px] w-[31px] flex-shrink-0"
          />
        )}
      </div>
    </button>
  );
};

export default ButtonApplyFE;
