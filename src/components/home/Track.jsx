import PartCard from './PartCard';
import { TRACK_DATA } from '../../data/TrackData';
import { useNavigate } from 'react-router-dom';

const Track = ({ type = 'home' }) => {
  const nav = useNavigate();

  return (
    <div>
      <div className="flex flex-col gap-[24px] bg-black ">
        <div className="flex flex-row justify-between">
          <div className="title-20-bold text-white">모집 트랙</div>
          {type === 'home' && (
            <div
              className="group flex flex-row gap-[12px] body-18-semibold transition-colors text-gray-02 hover:text-gray-03 justify-center items-center cursor-pointer"
              onClick={() => nav('/recruiting')}
            >
              모집 정보 확인하기{' '}
              <svg
                className="w-[9px] h-[16px] transition-colors text-gray-02 group-hover:text-gray-03"
                viewBox="0 0 9 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.5L8.5 8L0.5 15.5"
                  stroke="currentColor" // 이 부분이 핵심!
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        <div
          className="
            flex sm:flex-col lg:flex-row flex-row gap-[12px] 
            overflow-x-auto scrollbar-hide 
            pb-[20px] px-[2px]
            md:grid lg:grid-cols-3 sm:grid-cols-1 md:gap-[20px] overflow-visible
          "
        >
          {TRACK_DATA.map((track) => (
            <PartCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Track;
