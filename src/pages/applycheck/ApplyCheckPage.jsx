import { useState } from 'react';
import { getApplicantResult } from '../../apis/apply/Apply';
import Navbar from '../../layout/Navbar';
import CheckForm from './CheckForm';
import PassResult from './PassResult';
import FailResult from './FailResult';
import bgCircle from '../../assets/apply/bg-circle.svg'; 

const ApplyCheckPage = () => {
  // 상태 관리
  const [step, setStep] = useState('input'); // input, loading, pass, fail
  const [isError, setIsError] = useState(false);
  
  // 입력 값 상태
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  
  // 결과 데이터 상태
  const [applicantName, setApplicantName] = useState('');
  const [passInfo, setPassInfo] = useState({
    place: '',
    date: '',
    time: ''
  });

  const handleCheck = async () => {
    // 1. 유효성 검사
    if (!name || !num) {
      alert("이름과 식별번호를 모두 입력해주세요.");
      return;
    }

    // 2. 로딩 상태 시작
    setStep('loading');
    setIsError(false);

    try {
      // 3. API 호출
      const data = await getApplicantResult(name, num);
      console.log("조회 결과:", data);

      // 4. 이름 저장 (결과 페이지 표시용)
      setApplicantName(data.studentName);

      // 5. 결과에 따른 분기 처리 (API 응답 필드명 기준)
      if (data.finalResult === '합격') {
        // 합격 정보 저장
        setPassInfo({
          place: data.location,      // 예: "R동 420호"
          date: data.meetingDate,    // 예: "3월 13일"
          time: data.meetingTime     // 예: "14:00"
        });
        // 1초 뒤 결과 화면 전환 (로딩 느낌을 주기 위해 약간의 지연 추가, 선택사항)
        setTimeout(() => setStep('pass'), 1000);
        
      } else {
        // 불합격 (또는 예비 등)
        setTimeout(() => setStep('fail'), 1000);
      }

    } catch (error) {
      // 6. 에러 처리 (일치하는 정보 없음 등)
      console.error(error);
      setIsError(true);
      setStep('input'); // 다시 입력 화면으로 복귀
      alert("일치하는 지원자 정보가 없거나, 아직 결과가 나오지 않았습니다.");
    }
  };

  const handleReset = () => {
    setStep('input');
    setIsError(false);
    setApplicantName('');
    setName(''); // (선택) 입력창 초기화 원하면 추가
    setNum('');  // (선택) 입력창 초기화 원하면 추가
  };

  return (
    <div className="relative w-full min-h-screen bg-bg-dark overflow-x-hidden">
      
      {/* 네브바 */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* 배경 이미지 (입력 단계일 때만) */}
      {step === 'input' && (
        <img 
          src={bgCircle} 
          alt="" 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 
                     w-[100vw] aspect-[1440/1024] 
                     max-w-none pointer-events-none opacity-50"
        />
      )}

      {/* 메인 컨텐츠 */}
      <div className={`relative z-10 w-full min-h-screen flex flex-col 
        ${(step === 'input' || step === 'loading') 
          ? 'justify-center items-center' 
          : 'pt-[120px] px-6 lg:px-[120px]' // 모바일 패딩 수정
        }`}
      >
        
        {step === 'input' && (
          <CheckForm 
            // 👇 [중요] 부모의 state를 자식에게 전달해야 입력값이 반영됩니다.
            name={name}
            setName={setName}
            num={num}
            setNum={setNum}
            onCheck={handleCheck} 
            isError={isError} 
            setIsError={setIsError}
          />
        )}
        
        {step === 'loading' && (
          <div className="flex flex-col items-center gap-6">
            {/* 스피너 디자인 살짝 수정 */}
            <div className="w-16 h-16 border-[6px] border-gray-07 border-t-orange-04 rounded-full animate-spin"></div>
            <div className="text-white text-xl body-18-medium animate-pulse">
              두근두근 결과를 조회중입니다...🦁
            </div>
          </div>
        )}

        {/* 결과 페이지들 */}
        {step === 'pass' && <PassResult name={applicantName} info={passInfo} />}

        {step === 'fail' && <FailResult name={applicantName} onRetry={handleReset} />}
        
      </div>
    </div>
  );
};

export default ApplyCheckPage;