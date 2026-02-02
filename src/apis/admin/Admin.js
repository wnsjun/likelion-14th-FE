import { instance } from '../Axios';

export const loginAdmin = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await instance.post('/api/admin/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response; 
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};