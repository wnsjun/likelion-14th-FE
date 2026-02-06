const Introduction = () => {
  return (
    <div className="flex flex-col gap-[24px] bg-black ">
      <div className="title-20-bold text-white">멋사 동아리 소개</div>
      <div className="bg-bright-orange-02 p-[24px] gap-[12px] rounded-[16px] justify-center items-center flex flex-col">
        <div className="body-16-semibold text-orange-04 text-center">
          내 아이디어를 내 손으로 실현하자! <br className="sm:hidden block" />
          Growl to World
        </div>
        <div className="sm:text-[20px] sm:font-semibold text-[16px] font-semibold flex text-center text-black">
          멋쟁이 사자처럼 대학은 국내외 121개 대학,
          <br className="sm:hidden block" /> 4천여명이 함께하는
          <br className="lg:hidden block" />
          국내 최대 규모 IT 창업 동아리입니다
        </div>
      </div>
    </div>
  );
};

export default Introduction;
