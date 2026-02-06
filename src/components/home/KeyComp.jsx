const KeyComp = () => {
  return (
    <div className="flex flex-col gap-[24px] bg-black ">
      <div className="title-20-bold text-white">인재상</div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-[16px]">
        <div className="text-center sm:text-[20px] sm:font-semibold text-[16px] font-semibold text-black flex bg-bright-orange-02 px-[40px] sm:py-[28px] py-[16px] gap-[12px] rounded-[16px] justify-center items-center whitespace-nowrap">
          <div className="whitespace-nowrap">
            협업 과정에서 <span className="text-orange-04">원활한 소통</span>
            으로 <br className="block sm:hidden" /> 함께 성장해나갈 수 있는 분
          </div>
        </div>
        <div className="text-center sm:text-[20px] sm:font-semibold text-[16px] font-semibold text-black flex bg-bright-orange-02 px-[40px] sm:py-[28px] py-[16px] gap-[12px] rounded-[16px] justify-center items-center whitespace-nowrap">
          <div className="whitespace-nowrap">
            실제로 구현하고 싶은{' '}
            <span className="text-orange-04">아이디어</span>
            와, <br className="block sm:hidden" />
            이에 대한 열정이 있는 분
          </div>
        </div>
        <div className="text-center sm:text-[20px] sm:font-semibold text-[16px] font-semibold text-black flex bg-bright-orange-02 px-[40px] py-[28px] gap-[12px] rounded-[16px] justify-center items-center whitespace-nowrap">
          <div className="whitespace-nowrap">
            서비스에 <span className="text-orange-04">책임감</span>을 갖고
            끝까지 해내는 분
          </div>
        </div>
        <div className="text-center sm:text-[20px] sm:font-semibold text-[16px] font-semibold text-black flex bg-bright-orange-02 px-[40px] py-[28px] gap-[12px] rounded-[16px] justify-center items-center whitespace-nowrap">
          <div className="whitespace-nowrap">
            <span className="text-orange-04">새로운 것을 학습</span>
            하는 열정이 강하신 분
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyComp;
