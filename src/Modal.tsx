import { useEffect, useReducer, useState } from 'react';
import { PreviewCard } from './Column';
import type { JobType, State, ModalProps, Action } from './Types';
import { IconSet } from './icons/icon';
import supabase from './lib/supabaseClient';
import { analyzeJob } from './lib/gemini';

const Modal = ({
  onAddJob,
  editingJob,
  updateJob,
  cancelJob,
  onAddCustomCol,
  currentCol,
  onSetCurrentCol,
}: ModalProps) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState(currentCol); //Default status is controlled by currentCol
  const [link, setLink] = useState('');
  const [salary, setSalary] = useState<string | number>('');
  const [moodTxt, setMoodTxt] = useState('');
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!editingJob) return;
    const { company, position, status, link, salary, mood_txt } = editingJob;

    setCompany(company);
    setPosition(position);
    setStatus(status);
    setLink(link ?? '');
    setSalary(salary ?? '-');
    setMoodTxt(mood_txt);
  }, [editingJob]);

  async function handleJobsNType() {
    const newJob: JobType = {
      company: company,
      position: position,
      status: status,
      link: link,
      salary: (typeof salary === 'string' ? parseInt(salary, 10) : salary) || 0,
      mood_txt: moodTxt,
      logo_url: `https://img.logo.dev/${company}.com?token=pk_RKtwoXuaQDSJdIEDV1NYVA`,
      logo_alt: `${company} logo`,
    };

    if (editingJob) {
      const { data, error } = await supabase
        .from('jobs')
        .update(newJob)
        .eq('id', editingJob.id)
        .select();

      if (error) {
        console.error('Update failed:', error.message);
      } else {
        updateJob(data[0]);
        handleClose();
      }
    } else if (company) {
      const { data, error } = await supabase
        .from('jobs')
        .insert([newJob])
        .select();

      if (error) {
        console.error('Supabase Error:', error.message);
        return;
      }

      if (data && data.length) {
        onAddJob(data[0]);
      }
    }
  }

  function handleClose() {
    jobStatesReset();
    cancelJob();
  }

  function jobStatesReset() {
    setCompany('');
    setLink('');
    setMoodTxt('');
    setPosition('');
    setStatus(status); //set back to users last selected status when job is created
    setSalary('');
  }

  async function moodTxtAnalyzer(company: string, position: string) {
    if (!company || !position || moodTxt) {
      setChecked(true);
      return;
    }
    setisLoading(true);
    setChecked(false);
    let generatedMood = await analyzeJob(company, position);

    generatedMood && setisLoading(false);
    setMoodTxt(generatedMood || '');

    return generatedMood;
  }

  return (
    <>
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[999]'
        onClick={handleClose}
      ></div>

      <section className='app-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[520px] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_1px_rgba(0,0,0,0.1)] z-[1000] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200'>
        {/* Form Header */}
        <div className='pt-[28px] px-[32px] pb-[24px] border-b app-border relative'>
          <button
            onClick={handleClose}
            className='absolute right-[24px] top-[24px] w-[32px] h-[32px] rounded-[8px] flex items-center justify-center hover:bg-gray-100 transition-colors'
          >
            <IconSet iconName='close' size={16} />
          </button>
          <h2 className='text-[24px] font-bold app-text leading-[1.3] tracking-[-0.02em]'>
            {editingJob ? 'Edit Application' : 'Track New Job Application'}
          </h2>
          <p className='mt-[6px] text-[14px] app-muted leading-[1.5]'>
            Add details about your job application to track progress
          </p>
        </div>

        {/* Form Body */}
        <div className='p-[32px] pt-[28px] flex flex-col gap-[24px]'>
          <div className='grid grid-cols-2 gap-[16px]'>
            <div className='flex flex-col gap-[6px]'>
              <label className='text-[13px] font-semibold app-text'>
                Company Name
              </label>
              <input
                placeholder='e.g., Google'
                className='app-input w-full h-[40px] px-[14px] rounded-[8px] text-[14px] outline-none transition-all'
                type='text'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-[6px]'>
              <label className='text-[13px] font-semibold app-text'>
                Position
              </label>
              <input
                placeholder='e.g., Product Designer'
                className='app-input w-full h-[40px] px-[14px] rounded-[8px] text-[14px] outline-none transition-all'
                type='text'
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-[16px]'>
            <div className='flex flex-col gap-[6px]'>
              <label className='text-[13px] font-semibold app-text'>
                Salary
              </label>
              <input
                placeholder='e.g., $120,000'
                className='app-input w-full h-[40px] px-[14px] rounded-[8px] text-[14px] outline-none transition-all'
                type='text'
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-[6px]'>
              <label className='text-[13px] font-semibold app-text'>
                Status
              </label>
              <select
                className='app-input w-full h-[40px] px-[14px] rounded-[8px] text-[14px] outline-none transition-all cursor-pointer'
                value={status.toLowerCase()}
                onChange={(e) => {
                  setStatus(e.target.value); //status remains state when modal is open, else btn clicked is state
                  onSetCurrentCol(''); //when setting status, reset currentcol
                }}
              >
                <option value='wishlist'>Wishlist</option>
                <option value='applied'>Applied</option>
                <option value='interview'>Interview</option>
                <option value='offer'>Offer</option>
                <option value='rejected'>Rejected</option>
                <option value='ghosted'>Ghosted</option>
                {onAddCustomCol.map(({ container_name }) => (
                  <option
                    key={container_name}
                    value={container_name.toLowerCase()}
                  >
                    {container_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-[6px] relative'>
            <label className='text-[13px] font-semibold app-text'>Notes</label>

            <div className='relative'>
              {isLoading && (
                <div className='w-full bg-gray-300 h-full p-4 absolute rounded-[8px] flex justify-center items-center animate-pulse'></div>
              )}
              <textarea
                placeholder={
                  isLoading ? 'Coach at work...' : 'Add any additional notes...'
                }
                rows={3}
                className='app-input w-full p-[14px] rounded-[8px] text-[14px] outline-none transition-all resize-none'
                value={moodTxt}
                onChange={(e) => setMoodTxt(e.target.value)}
              ></textarea>
              <div className=' w-full flex justify-end items-center absolute'>
                <button
                  onClick={() =>
                    !isLoading && moodTxtAnalyzer(company, position)
                  }
                  className={`rounded-full outline-1 outline-gray-200 w-[30px] h-[30px] p-0.5 flex justify-center items-center absolute bottom-0 right-0 mb-4 mr-2 drop-shadow-md bg-blue-500/10 group-hover hover:animate-pulse hover:scale-110 hover:bg-blue-500/2
                                                    ${isLoading && 'cursor-not-allowed'}`}
                >
                  <IconSet iconName='sparkle' size={18}></IconSet>
                </button>
              </div>
            </div>
            {checked && (
              <p
                className={`text-red-600 text-sm ${company && position && 'hidden'}`}
              >
                *Please, provide a name and a position
              </p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className='px-[32px] py-[24px] border-t app-border flex gap-[12px]'>
          <button
            type='button'
            onClick={() => {
              handleClose();
              onSetCurrentCol('wishlist');
            }}
            className='app-input flex-1 h-[44px] rounded-[8px] text-[15px] font-semibold app-text hover:bg-black/5 transition-colors'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              handleJobsNType();
              jobStatesReset();
            }}
            className='flex-1 h-[44px] bg-[#0A0A0A] border-none rounded-[8px] text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#262626] transition-colors'
          >
            {editingJob ? 'Save Changes' : 'Track Application'}
          </button>
        </div>
      </section>
    </>
  );
};

export { Modal };
