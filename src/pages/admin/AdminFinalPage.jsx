import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/admin/DashboardHeader';
import TabFilter from '../../components/admin/TabFilter';
import ApplicantList from '../../components/admin/ApplicantList';
import ConfirmModal from '../../components/admin/ConfirmModal';

// (예시 데이터는 기존과 동일하다고 가정)
const INITIAL_DATA = [
  { id: 1, name: '김멋사', studentId: 'B912345', part: 'Frontend', phone: '010-1234-5678', isDocPass: true, isFinalPass: false, location: '', date: '', time: '' },
  { id: 2, name: '이디자', studentId: 'C112345', part: 'Design', phone: '010-1111-2222', isDocPass: false, isFinalPass: false, location: '', date: '', time: '' },
  { id: 3, name: '박백엔', studentId: 'B812345', part: 'Backend', phone: '010-3333-4444', isDocPass: true, isFinalPass: true, location: 'R420', date: '3/13', time: '14:00' },
];

const AdminFinalPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all');
  const [applicants, setApplicants] = useState(INITIAL_DATA);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',     // 'DOC' | 'FINAL'
    title: '',
    message: ''
  });
  
  // 최종 합격 토글
  const handleFinalToggle = (id) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, isFinalPass: !app.isFinalPass } : app
    ));
  };

  // 면접 정보 입력 핸들러
  const handleInfoChange = (id, field, value) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  // 1. 서류 합격자만 필터링 (기본 데이터)
  const docPassApplicants = applicants.filter(app => app.isDocPass);

  // 2. 화면 표시용 (탭 필터링 적용)
  const filteredApplicants = docPassApplicants.filter(item => {
    if (currentTab === 'all') return true;
    if (currentTab === 'plan_design') return item.part === 'PM' || item.part === 'Design';
    return item.part.toLowerCase() === currentTab;
  });

  // 1. [서류 문자] 버튼 클릭 시 모달 열기
  const handleDocMsgClick = () => {
    if (docPassApplicants.length === 0) return alert("발송 대상이 없습니다.");

    setModalConfig({
      isOpen: true,
      type: 'DOC',
      title: `서류합격 지원자들에게\n문자를 전송하시겠습니까?`,
      message: `총 ${docPassApplicants.length}명의 대상자에게 발송됩니다.\n문자 전송 대상이 올바르게 설정되었는지\n다시 한번 확인해주세요.`
    });
  };

  // 2. [최종 문자] 버튼 클릭 시 모달 열기
  const handleFinalMsgClick = () => {
    const finalPassers = docPassApplicants.filter(app => app.isFinalPass);
    if (finalPassers.length === 0) return alert("최종 합격자로 체크된 인원이 없습니다.");

    setModalConfig({
      isOpen: true,
      type: 'FINAL',
      title: `최종합격 지원자들에게\n문자를 전송하시겠습니까?`, // 문맥에 맞게 '최종'으로 변경
      message: `총 ${finalPassers.length}명의 대상자에게 발송됩니다.\n문자 전송 대상이 올바르게 설정되었는지\n다시 한번 확인해주세요.`
    });
  };
  // 3. 모달에서 [전송하기] 클릭 시 실행될 실제 로직
  const handleConfirmSend = () => {
    if (modalConfig.type === 'DOC') {
      // TODO: 서류 합격 문자 API 호출
      console.log("📨 서류 합격 문자 발송 완료");
      alert("서류 합격 문자가 발송되었습니다.");
    } 
    else if (modalConfig.type === 'FINAL') {
      // TODO: 최종 합격 문자 API 호출
      console.log("📨 최종 합격 문자 발송 완료");
      alert("최종 합격 문자가 발송되었습니다.");
    }
    closeModal();
  };

  // 모달 닫기
  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="w-full min-h-screen bg-bg-dark">
      <DashboardHeader />

      <main className="pt-[120px] px-[60px] w-full max-w-[1440px] mx-auto">
        
        {/* 상단 타이틀 영역 */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="title-32-bold text-white mb-2">최종 합격자 관리</h2>
            <p className="body-16-regular text-gray-04">
              서류 합격자 <span className="text-orange-04 font-bold">{docPassApplicants.length}</span>명
               (현재 필터: {filteredApplicants.length}명)
            </p>
          </div>

          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-3 rounded-full title-16-bold bg-gray-06 text-white hover:bg-gray-05 transition-all"
          >
            &lt; 전체 지원자 목록
          </button>
        </div>

        {/* ⭐ [탭 필터 + 문자 발송 버튼] 영역 */}
        <div className="flex justify-between items-center mb-6">
          
          {/* 좌측: 탭 필터 */}
          <TabFilter currentTab={currentTab} onTabChange={setCurrentTab} />

          {/* 우측: 문자 발송 버튼 그룹 */}
          <div className="flex gap-3">
            {/* 서류 합격 문자 버튼 */}
            <button 
              onClick={handleDocMsgClick}
              className="px-5 py-2 rounded-lg border bg-orange-03 border-orange-01 text-white body-14-bold hover:bg-orange-04 hover:text-white transition-all"
            >
              📄 서류 합격 문자 보내기
            </button>

            {/* 최종 합격 문자 버튼 */}
            <button 
              onClick={handleFinalMsgClick}
              className="px-5 py-2 rounded-lg bg-orange-02 border border-orange-01 text-white body-14-bold hover:bg-orange-01-hover transition-all"
            >
               🦁 최종 합격 문자 보내기
            </button>
          </div>

        </div>

        {/* 리스트 영역 */}
        <ApplicantList 
          applicants={filteredApplicants} 
          onToggle={handleFinalToggle} 
          onUpdate={handleInfoChange} 
          type="final" 
        />

        <ConfirmModal 
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          onConfirm={handleConfirmSend}
          title={modalConfig.title}
          message={modalConfig.message}
        />
        
      </main>
    </div>
  );
};

export default AdminFinalPage;