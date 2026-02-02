import { useState } from 'react';

const LoginForm = ({ id, setId, pw, setPw, handleLogin }) => {

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    handleLogin();
  };

  return (
    <div className="w-[400px] flex flex-col items-center p-8 rounded-[16px] bg-bg-secondary border border-gray-07 shadow-lg">
      
      {/* 타이틀 영역 */}
      <div className="text-center mb-10">
        <h2 className="title-24-bold text-orange-04 mb-2">ADMIN LOGIN</h2>
        <p className="body-16-medium text-white">
          멋쟁이사자처럼 14기 운영진 전용
        </p>
      </div>

      {/* 입력 폼 영역 */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        
        {/* 아이디 입력 */}
        <div className="flex flex-col gap-1">
          <label className="detail-12-regular text-gray-04 ml-1">ID</label>
          <input 
            type="text" 
            value={id || ''}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
            className="w-full h-[54px] p-[16px] rounded-[8px] bg-gray-01 text-black placeholder:text-gray-04 outline-none focus:ring-2 focus:ring-orange-04 transition-all"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col gap-1">
          <label className="detail-12-regular text-gray-04 ml-1">Password</label>
          <input 
            type="password" 
            value={pw || ''}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full h-[54px] p-[16px] rounded-[8px] bg-gray-01 text-black placeholder:text-gray-04 outline-none focus:ring-2 focus:ring-orange-04 transition-all"
          />
        </div>

        {/* 로그인 버튼 */}
        <button 
          type="submit"
          className="mt-6 w-full h-[54px] rounded-[8px] bg-orange-01 border border-orange-04 text-white font-bold hover:bg-[#531E08] transition-all duration-200"
        >
          로그인
        </button>
      </form>

    </div>
  );
};

export default LoginForm;