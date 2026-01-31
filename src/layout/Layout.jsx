import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../layout/Footer';

const Layout = () => {
  const location = useLocation();

  // 헤더가 없는(상단 패딩을 제거할) 페이지 목록
  const noHeaderPages = ['/apply-check', '/apply-closed'];

  const isNoHeaderPage = noHeaderPages.includes(location.pathname);

  const headerConfig = {
    '/events': {
      subtitle: '행사 일정',
      title: 'Program',
      description:
        '2024년 멋쟁이사자처럼 14기에서 진행할\n1년 로드맵을 소개합니다',
    },
    '/archive': {
      subtitle: '지난 활동',
      title: 'Archive',
      description:
        '2025년 멋쟁이 사자처럼 13기에서 진행한\n프로젝트와 활동을 소개합니다.',
    },
    '/recruiting': {
      subtitle: '모집 안내',
      title: 'Recruiting',
      description:
        '2026년 멋쟁이사자처럼을 함깨할 14기 멤버를 모집합니다.\n일정 및 소개를 반드시 읽고 지원폼을 제출해주세요.',
    },
  };

  const currentHeader = headerConfig[location.pathname];

  return (
    <div className="w-full min-h-screen bg-bg-dark overflow-x-hidden">
      {/* 1. 네브바 고정 영역 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-bg-dark">
        <Navbar />
      </div>

      {/* 2. 컨텐츠 영역 (네브바 높이만큼 아래로 밀기) */}
      <div
        className={`responsive-layout  ${isNoHeaderPage ? '' : 'pt-[70px]'}`}
      >
        {/* 이제 이 안의 PageHeader와 본문은 정확히 responsive-layout 너비를 따릅니다 */}
        {currentHeader && <PageHeader {...currentHeader} />}
        <main className={`${isNoHeaderPage ? '' : 'py-10'}`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
