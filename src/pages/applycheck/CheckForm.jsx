import errorIcon from '../../assets/apply/CloseCircleFilled.svg';
import closeIcon from '../../assets/apply/CloseCircle.svg';

const CheckForm = ({
  name,
  setName,
  num,
  setNum,
  onCheck,
  isError,
  setIsError,
}) => {
  const isActive = name?.trim().length > 0 && num?.trim().length > 0;

  const handleSubmit = () => {
    if (!isActive) return;
    onCheck(); // 부모가 이미 데이터를 갖고 있으므로 인자 없이 호출
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isActive) {
      handleSubmit();
    }
  };

  const handleCodeChange = (e) => {
    setNum(e.target.value); // 부모의 setNum 사용
    if (isError) {
      setIsError(false);
    }
  };

  const clearName = () => {
    setName('');
    if (isError) setIsError(false);
  };

  const clearCode = () => {
    setNum('');
    if (isError) setIsError(false);
  };

  const commonWidthClass = 'w-[323px] md:w-[370px]';

  return (
    <div className="w-full flex flex-col gap-6 px-4 items-center">
      {/* 안내 문구 */}
      <div className="text-center mb-10">
        <h2
          className="
            text-[32px] font-semibold leading-tight  {/* 모바일 기본 (32px) */}
            sm:text-[48px] font-bold                 {/* PC (md) 이상에서 48px로 덮어쓰기 */}
            text-white mt-10
        "
        >
          홍익대 멋사 14기
          <br />
          지원결과 조회
        </h2>
      </div>

      {/* 입력 필드 영역 */}
      <div className="flex flex-col items-center gap-2 bp-14">
        {/* 1. 이름 입력 */}
        <div className={`flex flex-col gap-1 ${commonWidthClass}`}>
          <label className="detail-12-regular text-gray-04 ml-1">Name</label>
          <div className="relative w-full items-center">
            <input
              type="text"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="성함을 입력해주세요"
              className={`flex w-full h-[54px] p-[16px] items-center gap-[10px] rounded-[8px] bg-gray-01 text-black placeholder:text-gray-04 outline-none focus:ring-[1px] focus:ring-yellow-main 
                ${isError ? 'ring-[1px] ring-[#DE2E2E] pr-[44px]' : ''}
                ${!isError && num?.length > 0 ? 'pr-[44px]' : ''}
              `}
            />
            {/* 아이콘 로직 */}
            {(isError || num?.length > 0) && (
              <img
                src={isError ? errorIcon : closeIcon}
                alt="clear"
                onClick={clearName}
                className="absolute right-[16px] top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:opacity-80"
              />
            )}
          </div>
        </div>

        {/* 2. 식별코드 입력 (변수명 num 사용) */}
        <div className={`flex flex-col gap-1 mt-2 ${commonWidthClass}`}>
          <label className="detail-12-regular text-gray-04 ml-1">Code</label>
          <div className="relative w-full items-center">
            <input
              type="text"
              value={num || ''}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              placeholder="본인이 설정한 식별코드를 입력해주세요"
              className={`flex w-full h-[54px] p-[16px] items-center gap-[10px] rounded-[8px] bg-gray-01 text-black placeholder:text-gray-04 outline-none focus:ring-[1px] focus:ring-yellow-main 
                ${isError ? 'ring-[1px] ring-[#DE2E2E] pr-[44px]' : ''}
                ${!isError && num?.length > 0 ? 'pr-[44px]' : ''}
              `}
            />

            {/* 아이콘 로직 */}
            {(isError || num?.length > 0) && (
              <img
                src={isError ? errorIcon : closeIcon}
                alt="clear"
                onClick={clearCode}
                className="absolute right-[16px] top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:opacity-80"
              />
            )}
          </div>

          <label className="detail-12-regular text-gray-02 ml-1 leading-relaxed">
            *식별코드가 기억나지 않으신다면, 지원 시 사용한 메일로 전송된
            <br />
            <span className="detail-12-semibold text-gray-01">
              '구글 폼 응답 사본'
            </span>
            에서 확인하실 수 있습니다.
          </label>
        </div>

        {/* 에러 메시지 */}
        {isError && (
          <label className="detail-12-semibold text-[#DE2E2E] mt-[30px] ml-1">
            이름 및 코드를 다시 확인해주세요
          </label>
        )}

        {/* 조회 버튼 */}
        <div className="{`${commonWidthClass}`}">
          <button
            onClick={handleSubmit}
            disabled={!isActive}
            className={`mt-2 h-[54px] p-[16px] rounded-[8px] text-white font-bold transition-all duration-200 ${commonWidthClass}
              ${
                isActive
                  ? 'bg-orange-01 border border-orange-04 hover:bg-orange-01-hover cursor-pointer'
                  : 'bg-gray-04 cursor-not-allowed border-none'
              }
            `}
          >
            지원 결과 조회하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckForm;
