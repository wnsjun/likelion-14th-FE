const FAQItem = ({ question, answer }) => {
    return (
        <div className="flex flex-col gap-4">
            {/* 질문 */}
            <div className="flex justify-center items-center gap-[10px] py-6 md:py-7 px-4 self-stretch rounded-2xl bg-[#FFE4D3] mb-1">
                <p className="body-18-semibold sm:title-20-semibold text-center text-black">
                    {question}
                </p>
            </div>

            {/* 답변 */}
            <div className="flex justify-center items-center gap-[10px] px-4 sm:px-15 py-6 md:py-7 self-stretch rounded-2xl bg-[#1C1C1C] mb-13">
                <p className="body-16-semibold sm:title-20-semibold leading-[170%] text-center text-[#EDEDED]">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default FAQItem;
