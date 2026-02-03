import ApplicantItem from './ApplicantItem';

const ApplicantList = ({ applicants, onToggle, onUpdate, onSave, type }) => {
  const isEmpty = !applicants || applicants.length === 0;

  return (
    <div className="w-full pb-20">
      
      {/* 헤더 비율 (총 100%) */}
      <div className="flex px-6 mb-2 text-gray-04 detail-12-medium text-center">
        {/* 기본 정보 (44%) */}
        <div className="w-[8%] text-left">파트</div>
        <div className="w-[10%]">이름</div>
        <div className="w-[10%]">학번</div>
        <div className="w-[16%]">전화번호</div>
        
        {/* 면접 정보 (43%) - 각각 15%씩 할당 */}
        <div className="w-[15%] text-center">
          {type === 'final' ? '면접 장소' : ''}
        </div>
        <div className="w-[13%] text-center">
          {type === 'final' ? '면접 날짜' : ''}
        </div>
        <div className="w-[15%] text-center">
          {type === 'final' ? '면접 시간' : ''}
        </div>

        {/* 체크박스 (13%) */}
        <div className="w-[13%] text-center">
          {type === 'doc' ? '서류 합격' : '최종 합격'}
        </div>
      </div>

      {isEmpty ? (
        <div className="w-full py-20 flex flex-col items-center justify-center text-gray-05">
          <p className="body-18-medium">해당하는 지원자가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {applicants.map((item) => (
            <ApplicantItem 
              key={item.id} 
              applicant={item} 
              onToggle={onToggle}
              onUpdate={onUpdate}
              onSave={onSave}
              type={type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantList;