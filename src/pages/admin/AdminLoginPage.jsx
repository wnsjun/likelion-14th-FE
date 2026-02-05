import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from '../../components/admin/LoginForm';
import { loginAdmin } from '../../apis/admin/Admin';

const AdminLoginPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // 1. 새로고침 막기
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!id || !pw) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await loginAdmin(id, pw);
      
      if (response.status === 200) {       
        localStorage.setItem('adminToken', 'admin-logged-in'); 

        alert("운영진 로그인 성공!");
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      
      // 에러 처리 (401: 비번틀림, 403: 보안문제 등)
      if (error.response && error.response.status === 401) {
         alert("로그인 실패: 아이디나 비밀번호를 확인해주세요.");
      } else {
         alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-bg-dark">
      <LoginForm id={id} setId={setId} pw={pw} setPw={setPw} handleLogin={handleLogin} />
    </div>
  );
};

export default AdminLoginPage;