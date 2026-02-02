import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from '../../components/admin/LoginForm';
import { loginAdmin } from '../../apis/admin/Admin';

const AdminLoginPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    // 유효성 검사
    if (!id || !pw) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await loginAdmin(id, pw);
      if (response.status === 200) {
        alert("운영진 로그인 성공!");
        navigate('/admin/dashboard');
      }
    } catch (error) {
      alert("로그인 실패! 아이디나 비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-bg-dark">
      <LoginForm id={id} setId={setId} pw={pw} setPw={setPw} handleLogin={handleLogin} />
    </div>
  );
};

export default AdminLoginPage;