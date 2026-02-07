import { useState } from 'react';
import { getApplicantResult } from '../../apis/apply/Apply';
import Navbar from '../../layout/Navbar';
import CheckForm from './CheckForm';
import PassResult from './PassResult';
import FinalPassResult from './FinalPassResult';
import FinalPendingResult from './FinalPendingResult';
import FailResult from './FailResult';
import bgCircle from '../../assets/apply/bg-circle.svg'; 
import CircleRec from '../../assets/apply/CircleRec.png';

const ApplyCheckPage = () => {
  // 🗓️ [설정] 날짜 상수 정의 (한국 시간 KST +09:00 기준 고정)
  // 문자열 형식을 사용할 때는 월을 1부터 씁니다. (03 = 3월)

  // 1. 서류 합격 발표일: 2026년 3월 1일 오전 10시 (KST)
  const DOCUMENT_RELEASE_DATE = new Date("2025-03-01T10:00:00+09:00");

  // 2. 조회 차단 시작일 (면접 종료 시점): 2026년 3월 5일 오후 10시 (KST)
  const BLOCK_START_DATE = new Date("2026-03-05T22:00:00+09:00");

  // 3. 최종 합격 발표일 (조회 차단 해제): 2026년 3월 7일 오전 10시 (KST)
  const FINAL_RELEASE_DATE = new Date("2026-03-07T10:00:00+09:00");

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

    const now = new Date();

    // 2. [기간 체크 1] 서류 발표 이전인지 확인
    if (now < DOCUMENT_RELEASE_DATE) {
      alert("아직 합격자 조회 기간이 아닙니다.\n\n서류 결과 발표: 3월 1일 오전 10시");
      return;
    }

    // 3. [기간 체크 2] 집계 기간(조회 차단 기간)인지 확인 (3/5 22:00 ~ 3/7 10:00)
    // 피드백 반영: 면접이 끝난 후 최종 발표 전까지는 조회를 막습니다.
    if (now >= BLOCK_START_DATE && now < FINAL_RELEASE_DATE) {
      alert("현재 최종 합격자 선발 및 집계 기간입니다.\n잠시만 기다려주세요!\n\n최종 결과 발표: 3월 7일 오전 10시");
      return;
    }

    // 4. 로딩 시작
    setStep('loading');
    setIsError(false);

    try {
      const data = await getApplicantResult(name, num);
      setApplicantName(data.studentName);

      // 현재 시간이 최종 발표일 이후인지 확인
      const isFinalReleased = now >= FINAL_RELEASE_DATE;
      
      if (isFinalReleased) {
        // [기간 C] 최종 발표 기간 (3월 7일 10시 이후)
        // 이때만 finalResult 데이터를 확인합니다.
        
        if (data.finalResult === '합격') {
          setTimeout(() => setStep('final_pass'), 1000);
        } else if (data.finalResult === '보류') {
          setTimeout(() => setStep('final_pending'), 1000);
        } else {
          // 최종 불합격
          setFailType('final');
          setTimeout(() => setStep('fail'), 1000);
        }

      } else {
        // [기간 A] 서류 발표 기간 (3월 1일 10시 ~ 3월 5일 22시 전)
        // 이 기간에는 API에 finalResult가 있더라도 절대 열어보지 않고 무시합니다.
        
        if (data.document === '합격') {
          setPassInfo({
            place: data.location,
            date: data.meetingDate,
            time: data.meetingTime
          });
          setTimeout(() => setStep('pass'), 1000);
        } else {
          // 서류 불합격
          setFailType('doc');
          setTimeout(() => setStep('fail'), 1000);
        }
      }

    } catch (error) {
      console.error(error);
      setIsError(true);
      setStep('input');
      // 404 등 에러 처리
    }
  };

  const handleReset = () => {
    setStep('input');
    setIsError(false);
    setApplicantName('');
  };

  return (
    <div className="relative w-full min-h-screen bg-bg-dark overflow-x-hidden">

      {step === 'input' && (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center">
          
          <img 
            src={CircleRec} 
            alt="" 
            className="min-w-full min-h-full object-cover -translate-y-[28%]" 
          />
          
        </div>
      )}

      <div className={`relative z-10 w-full min-h-screen flex flex-col ${(step === 'input' || step === 'loading') ? 'justify-center items-center' : 'pt-[120px] '}`}>
        
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