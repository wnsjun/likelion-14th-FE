import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    // 배경 (Backdrop)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* 모달 박스 */}
      <div className="w-[400px] bg-bg-secondary rounded-[16px] p-8 border border-gray-07 flex flex-col items-center text-center shadow-lg animate-fadeIn">
        
        {/* 타이틀 */}
        {title && (
          <h2 className="title-20-bold text-white mb-4 whitespace-pre-wrap">
            {title}
          </h2>
        )}

        {/* 안내 메시지 */}
        <p className="body-16-regular text-gray-03 mb-8 whitespace-pre-wrap leading-relaxed">
          {message}
        </p>

        {/* 버튼 영역 */}
        <div className="flex gap-3 w-full">
          {/* 뒤로가기 (취소) */}
          <button
            onClick={onClose}
            className="flex-1 py-[14px] rounded-[8px] bg-gray-06 text-white body-16-semibold hover:bg-gray-05 transition-all"
          >
            뒤로가기
          </button>

          {/* 전송하기 (확인) */}
          <button
            onClick={onConfirm}
            className="flex-1 py-[14px] rounded-[8px] bg-orange-01 text-white body-16-semibold hover:bg-orange-01-hover transition-all"
          >
            전송하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;