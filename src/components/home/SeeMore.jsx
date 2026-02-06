import { useNavigate } from 'react-router-dom';

const SeeMore = ({ text, navi }) => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav(navi);
        window.scrollTo(0, 0);
      }}
      className="border-[1.5px] border-orange-03 w-full sm:py-[28px] py-[16px] rounded-[16px] transition-colors duration-300 hover:bg-white active:bg-gray-02 hover:text-bg-dark cursor-pointer"
    >
      <div className="md:text-[20px] md:font-semibold text-[18px] font-semibold flex justify-center items-center ">
        {text}
      </div>
    </div>
  );
};

export default SeeMore;
