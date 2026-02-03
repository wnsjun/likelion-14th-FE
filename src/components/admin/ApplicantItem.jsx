import { useState } from 'react';
import EditIcon from '../../assets/icon/edit.svg';

const ApplicantItem = ({ applicant, onToggle, onUpdate, type }) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatPart = (part) => {
    switch(part) {
      case 'PM':
      case 'Design': return '기/디';
      case 'Frontend': return '프론트';
      case 'Backend': return '백';
      default: return part;
    }
  };

  const CheckBox = ({ checked, onClick }) => (
    <div 
      onClick={onClick}
      className={`w-6 h-6 rounded-[4px] border flex items-center justify-center cursor-pointer transition-all
        ${checked 
          ? 'bg-orange-01 border-orange-04' 
          : 'bg-transparent border-gray-06 hover:border-gray-04'
        }`}
    >
      {checked && (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5L4.5 8.5L12.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const inputBaseStyle = "w-full h-[36px] rounded-[4px] px-2 text-center text-sm outline-none transition-all";
  const activeInputStyle = "bg-gray-01 text-black focus:ring-1 focus:ring-orange-04";
  const disabledInputStyle = "bg-transparent text-gray-03 cursor-default";

  return (
    <div className="w-full h-[60px] bg-bg-secondary rounded-[8px] border border-gray-07 mb-2 px-6 flex items-center hover:border-orange-04 transition-all">
      
      {/* 1. 파트 (8%) */}
      <div className="w-[8%] text-gray-03 body-14-medium text-left truncate">
        {formatPart(applicant.part)}
      </div>

      {/* 2. 이름 (10%) */}
      <div className="w-[10%] text-white body-16-semibold text-center truncate">
        {applicant.name}
      </div>

      {/* 3. 학번 (12%) */}
      <div className="w-[12%] text-gray-04 body-14-regular text-center truncate">
        {applicant.studentId}
      </div>

      {/* 4. 전화번호 (15%) */}
      <div className="w-[15%] text-gray-04 body-14-regular text-center truncate">
        {applicant.phone}
      </div>

      {/* 5. ⭐ 면접 정보 영역 (45%) - Flex gap으로 여백 확보 */}
      <div className="w-[45%] flex items-center justify-center gap-2 px-2 relative">
        {type === 'final' ? (
          <>
            {/* 장소 */}
            <input 
              type="text"
              placeholder="장소"
              value={applicant.location || ''}
              disabled={!isEditing} 
              onChange={(e) => onUpdate(applicant.id, 'location', e.target.value)}
              className={`flex-1 ${inputBaseStyle} ${isEditing ? activeInputStyle : disabledInputStyle}`}
            />

            {/* 날짜 */}
            <input 
              type="text"
              placeholder="날짜"
              value={applicant.date || ''}
              disabled={!isEditing}
              onChange={(e) => onUpdate(applicant.id, 'date', e.target.value)}
              className={`flex-1 ${inputBaseStyle} ${isEditing ? activeInputStyle : disabledInputStyle}`}
            />

            {/* 시간 */}
            <input 
              type="text"
              placeholder="시간"
              value={applicant.time || ''}
              disabled={!isEditing}
              onChange={(e) => onUpdate(applicant.id, 'time', e.target.value)}
              className={`flex-1 ${inputBaseStyle} ${isEditing ? activeInputStyle : disabledInputStyle}`}
            />
            
            {/* ⭐ 수정 버튼 (Flex 흐름 안에 배치하거나 우측 끝에 고정) */}
            <div className="w-[40px] flex justify-center flex-shrink-0">
               <button 
                onClick={handleEditClick}
                className="flex items-center justify-center"
              >
                {isEditing ? (
                  <span className="detail-12-medium text-orange-04 hover:text-orange-04-hover cursor-pointer whitespace-nowrap">
                    적용
                  </span>
                ) : (
                  <div className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100">
                    <img src={EditIcon} alt="Edit" />
                  </div>
                )}
              </button>
            </div>
          </>
        ) : (
          /* 서류 관리 페이지에서는 비워둠 */
          <div className="w-full h-[36px]"></div>
        )}
      </div>

      {/* 6. 체크박스 (10%) */}
      <div className="w-[10%] flex justify-center">
        {type === 'doc' ? (
          <CheckBox 
            checked={applicant.isDocPass} 
            onClick={() => onToggle(applicant.id, 'doc')}
          />
        ) : (
          <CheckBox 
            checked={applicant.isFinalPass} 
            onClick={() => onToggle(applicant.id, 'final')}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicantItem;