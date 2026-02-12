import { useEffect, useState } from 'react';
import type { SideNavProps } from './Types';
import { IconSet } from './icons/icon';
import './index.css';
import { Link } from 'react-router-dom';

const SideNav = ({ recentJobs, isDark, onToggleTheme }: SideNavProps) => {
  const [isExpanded, isSetExpanded] = useState<boolean>(() => {
    const getSide = localStorage.getItem('sideNav');
    return getSide ? JSON.parse(getSide) : false;
  });

  useEffect(() => {
    localStorage.setItem('sideNav', JSON.stringify(isExpanded));
  }, [isExpanded]);

  function handleSwitchNav(e: React.MouseEvent) {
    e.stopPropagation();
    isSetExpanded(!isExpanded ? true : false);
  }

  return (
    <aside
      className={`
                flex flex-col h-screen pt-[20px] pb-[20px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isDark ? 'bg-[#11161D] border-r border-white/10 text-gray-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.25)]' : 'bg-gray-50 border-r border-black/[0.1] shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]'}
                relative overflow-hidden select-none resize-none
                ${isExpanded ? 'w-[240px]' : 'w-[50px] cursor-ew-resize'}
            `}
      onClick={() => !isExpanded && isSetExpanded(true)}
    >
      {/* Top Icon (Bar-Left) */}
      <div
        className={`px-[12px] ${isExpanded && 'px-[20px]'} w-full flex justify-between mb-2`}
      >
        {isExpanded && (
          <h3
            className={`font-bold text-lg ${isDark ? 'text-gray-100' : 'text-black/80'}`}
          >
            JTrack
          </h3>
        )}
        <div
          onClick={handleSwitchNav}
          className={`
                        flex items-center justify-center w-[26px] h-[26px] 
                        transition-transform hover:scale-110 active:scale-95
                        ${isExpanded ? 'cursor-ew-resize' : 'cursor-pointer'}
                        `}
        >
          <IconSet iconName='barleft' size={24} />
        </div>
      </div>
      {isExpanded && <hr className='text-black/10 we' />}

      {/* Dashboard Text & Content */}
      {isExpanded && (
        <div className='mt-5 px-[18px] w-full animate-in fade-in slide-in-from-top-2 duration-400'>
          {/* <h3 className='font-bold text-base text-black/80 mb-8'>Dashboard</h3> */}
          <div className='flex flex-col gap-1'>
            <Link
              to='/'
              className={`rounded-lg w-full p-2.5 text-[14px] flex gap-2 items-center ${isDark ? 'hover:bg-white/10 text-gray-100' : 'hover:bg-gray-100 text-black'}`}
            >
              <IconSet iconName='tags' size={24}></IconSet>
              <p>Dashboard</p>
            </Link>

            <Link
              to='/chat'
              className={`rounded-lg w-full p-2.5 text-[14px] flex gap-3 items-center ${isDark ? 'hover:bg-white/10 text-gray-100' : 'hover:bg-gray-100 text-black'}`}
            >
              <IconSet iconName='sparkle' size={20}></IconSet>
              <p>AI Coach</p>
            </Link>
          </div>
          <nav onClick={(e) => e.stopPropagation()}>
            <ul className='flex flex-col gap-4'>
              <li
                className={`text-[10px] font-bold uppercase tracking-[0.15em] mt-8 ${isDark ? 'text-gray-400' : 'text-black/30'}`}
              >
                Tracked Jobs:
              </li>
              {recentJobs.map((job, i) => (
                <li
                  key={i}
                  className={`text-sm font-medium cursor-pointer truncate transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  {job.company}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Theme Toggle */}
      <div className='mt-auto px-[12px] w-full'>
        <button
          className={`flex items-center justify-center w-[26px] h-[40px] rounded-md transition-all active:scale-90 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/[0.04]'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleTheme();
          }}
        >
          <div className='transition-transform duration-200'>
            {!isDark ? (
              <IconSet iconName='sun' size={22} />
            ) : (
              <IconSet iconName='moon' size={22} />
            )}
          </div>
        </button>
      </div>
    </aside>
  );
};
export default SideNav;
