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
      <div
        className={`jtrack-ai-shell h-full min-h-0 mx-auto w-full flex ${!isPowerMode ? 'max-w-[1440px]' : 'max-w-none'}`}
      >
        <div
          className={`jtrack-ai-board flex-1 min-w-0 border overflow-hidden ${!isPowerMode ? 'm-3 rounded-2xl' : 'm-0 rounded-none border-0'}`}
        >
          <header className='jtrack-ai-header px-4 py-3 border-b flex items-center gap-3'>
            <div className='h-9 w-9 rounded-[10px] jtrack-ai-gradient-icon flex items-center justify-center'>
              <IconSet iconName='sparkle' size={15} />
            </div>
            <div className='min-w-0'>
              <h1 className='text-xs font-bold tracking-tight'>AI Coach</h1>
              <div className='flex items-center gap-1.5 mt-0.5'>
                <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                <p className='text-[10px] jtrack-ai-muted font-medium'>Online · Ready to help</p>
              </div>
            </div>
          </header>

          <div className='flex-1 min-h-0 flex flex-col'>
            <div className={`flex-1 min-h-0 overflow-y-auto ${!isPowerMode ? 'px-4 py-5' : 'px-3 py-3'}`}>
              {messages.length === 1 ? (
                <div className='h-full flex flex-col items-center justify-center text-center'>
                  <img
                    src='src/assets/JTrack.png'
                    alt='JTrack'
                    width={!isPowerMode ? 86 : 72}
                    className='drop-shadow-sm'
                  />
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
                    <div
                      key={i}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
