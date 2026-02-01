import { useLocation, useNavigate } from 'react-router-dom';
import ButtonApply from './ButtonApply';
import { useState, useEffect } from 'react';
import menu from '../assets/icon/menu.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져옵니다.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const mobileGradient =
  //   'bg-[radial-gradient(50%_50%_at_50%_50%,#BA4E23_0%,rgba(8,3,0,0)_100%)]';
  // const desktopGradient =
  //   'bg-[radial-gradient(50%_50%_at_50%_50%,#BA4E23_0%,#080300_100%)]';

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const NavItem = ({ label, path }) => {
    // 현재 페이지 경로와 메뉴의 경로가 일치하는지 확인합니다.
    const isActive = location.pathname === path;

    return (
      <div
        onClick={() => navigate(path)}
        className="relative mx-0 px-[24px] py-[16px] cursor-pointer group flex items-center justify-center"
      >
        {/* 1. 배경 그라데이션: 현재 페이지(isActive)면 opacity-100, 아니면 호버 시에만 나타남 */}
        <div
          className={`
            absolute min-[1024px]:inset-0 transition-opacity duration-300 inset-x-5 inset-y-4
          min-[1024px]:bg-[radial-gradient(50%_50%_at_50%_50%,#BA4E23_0%,#080300_100%)] bg-[radial-gradient(50%_50%_at_50%_50%,#BA4E23_0%,rgba(8,3,0,0)_100%)]
            ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}
        />

        {/* 2. 텍스트 레이어: 현재 페이지면 흰색과 굵은 글씨로 강조 */}
        <span
          className={`
            relative z-10 navbar_explanation transition-colors duration-300
          `}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="responsive-layout flex items-center justify-between my-[8px] py-[8px]">
      <div
        onClick={() => navigate('/')}
        className=" py-[16px] cursor-pointer navbar_title z-[60] transition-colors duration-300 hover:text-gray-02"
      >
        LIKELION HONGIK
      </div>

      <div className="hidden min-[1024px]:flex justify-between items-center">
        <div className="flex">
          <NavItem label="모집 안내" path="/recruiting" />
          <NavItem label="지난 활동" path="/archive" />
          <NavItem label="행사 일정" path="/events" />
          <NavItem label="FAQ" path="/faq" />
        </div>
        <ButtonApply type="short" className="ml-[24px]" />
      </div>

      {/* 2. 햄버거 아이콘 (1024px 미만에서만 보임) */}
      <img
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="min-[1024px]:hidden w-[24px] h-[24px] z-[60] cursor-pointer"
        src={menu}
      />
      <div
        className={`fixed inset-0 bg-bg-dark/80 z-50 transition-transform duration-300 min-[1024px]:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <NavItem label="모집 안내" path="/recruiting" mobile />
          <NavItem label="지난 활동" path="/archive" mobile />
          <NavItem label="행사 일정" path="/events" mobile />
          <NavItem label="FAQ" path="/faq" mobile />
          <div className="pt-10">
            <ButtonApply type="short" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
