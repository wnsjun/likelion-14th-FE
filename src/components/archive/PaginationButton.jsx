import arrow from '../../assets/archive/arrow.svg';

const PaginationButton = ({ direction, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center gap-[10px]
                px-3 py-2
                rounded-[100px]
                bg-[#2D2D2D]
                body-18-regular text-white
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {direction === 'prev' && (
                <>
                    <img src={arrow} alt="이전" className="w-[9px] h-[17px]" />
                    <span>이전</span>
                </>
            )}
            {direction === 'next' && (
                <>
                    <span>다음</span>
                    <img src={arrow} alt="다음" className="w-[9px] h-[17px] rotate-180" />
                </>
            )}
        </button>
    );
};

export default PaginationButton;
