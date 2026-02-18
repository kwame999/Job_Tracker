import type { ChatMessage, ChatPageProps, JobType } from '../Types';
import { useState } from 'react';
import { getCoachResponse } from '../lib/gemini';
import { IconSet } from '../icons/icon';
import { Link } from 'react-router-dom';

const ChatPage = ({ jobsData, isPowerMode, onAddJob, onDelete }: ChatPageProps) => {
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'coach', text: '' }]);

  async function getCoachReply(input: string, jobsData: JobType[]) {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setUserPrompt('');
    setisLoading(true);

    const response = await getCoachResponse(input, jobsData, onAddJob, onDelete);

    setMessages((prev) => [
      ...prev,
      { role: 'coach', text: response || 'I’m drawing a blank. Try again?' },
    ]);
    setisLoading(false);
  }

  return (
    <section className='jtrack-ai-page flex-1 min-h-0 overflow-hidden'>
      <div className={`jtrack-ai-shell h-full min-h-0 mx-auto w-full overflow-x-auto ${!isPowerMode ? 'max-w-[1440px]' : 'max-w-none'}`}>
        <div className={`jtrack-ai-board h-full flex ${!isPowerMode ? 'm-3 rounded-2xl border' : 'm-0 border-0 rounded-none'} overflow-hidden`}>
          <aside className='jtrack-ai-left-panel flex flex-col'>
            <div className='jtrack-ai-left-header'>
              <div className='h-8 w-8 rounded-[10px] jtrack-ai-gradient-icon flex items-center justify-center'>
                <IconSet iconName='sparkle' size={14} />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='text-xs font-bold tracking-tight'>AI Coach</p>
                <div className='flex items-center gap-1 mt-0.5'>
                  <span className='h-[5px] w-[5px] rounded-full bg-emerald-500' />
                  <span className='text-[9px] jtrack-ai-muted font-medium'>Online · Ready to help</span>
                </div>
              </div>
            </div>

            <div className='jtrack-ai-left-content'>
              <div className='flex items-center gap-2 my-1'>
                <div className='flex-1 h-px bg-black/10' />
                <span className='text-[9px] jtrack-ai-muted font-medium'>Today</span>
                <div className='flex-1 h-px bg-black/10' />
              </div>

              <div className='flex gap-2 items-start'>
                <div className='h-6 w-6 rounded-lg jtrack-ai-gradient-icon flex items-center justify-center'>
                  <IconSet iconName='sparkle' size={10} />
                </div>
                <div className='jtrack-ai-left-msg'>
                  Hey! I reviewed your tracker and can help prioritize the next applications.
                </div>
              </div>
            </div>

            <div className='jtrack-ai-left-footer'>
              <button className='jtrack-ai-left-add'>
                <IconSet iconName='plus' size={12} />
                <span>Add Job</span>
              </button>
            </div>
          </aside>

          <main className='jtrack-ai-center flex-1 min-w-0 flex flex-col'>
            <div className='flex-1 min-h-0 overflow-y-auto px-4 py-5'>
              {messages.length === 1 ? (
                <div className='h-full flex flex-col items-center justify-center text-center'>
                  <img src='src/assets/JTrack.png' alt='JTrack' width={!isPowerMode ? 86 : 72} className='drop-shadow-sm' />
                  <h2 className={`${!isPowerMode ? 'mt-5 text-xl' : 'mt-3 text-lg'} font-bold tracking-tight`}>
                    Hi, Applicant
                  </h2>
                  <p className='mt-2 text-sm jtrack-ai-muted max-w-md leading-relaxed'>
                    What can coach help you with today? I analyzed your board and ready when you are.
                  </p>
                  {!jobsData.length && !isPowerMode && (
                    <button className='mt-4 p-2 rounded-full jtrack-ai-soft-button border transition-colors'>
                      <Link to='/'>
                        <IconSet iconName='plus' size={22} />
                      </Link>
                    </button>
                  )}
                </div>
              ) : (
                <div className='space-y-4 pb-4'>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-xl px-4 py-3 rounded-2xl leading-relaxed text-sm shadow-sm ${
                          m.role === 'user'
                            ? 'jtrack-ai-user-bubble rounded-tr-md text-white'
                            : 'jtrack-ai-coach-bubble rounded-tl-md'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className='flex justify-start'>
                      <div className='jtrack-ai-coach-bubble px-4 py-3 rounded-2xl text-sm animate-pulse'>
                        Coach is thinking...
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={`${!isPowerMode ? 'px-4 pb-4 pt-3' : 'px-2 pb-2 pt-1'}`}>
              <div className='jtrack-ai-input-shell rounded-2xl border shadow-sm p-2 relative'>
                <textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    !e.shiftKey &&
                    (e.preventDefault(), getCoachReply(userPrompt, jobsData))
                  }
                  placeholder='Ask about your applications...'
                  className='w-full p-3.5 pr-14 bg-transparent border-none focus:ring-0 resize-none outline-none text-sm'
                  rows={2}
                />
                <button
                  onClick={() => getCoachReply(userPrompt, jobsData)}
                  className='absolute right-4 bottom-4 jtrack-ai-send-button text-white p-2 rounded-xl transition-colors'
                >
                  <IconSet iconName='send' size={18} />
                </button>
              </div>
            </div>
          </main>

          <aside className='jtrack-ai-right-panel flex flex-col'>
            <div className='jtrack-ai-right-header'>
              <div className='flex items-center gap-1.5'>
                <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                <span>Applications</span>
              </div>
              <button className='text-black/40 hover:text-black/60'>
                <IconSet iconName='moreHorizontal' size={14} />
              </button>
            </div>

            <div className='jtrack-ai-right-body'>
              {jobsData.slice(0, 8).map((job, index) => (
                <article key={`${job.company}-${index}`} className='jtrack-ai-application-card'>
                  <div className='h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-bold'>
                    {job.company.charAt(0)}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[11px] font-bold truncate'>{job.company}</p>
                    <p className='text-[8.5px] text-black/65 font-semibold truncate'>
                      Position: {job.position}
                    </p>
                  </div>
                  <button className='text-black/40'>
                    <IconSet iconName='moreHorizontal' size={14} />
                  </button>
                </article>
              ))}
            </div>

            <div className='jtrack-ai-right-footer'>
              <button className='jtrack-ai-right-add'>
                <IconSet iconName='plus' size={12} />
                <span>Add Job</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
