import pmdesign from '../assets/home/pmdesign.svg';
import front from '../assets/home/front.svg';
import back from '../assets/home/back.svg';

export const TRACK_DATA = [
  {
    id: 'pmdesign',
    title: '기획 / 디자인',
    description:
      '사용자 경험 중심의 서비스를 기획하여 이를 바탕으로 인터페이스를 디자인하고 프로젝트 전체 여정을 리드합니다.',
    imgSrc: pmdesign,
    bgColor: 'bg-white',
    iconBgColor: 'bg-bright-orange-01',
    hoverBgColor: ' hover:bg-gray-01',
    hoverIconBgColor: ' group-hover:bg-bright-orange-01-hover',
    pressedBgColor: ' active:bg-gray-02',
    pressedIconBgColor: ' group-active:bg-bright-orange-01-press',
  },
  {
    id: 'frontend',
    title: '프론트엔드',
    description:
      'API를 통해 주고 받은 데이터를 이용하여 최적의 사용자 경험과 성능을 이끌어내는 서비스를 개발합니다.',
    imgSrc: front,
    bgColor: 'bg-bright-orange-01',
    iconBgColor: ' bg-white',
    hoverBgColor: ' hover:bg-bright-orange-01-hover',
    hoverIconBgColor: ' group-hover:bg-gray-01',
    pressedBgColor: ' active:bg-bright-orange-01-press',
    pressedIconBgColor: ' group-active:bg-gray-02',
  },
  {
    id: 'backend',
    title: '백엔드',
    description:
      'API 개발 및 데이터를 관리하고, 다양한 프레임워크를 이용해 서비스의 전체적인 인프라를 구현합니다.',
    imgSrc: back,
    bgColor: 'bg-white',
    iconBgColor: ' bg-bright-orange-01',
    hoverBgColor: ' hover:bg-gray-01',
    hoverIconBgColor: ' group-hover:bg-bright-orange-01-hover',
    pressedBgColor: ' active:bg-gray-02',
    pressedIconBgColor: ' group-active:bg-bright-orange-01-press',
  },
];
