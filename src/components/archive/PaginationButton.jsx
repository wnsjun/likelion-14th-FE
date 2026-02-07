import arrow from '../../assets/archive/arrow.svg';
import arrowOn from '../../assets/archive/arrowon.svg';

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
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#1C1C1C]'}
            `}
        >
            {direction === 'prev' && (
                <>
                    <img src={disabled ? arrow : arrowOn} alt="이전" className="w-[9px] h-[17px] rotate-180" />
                    <span>이전</span>
                </>
            )}
            {direction === 'next' && (
                <>
                    <span>다음</span>
                    <img src={disabled ? arrow : arrowOn} alt="다음" className="w-[9px] h-[17px]" />
                </>
            )}
        </button>
    );
};

export default PaginationButton;
