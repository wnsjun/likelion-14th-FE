import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApplicants, updateDocumentPass } from '../../apis/admin/Admin'; // API import
import DashboardHeader from '../../components/admin/DashboardHeader';
import TabFilter from '../../components/admin/TabFilter';
import ApplicantList from '../../components/admin/ApplicantList';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 파라미터 없이 호출하면 전체 조회
        const data = await getApplicants(); 
        
        // 🛠️ 서버 데이터를 UI 데이터 구조로 변환 (매핑)
        const formattedData = data.map(item => ({
          id: item.studentId,         // DB ID (0)
          studentId: item.studentNum, // 학번 (B912345)
          name: item.name,
          phone: item.phoneNum,
          
          // 파트 한글 -> 영문 변환 (UI 필터링 호환용)
          part: convertPartToEnglish(item.part),
          
          // 결과 텍스트 -> Boolean 변환
          isDocPass: item.document === '합격',
          isFinalPass: item.finalResult === '합격',
          
          // API에 없는 필드는 기본값 처리
          docLink: '', 
        }));

        setApplicants(formattedData);
      } catch (error) {
        console.error("지원자 조회 실패:", error);
        alert("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔤 파트명 변환 헬퍼 함수
  const convertPartToEnglish = (koreanPart) => {
    switch (koreanPart) {
      case '디자인': return 'Design';
      case '프론트엔드': return 'Frontend';
      case '백엔드': return 'Backend';
      default: return 'Frontend'; 
    }
  };

  const handleDocToggle = async (id) => {
    const target = applicants.find(app => app.id === id);
    if (!target) return;

    const newCheckedState = !target.isDocPass; 

    try {
      await updateDocumentPass(id, newCheckedState);
      
      setApplicants(prev => prev.map(app => 
        app.id === id ? { ...app, isDocPass: newCheckedState } : app
      ));

      console.log(`학생(ID:${id}) 서류 합격 상태 변경: ${newCheckedState}`);

    } catch (error) {
      console.error("서류 합격 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const filteredApplicants = applicants.filter(item => {
    if (currentTab === 'all') return true;
    if (currentTab === 'plan_design') return item.part === 'PM' || item.part === 'Design';
    return item.part.toLowerCase() === currentTab;
  });

  return (
    <div className="w-full min-h-screen bg-bg-dark">
      <DashboardHeader />

      <main className="pt-[120px] px-[60px] w-full max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="title-32-bold text-white mb-2">지원자 관리</h2>
            <p className="body-16-regular text-gray-04">
              전체 지원자 <span className="text-orange-04 font-bold">{filteredApplicants.length}</span>명
            </p>
          </div>

          <button 
            onClick={() => navigate('/admin/final')}
            className="px-6 py-3 rounded-full title-16-bold bg-orange-01 text-white hover:bg-orange-01-hover transition-all"
          >
            합격자 관리로 이동 &gt;
          </button>
        </div>

        <TabFilter currentTab={currentTab} onTabChange={setCurrentTab} />

        {loading ? (
          <div className="w-full py-20 text-center text-white">로딩중...</div>
        ) : (
          <ApplicantList 
            applicants={filteredApplicants} 
            onToggle={handleDocToggle} 
            type="doc" 
          />
        )}
        
      </main>
    </div>
  );
};

export default AdminDashboardPage;