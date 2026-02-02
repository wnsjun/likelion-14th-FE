import { instance } from '../Axios'; // axios 인스턴스 import (경로 확인 필요)

// 지원자 합격 여부 조회 API
// GET /api/result
export const getApplicantResult = async (studentName, privateNum) => {
  try {
    const response = await instance.get('/api/result', {
      params: {
        studentName: studentName,
        privateNum: privateNum,   
      },
    });

    return response.data;
  } catch (error) {
    console.error('지원자 결과 조회 실패:', error);
    throw error;
  }
};