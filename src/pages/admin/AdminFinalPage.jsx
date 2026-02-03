import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocPassers, updateMeetingInfo, updateFinalResult, sendDocumentMessage, sendFinalMessage } from '../../apis/admin/Admin'; // API import
import DashboardHeader from '../../components/admin/DashboardHeader';
import TabFilter from '../../components/admin/TabFilter';
import ApplicantList from '../../components/admin/ApplicantList';
import ConfirmModal from '../../components/admin/ConfirmModal'; // 경로 확인 필요

const AdminFinalPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all');
  const [applicants, setApplicants] = useState([]); // 초기값 빈 배열
  const [loading, setLoading] = useState(false);

  // 모달 상태 관리
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '', // 'DOC' | 'FINAL'
    title: '',
    message: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
      const data = await getDocPassers(); 
      
      const formattedData = data.map(item => ({
        id: item.studentId,        
        studentId: item.studentNum, 
        name: item.name,
        phone: item.phoneNum,
        
        // 파트 변환
        part: convertPartToEnglish(item.part),
        
        // 합격 여부 변환
        isDocPass: item.document === '합격',
        isFinalPass: item.finalResult === '합격',
        
        location: item.location || '', 
        date: item.meetingDate || '', 
        time: item.meetingTime || ''
      }));

      setApplicants(formattedData);

    } catch (error) {
        console.error("서류 합격자 조회 실패:", error);
        alert("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 파트명 변환 헬퍼
  const convertPartToEnglish = (koreanPart) => {
    switch (koreanPart) {
      case '디자인': return 'Design';
      case '프론트엔드': return 'Frontend';
      case '백엔드': return 'Backend';
      default: return 'Frontend';
    }
  };

  const handleFinalToggle = async (id) => {
    // 1. 현재 변경하려는 지원자 찾기
    const target = applicants.find(app => app.id === id);
    if (!target) return;

    // 2. 바꿀 상태 값 계산 (현재 상태의 반대)
    const newCheckedState = !target.isFinalPass;

    try {
      // 3. API 호출 (PATCH)
      await updateFinalResult(id, newCheckedState);
      
      // 4. 성공 시 화면 상태 업데이트
      setApplicants(prev => prev.map(app => 
        app.id === id ? { ...app, isFinalPass: newCheckedState } : app
      ));

      console.log(`학생(ID:${id}) 최종 합격 상태 변경: ${newCheckedState}`);

    } catch (error) {
      console.error("최종 합격 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다. 다시 시도해주세요.");
      // 실패 시 화면은 그대로 둠 (이미 바뀌지 않았으므로)
    }
  };

  // 면접 정보 입력 핸들러
  const handleInfoChange = (id, field, value) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const handleSaveMeeting = async (id, currentData) => {
    try {
      const requestBody = {
        meetingDate: currentData.date,      
        meetingTime: currentData.time,      
        location: currentData.location      
      };

      await updateMeetingInfo(id, requestBody);
      alert("면접 정보가 저장되었습니다.");
      
    } catch (error) {
      console.error("면접 정보 저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  const filteredApplicants = applicants.filter(item => {
    if (currentTab === 'all') return true;
    if (currentTab === 'plan_design') return item.part === 'PM' || item.part === 'Design';
    return item.part.toLowerCase() === currentTab;
  });

  // 1. [서류 문자] 버튼 클릭 시 모달 열기
  const handleDocMsgClick = () => {
    if (applicants.length === 0) return alert("발송 대상이 없습니다.");

    setModalConfig({
      isOpen: true,
      type: 'DOC',
      title: `서류합격 지원자들에게\n문자를 전송하시겠습니까?`,
      message: `총 ${applicants.length}명의 대상자에게 발송됩니다.\n문자 전송 대상이 올바르게 설정되었는지\n다시 한번 확인해주세요.`
    });
  };

  // 2. [최종 문자] 버튼 클릭 시 모달 열기
  const handleFinalMsgClick = () => {
    const finalPassers = applicants.filter(app => app.isFinalPass);
    if (finalPassers.length === 0) return alert("최종 합격자로 체크된 인원이 없습니다.");

    setModalConfig({
      isOpen: true,
      type: 'FINAL',
      title: `최종합격 지원자들에게\n문자를 전송하시겠습니까?`,
      message: `총 ${finalPassers.length}명의 대상자에게 발송됩니다.\n문자 전송 대상이 올바르게 설정되었는지\n다시 한번 확인해주세요.`
    });
  };

  // 3. 모달 닫기
  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  // 4. 모달에서 [전송하기] 클릭 시
  const handleConfirmSend = async () => {
    try {
      if (modalConfig.type === 'DOC') {
        // 1. 서류 합격 문자 발송 API 호출
        await sendDocumentMessage();
        
        console.log("📨 서류 결과 문자 발송 완료");
        alert("서류 전형 결과 문자가 발송되었습니다.");
      } 
      else if (modalConfig.type === 'FINAL') {
        // 2. 최종 합격 문자 발송 API 호출
        await sendFinalMessage();
        console.log("📨 최종 합격 문자 발송 완료");
        alert("최종 합격 문자가 발송되었습니다.");
      }
    } catch (error) {
      console.error("문자 발송 실패:", error);
      alert("문자 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      // 성공하든 실패하든 모달 닫기
      closeModal();
    }
  };
  return (
    <div className="w-full min-h-screen bg-bg-dark">
      <DashboardHeader />

      <main className="pt-[120px] px-[60px] w-full max-w-[1440px] mx-auto">
        
        {/* 상단 타이틀 영역 */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="title-32-bold text-white mb-2">합격자 관리</h2>
            <p className="body-16-regular text-gray-04">
              서류 합격자 <span className="text-orange-04 font-bold">{applicants.length}</span>명
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

        {/* 탭 필터 + 문자 발송 버튼 영역 */}
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
        {loading ? (
           <div className="w-full py-20 text-center text-white">로딩중...</div>
        ) : (
          <ApplicantList 
            applicants={filteredApplicants} 
            onToggle={handleFinalToggle} 
            onUpdate={handleInfoChange} 
            onSave={handleSaveMeeting}
            type="final" 
          />
        )}

        {/* 모달 렌더링 */}
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