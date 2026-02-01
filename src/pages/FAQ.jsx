import FAQItem from '../components/faq/FAQItem';

const FAQ = () => {
    return (
        <div>
            <h1 className="mt-[80px] text-[48px] sm:text-[64px] font-bold leading-[120%] text-center text-[#F3EAE5]">
                자주 묻는 질문
            </h1>
            <p className="mt-[24px] body-16-semibold text-center text-gray-02" style={{ letterSpacing: '-0.003px' }}>
                궁금하신 점은 이곳을 확인해주세요
            </p>

            <div className="mt-[100px] flex justify-center">
                <div className="flex justify-center items-center gap-[10px] px-4 py-[10px] rounded-[1000px] bg-white body-18-semibold text-center text-black">
                    공통질문
                </div>
            </div>

            {/* FAQ */}
            <div className="mt-10">
                <FAQItem
                    question="Q. 면접은 어떻게 진행되나요?"
                    answer="A. 면접은 홍익대학교 교내에서 대면으로 진행됩니다. 자세한 장소와 일정은 서류 합격자에 한해 개별 안내드릴 예정입니다."
                />
                <FAQItem
                    question="Q. 세션은 어떻게 진행되나요?"
                    answer="A. 세션은 매주 목요일 대면으로 진행됩니다.  공통 세션 이후, 각 파트별로 나누어 세션이 진행됩니다."
                />
                <FAQItem
                    question="Q. 휴학생도 지원 가능한가요?"
                    answer="A. 네 가능합니다! 멋쟁이사자처럼은 홍익대학교 학생이라면 재학생, 휴학생, 졸업유예생 모두 학과에 관계없이 지원할 수 있습니다."
                />
            </div>
            <div className="mt-[100px] flex justify-center">
                <div className="flex justify-center items-center gap-[10px] px-4 py-[10px] rounded-[1000px] bg-white body-18-semibold text-center text-black">
                기획/디자인
                </div>
            </div>
            <div className="mt-10">
                <FAQItem
                    question="Q. UX/UI 경험이 없는데 괜찮을까요?"
                    answer="A. 물론 괜찮습니다. 멋쟁이사자처럼은 경험보다 배우려는 열정과 성장 의지를 더 중요하게 봅니다. UX/UI 경험이 없어도, 함께 배우며 성장할 수 있습니다."
                />
                <FAQItem
                    question="Q. 기획과 디자인을 기디 혼자서 진행하는 건가요?"
                    answer="A. 기획 파트가 존재하지만, 멋쟁이사자처럼은 모두가 함께 서비스를 만들어가는 것을 목표로 합니다. 개인 기획을 진행할 수도 있고, 팀원들과 아이디어를 합쳐 하나의 기획으로 발전시킬 수도 있습니다."
                />
                <FAQItem
                    question="Q. 기획에 더 관심이 있는 사람은 하기 어려울까요?"
                    answer="A. 한 파트에서 활동하는 만큼, 디자인 영역도 중요한 요소이기 때문에 디자인에 대한 기본적인 관심과 열정은 필요합니다."
                />
            </div>

            <div className="mt-[100px] flex justify-center">
                <div className="flex justify-center items-center gap-[10px] px-4 py-[10px] rounded-[1000px] bg-white body-18-semibold text-center text-black">
                개발 (프론트엔드&백엔드)
                </div>
            </div>
            <div className="mt-10">
                <FAQItem
                    question="Q. 지원을 하려면 어느 정도의 개발 관련 지식이 필요한가요?"
                    answer="A. 멋쟁이사자처럼은 개발 경험보다 열정과 몰입도를 더 중요하게 봅니다. 전공자뿐만 아니라 비전공자도 함께할 수 있는 개발 동아리이며, 배우려는 의지가 있고 활동에 충분한 시간을 투자할 수 있는 분을 중심으로 선발합니다."
                />
            </div>
        </div>
    )
};

export default FAQ;