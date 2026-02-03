import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/admin/DashboardHeader';
import TabFilter from '../../components/admin/TabFilter';
import ApplicantList from '../../components/admin/ApplicantList';

const INITIAL_DATA = [
  { id: 1, name: '김멋사', studentId: 'B912345', part: 'Frontend', phone: '010-1234-5678', docLink: 'https://google.com', isDocPass: true, isFinalPass: false },
  { id: 2, name: '이디자', studentId: 'C112345', part: 'Design', phone: '010-1111-2222', docLink: 'https://google.com', isDocPass: false, isFinalPass: false },
  { id: 3, name: '박백엔', studentId: 'B812345', part: 'Backend', phone: '010-3333-4444', docLink: '', isDocPass: true, isFinalPass: true },
  { id: 4, name: '최기획', studentId: 'C212345', part: 'PM', phone: '010-5555-6666', docLink: 'https://google.com', isDocPass: false, isFinalPass: false },
  { id: 5, name: '정프론', studentId: 'B712345', part: 'Frontend', phone: '010-7777-8888', docLink: 'https://google.com', isDocPass: true, isFinalPass: false },
];

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all');
  const [applicants, setApplicants] = useState(INITIAL_DATA);
  
  // 서류 합격 토글 함수
  const handleDocToggle = (id) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, isDocPass: !app.isDocPass } : app
    ));
  };

  // 탭 필터링
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

          {/* 버튼 클릭 시 새 페이지로 이동 */}
          <button 
            onClick={() => navigate('/admin/final')}
            className="px-6 py-3 rounded-full title-16-bold bg-orange-01 text-white hover:bg-orange-01-hover transition-all"
          >
            서류 합격자 관리로 이동 &gt;
          </button>
        </div>

        <TabFilter currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* type="doc"을 전달해서 서류 체크박스만 나오게 함 */}
        <ApplicantList 
          applicants={filteredApplicants} 
          onToggle={handleDocToggle} 
          type="doc" 
        />
        
      </main>
    </div>
  );
};
export default AdminDashboardPage;