import { MANAGER_DATA } from '../../data/ManagerData';

const MemberCard = ({ member }) => (
  /* 전체 컨테이너: 모바일은 세로(col), 데스크탑(md)은 가로(row) */
  <div className="flex flex-col md:flex-row md:items-start lg:items-center gap-[12px] md:gap-[24px]">
    {/* --- 1. 모바일 전용 헤더 (아이콘 + 이름 가로 배치) --- */}
    <div className="md:hidden sm:block flex flex-col gap-[8px]">
      <div className="flex md:hidden flex-row items-center gap-[8px] mb-[8px]">
        <div className="w-[24px] h-[24px] rounded-full bg-[#D9D9D9] overflow-hidden shrink-0">
          <img
            src={member.imgSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="title-20-semibold text-gray-01 ">{member.name}</div>
      </div>
      <div className="flex flex-col gap-[4px]">
        <div className="body-16-regular text-gray-04 leading-tight">
          {member.major}
        </div>
        {member.phone && (
          <div className="body-16-regular text-gray-04 leading-tight">
            {member.phone}
          </div>
        )}
      </div>
    </div>
    {/* md일때 */}
    <div className="hidden md:block lg:hidden flex flex-row justify-center items-center ">
      <div className="flex flex-row gap-x-[16px]">
        <div className="flex w-[100px] h-[100px] rounded-full bg-[#D9D9D9] overflow-hidden shrink-0">
          <img src={member.imgSrc} alt="" className=" object-cover" />
        </div>
        <div className="flex flex-col justify-center items-start">
          <div className="title-20-semibold lg:text-center text-start text-gray-01">
            {member.name}
          </div>
          <div className="flex flex-col gap-[4px] lg:text-center text-start">
            <div className="body-16-regular text-gray-04 leading-tight">
              {member.major}
            </div>
            {member.phone && (
              <div className="body-16-regular text-gray-04 leading-tight">
                {member.phone}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {/* --- 3. Large 전용 (이미지 아래에 텍스트, 중앙 정렬) --- */}
    {/* ✅ 핵심: flex-col과 items-center를 주어 모든 요소를 수직 중앙으로 맞춥니다. */}
    <div className="hidden lg:flex flex-col items-center gap-y-[16px] w-full">
      <div className="w-[114px] h-[114px] rounded-full bg-[#D9D9D9] overflow-hidden shrink-0">
        <img
          src={member.imgSrc}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-y-[8px]">
        <div className="title-20-semibold text-center text-gray-01">
          {member.name}
        </div>
        <div className="flex flex-col gap-[4px] text-center">
          <div className="body-16-regular text-gray-04 leading-tight">
            {member.major}
          </div>
          {member.phone && (
            <div className="body-16-regular text-gray-04 leading-tight">
              {member.phone}
            </div>
          )}
        </div>
      </div>
    </div>{' '}
  </div>
);

// 2. 메인 섹션 컴포넌트
const Manager = () => {
  // 시안처럼 행 단위로 파트를 묶어줍니다.
  const parts = [
    ['회장', '기획/디자인', '프론트엔드', '백엔드'], // 첫 번째 줄 (1명 + 3명)
  ];

  return (
    <div className="flex flex-col bg-bg-secondary">
      <div className="title-20-bold text-white mb-[30px]">운영진</div>

      {/* 행(Row) 단위로 렌더링 */}
      {parts.map((parts, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 lg:grid-flow-col lg:grid-rows-2 gap-y-[64px] lg:gap-x-[112px]"
        >
          {parts.map((part) => (
            <div key={part} className="flex flex-col gap-[24px]">
              {/* 파트 이름 표기 */}
              <div className="body-16-semibold lg:bg-gray-02 bg-transparent border-[1.5px] border-gray-02 text-gray-02 rounded-full w-fit lg:text-gray-07 px-[20px] py-[8px]">
                {part}
              </div>

              {/* 멤버 리스트: min-w-max를 추가하여 3명인 파트가 찌그러지지 않게 합니다. */}
              <div className="flex flex-row gap-[32px] min-w-max">
                {MANAGER_DATA.filter((m) => m.part === part).map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Manager;
