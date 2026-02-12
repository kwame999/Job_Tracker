import { useState } from 'react';
import type {
  HeaderProps,
  ModalNewContainerProps,
  StatCardProps,
  StatsBlockProps,
} from './Types';
import { IconSet } from './icons/icon';
import './index.css';
import type { TabViewProps } from './Types';
import supabase from './lib/supabaseClient';

const Tag = ({ handleNewTag, tagTypes }: HeaderProps) => {
  const [tag, setTag] = useState<string>('');

  function handleTag() {
    if (tagTypes.length >= 5 || tag.trim() === '') return;
    handleNewTag([tag.trim(), ...tagTypes]);
    setTag('');
  }

  function handleDeleteTag(id: number) {
    handleNewTag(tagTypes.filter((_, indx) => indx !== id));
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='text-[13px] font-semibold text-[#1A1A1A]'>
        Active Tags
      </label>

      {/* Main tag Container */}
      <div className='group flex flex-wrap items-center gap-2 p-2 min-h-[46px] bg-white border-[1.5px] border-[#E5E5E5] rounded-xl focus-within:border-black transition-all'>
        {/*Rendered Tags*/}
        {tagTypes.map((t, indx) => (
          <div
            key={indx}
            className='flex items-center gap-1.5 bg-black/[0.04] border border-black/[0.05] pl-2 pr-1 py-1 rounded-lg animate-in fade-in zoom-in-95 duration-200'
          >
            <span className='text-[12px] font-bold text-black/70 tracking-tight'>
              {t}
            </span>
            <button
              onClick={() => handleDeleteTag(indx)}
              className='w-5 h-5 flex items-center justify-center rounded-md hover:bg-black/10 transition-colors text-black/40 hover:text-black'
            >
              <IconSet iconName='close' size={12} />
            </button>
          </div>
        ))}

        {/* Inline Input */}
        {tagTypes.length < 5 && (
          <input
            type='text'
            placeholder={tagTypes.length === 0 ? 'Add tags...' : ''}
            className='flex-1 min-w-[80px] h-full bg-transparent text-[13px] font-medium outline-none placeholder:text-black/20'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTag();
              }
            }}
          />
        )}
      </div>

      {/* Validation Message */}
      <div className='h-4'>
        {tagTypes.length >= 5 && (
          <p className='text-[11px] font-bold text-red-400 uppercase tracking-wider animate-pulse'>
            Tag limit reached (5/5)
          </p>
        )}
      </div>
    </div>
  );
};

const TabView = ({
  children,
  data,
  jobs,
  onShowModal,
  tags,
  onHandleTab,
  tabActive,
  isLoading,
}: TabViewProps) => {
  const tabItems: string[] = ['Dashboard', 'Kanban View'];

  return (
    <div className='flex flex-col h-full overflow-hidden bg-gray-50'>
      <div className='flex flex-col gap-2   justify-center  '>
        <div className='flex gap-4.5 outline-1 p-2.5 pl-8 h-fit'>
          <StatBlock
            svgType='calender2'
            svgSize={22}
            statTxt='Created'
            data={new Date().toLocaleDateString()}
          />
          <StatBlock
            svgType='briefcase'
            svgSize={22}
            statTxt='Tracked'
            data={
              data.length || (
                <span className='text-sm font-medium text-black/20 italic '>
                  0 tracked
                </span>
              )
            }
          />
          {/* <StatBlock svgType='tags' 
                                       svgSize={22} 
                                       statTxt='Active Tags' 
                                       data={   tags.length > 0 ? tags.map((tag, indx) => (
                                            <p key={indx} className='px-2.5 py-0.5 bg-black/[0.03] border border-black/[0.09] rounded-lg text-[11px] font-bold text-black/60 '>
                                                {tag}
                                            </p>
                                )) : <span className='text-sm font-medium text-black/20 italic '>No tags set...</span>} /> */}
        </div>
      </div>
      <div className='px-8 py-1 mb-1 bg-gray-50   border-t border-gray-200'>
        <div className='flex justify-end'>
          {/* Stats Section */}

          {/* Tab Switcher */}
          <nav className='relative flex bg-[#EFEFEF] p-1 rounded-xl border border-black/[0.04] shadow-inner'>
            {tabItems.map((tab) => {
              const isActive = tabActive === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onHandleTab(tab)}
                  className={`relative z-10 px-4 py-1.5 text-[12px] font-bold transition-all duration-300 rounded-lg ${
                    isActive
                      ? 'text-[#0A0A0A]'
                      : 'text-black/40 hover:text-black/60'
                  }`}
                >
                  {isActive && (
                    <div className='absolute inset-0 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] -z-10 animate-in fade-in zoom-in-95 duration-200' />
                  )}
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Viewport Area  */}
      <div className='flex-1 min-h-0 overflow-hidden'>
        {jobs.length ? (
          <div className='h-full flex gap-7 overflow-x-auto px-8 pb-8 justify-start items-start custom-scrollbar'>
            {children}
          </div>
        ) : (
          <div className='mx-8 flex flex-col w-auto items-center justify-center border-2 border-dashed rounded-[24px] py-12 h-full border-black/[0.1] bg-gray-50/40 transition-all'>
            {isLoading ? (
              <IconSet iconName='loading' size={70}></IconSet>
            ) : (
              <>
                <img
                  src='/src/assets/flat-briefcase-icon-by-Vexels 1.png'
                  alt='Empty Workspace'
                  className='w-48 opacity-15 grayscale mb-6 select-none'
                />
                <div className='text-center flex flex-col items-center'>
                  <h2 className='text-1xl font-black text-[#0A0A0A] tracking-tight mb-2 '>
                    Tracker empty
                  </h2>
                  <p className='text-[14px] text-black/40 font-medium mb-10 max-w-[320px] leading-relaxed'>
                    Start your journey by tracking your first application to see
                    your dashboard come to life.
                  </p>

                  <button
                    className='bg-gray-50 text-white px-4 py-4 rounded-full text-[13px] font-black uppercase tracking-widest shadow-lg hover:bg-black/10 hover:scale-[1.02] active:scale-95 transition-all'
                    onClick={onShowModal}
                  >
                    <IconSet iconName='plus' size={23}></IconSet>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatBlock = ({
  svgType,
  svgSize,
  statTxt,
  children,
  data,
}: StatsBlockProps) => {
  return (
    <div>
      <div className='flex items-center gap-1'>
        <IconSet iconName={svgType} size={svgSize}></IconSet>
        <p className='text-sm font-bold  text-black/40 tracking-wide'>
          {statTxt}:
        </p>
        <div className='text-sm font-bold text-black/20 flex gap-2'>
          {data || children}
        </div>
      </div>
    </div>
  );
};

const ProjectSetModal = () => {
  return (
    <form>
      <h1>New Tracker:</h1>
      <>
        <input type='text' name='projName' id='' />
      </>

      <input type='text' name='tags' />
      <input type='text' name='status' />
    </form>
  );
};
const ModalNewContainer = ({ setNewContainer }: ModalNewContainerProps) => {
  const [containerName, setContainerName] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);

  const handleInternalClose = () => {
    setIsVisible(false);
  };

  async function onSubmit() {
    if (!containerName.trim()) return;

    const newContainer = { container_name: containerName };

    const { data, error } = await supabase
      .from('containers')
      .insert([newContainer])
      .select();

    if (error) {
      console.error(error.message);
    } else setNewContainer(data[0]);
    handleInternalClose();
  }

  if (!isVisible) return null;

  return (
    <>
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[999]'
        onClick={handleInternalClose}
      ></div>

      <section className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[440px] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_1px_rgba(0,0,0,0.1)] z-[1000] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200'>
        <div className='pt-[28px] px-[32px] pb-[24px] border-b border-[#F0F0F0] relative'>
          <button
            className='absolute right-[24px] top-[24px] w-[32px] h-[32px] rounded-[8px] flex items-center justify-center hover:bg-gray-100 transition-colors'
            onClick={handleInternalClose}
          >
            <IconSet iconName='close' size={16} />
          </button>
          <h2 className='text-[22px] font-bold text-[#0A0A0A] leading-[1.3] tracking-[-0.02em]'>
            Add New Column
          </h2>
          <p className='mt-[6px] text-[14px] text-[#737373] leading-[1.5]'>
            Create a custom stage for your job tracking pipeline.
          </p>
        </div>

        <div className='p-[32px] pt-[28px] flex flex-col gap-[24px]'>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[13px] font-semibold text-[#1A1A1A]'>
              Column Name
            </label>
            <input
              autoFocus
              placeholder='e.g., Follow-up Required'
              className='w-full h-[40px] px-[14px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[14px] outline-none focus:border-black transition-all'
              type='text'
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            />
          </div>
        </div>

        <div className='px-[32px] py-[24px] border-t border-[#F0F0F0] flex gap-[12px] bg-white'>
          <button
            type='button'
            onClick={handleInternalClose}
            className='flex-1 h-[44px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[15px] font-semibold text-[#404040] hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onSubmit}
            className='flex-1 h-[44px] bg-[#0A0A0A] border-none rounded-[8px] text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#262626] transition-colors'
          >
            Create Column
          </button>
        </div>
      </section>
    </>
  );
};

const StatCard = ({ label, value }: StatCardProps) => (
  <div className='flex flex-col items-center justify-center px-2 py-4 bg-white/50 backdrop-blur-md border border-gray-100 rounded-[20px] shadow-sm min-w-[140px]'>
    <span className='text-[10px] font-medium uppercase tracking-wide text-gray-400 mb-1'>
      {label}
    </span>
    <span className='text-1xl font-bold text-gray-900'>{value}</span>
  </div>
);

export {
  Tag,
  TabView,
  StatBlock,
  StatCard,
  ProjectSetModal,
  ModalNewContainer,
};
