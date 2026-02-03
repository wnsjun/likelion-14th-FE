import { instance } from '../Axios';

export const loginAdmin = async (id, pw) => {
  const params = new URLSearchParams();
  params.append('username', id); 
  params.append('password', pw); 

  const response = await instance.post('/api/admin/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  
  return response;
};

// 지원자 전체 조회
export const getApplicants = async (part) => {
  const params = part ? { part } : {};
  
  const response = await instance.get('/api/admin/students', { params });
  return response.data;
};

// 서류 합격자 조회
export const getDocPassers = async (part) => {
  const params = part ? { part } : {};
  const response = await instance.get('/api/admin/students/docs', { params }); 
  return response.data;
};

// 면접 일정 등록 및 수정
export const updateMeetingInfo = async (studentId, data) => {
  const response = await instance.post(`/api/admin/students/${studentId}/meeting`, data);
  return response.data;
};

// 최종 합격 여부 변경 (체크박스 토글)
export const updateFinalResult = async (studentId, isChecked) => {
  const response = await instance.patch(`/api/admin/students/${studentId}/final`, {
    checked: isChecked
  });
  return response.data;
};

// 서류 합격 여부 변경 (체크박스 토글)
export const updateDocumentPass = async (studentId, isChecked) => {
  const response = await instance.patch(`/api/admin/students/${studentId}/document`, {
    checked: isChecked
  });
  return response.data;
};

// 서류 전형 결과 문자 발송 (전원)
export const sendDocumentMessage = async () => {
  const response = await instance.post('/api/admin/message/document');
  return response.data;
};

// 최종 전형 결과 문자 발송 (전원)
export const sendFinalMessage = async () => {
  const response = await instance.post('/api/admin/message/final');
  return response.data;
};