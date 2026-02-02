import { useState } from 'react';
import { getApplicantResult } from '../../apis/apply/Apply';
import Navbar from '../../layout/Navbar';
import CheckForm from './CheckForm';
import PassResult from './PassResult';
import FinalPassResult from './FinalPassResult';
import FinalPendingResult from './FinalPendingResult';
import FailResult from './FailResult';
import bgCircle from '../../assets/apply/bg-circle.svg'; 

const ApplyCheckPage = () => {
  // 🗓️ [설정] 날짜 상수 정의 (월은 0부터 시작: 2 = 3월)
  
  // 1. 서류 합격 발표일: 3월 1일 오전 10시
  const DOCUMENT_RELEASE_DATE = new Date(2026, 2, 1, 10, 0, 0);
  
  // 2. 최종 합격 발표일: 3월 5일 오후 6시
  const FINAL_RELEASE_DATE = new Date(2026, 2, 5, 18, 0, 0); 

  // 상태 관리
  const [step, setStep] = useState('input');
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  
  // 결과 데이터
  const [applicantName, setApplicantName] = useState('');
  const [passInfo, setPassInfo] = useState(null);
  const [failType, setFailType] = useState('doc'); 

  const handleCheck = async () => {
    // 1. 입력값 유효성 검사
    if (!name || !num) {
      alert("이름과 식별번호를 모두 입력해주세요.");
      return;
    }

    // 현재 시간이 서류 발표일 이전인지 확인
    const now = new Date();
    if (now < DOCUMENT_RELEASE_DATE) {
      alert("아직 합격자 조회 기간이 아닙니다.\n\n서류 결과 발표: 3월 1일 오전 10시");
      return;
    }

    // 2. 로딩 시작
    setStep('loading');
    setIsError(false);

    try {
      const data = await getApplicantResult(name, num);
      setApplicantName(data.studentName);

      const isFinalPeriod = now >= FINAL_RELEASE_DATE;
      
      if (isFinalPeriod) {
        // [기간 2] 최종 발표 기간 (3월 5일 18시 이후)
        
        if (data.finalResult === '합격') {
          setTimeout(() => setStep('final_pass'), 1000);
        } else if (data.finalResult === '보류') {
          setTimeout(() => setStep('final_pending'), 1000);
        } else {
          setFailType('final');
          setTimeout(() => setStep('fail'), 1000);
        }

      } else {
        // [기간 1] 서류 발표 기간 (3월 1일 10시 ~ 3월 5일 18시 전)
        
        if (data.document === '합격') {
          setPassInfo({
            place: data.location,
            date: data.meetingDate,
            time: data.meetingTime
          });
          setTimeout(() => setStep('pass'), 1000);
        } else {
          setFailType('doc');
          setTimeout(() => setStep('fail'), 1000);
        }
      }

    } catch (error) {
      console.error(error);
      setIsError(true);
      setStep('input');
      alert("일치하는 지원자 정보가 없거나, 아직 결과가 나오지 않았습니다.");
    }
  };

  const handleReset = () => {
    setStep('input');
    setIsError(false);
    setApplicantName('');
  };

  return (
    <div className="relative w-full min-h-screen bg-bg-dark overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {step === 'input' && (
        <img src={bgCircle} alt="" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[100vw] aspect-[1440/1024] max-w-none pointer-events-none opacity-50" />
      )}

      <div className={`relative z-10 w-full min-h-screen flex flex-col ${(step === 'input' || step === 'loading') ? 'justify-center items-center' : 'pt-[120px] px-6 lg:px-[120px]'}`}>
        
        {step === 'input' && (
          <CheckForm 
            name={name} setName={setName} num={num} setNum={setNum}
            onCheck={handleCheck} isError={isError} setIsError={setIsError}
          />
        )}
        
        {step === 'loading' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-[6px] border-gray-07 border-t-orange-04 rounded-full animate-spin"></div>
            <div className="text-white text-xl body-18-medium animate-pulse">
              두근두근 결과를 조회중입니다...🦁
            </div>
          </div>
        )}

        {/* 결과 컴포넌트들 */}
        {step === 'pass' && <PassResult name={applicantName} info={passInfo} />}
        {step === 'final_pass' && <FinalPassResult name={applicantName} />}
        {step === 'final_pending' && <FinalPendingResult name={applicantName} />}
        {step === 'fail' && <FailResult name={applicantName} onRetry={handleReset} type={failType} />}
        
      </div>
    </div>
  );
};

export default ApplyCheckPage;