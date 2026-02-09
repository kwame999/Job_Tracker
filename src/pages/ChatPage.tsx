import type { JobType } from "../Types"
import { useState } from "react"
import { getCoachResponse } from "../lib/gemini"
import { StatCard } from "../DashAssets"
import { IconSet } from "../icons/icon"
import { Link } from "react-router-dom"
interface ChatPageProps {
    jobsData: JobType[],

}
const ChatPage = ({jobsData}: ChatPageProps) => {

    const [coachResponse, setCoachResponse] = useState<string>("");
    const [userPrompt, setUserPrompt] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<{role: 'user' | 'coach', text: string}[]>([{ role: 'coach', text: "" }]);
    
   async function getCoachReply(input: string, jobsData: JobType[]) {
 
    if (!input.trim() || isLoading) return;
  
        //User message
        const userMsg = { role: 'user' as const, text: input };
        setMessages(prev => [...prev, userMsg]);
        setUserPrompt(""); 
        setisLoading(true);

       
        const response = await getCoachResponse(input, jobsData);
        
        // AI message
        setMessages(prev => [...prev, { role: 'coach', text: response || "I'm drawing a blank. Try again?" }]);
        setisLoading(false);
        }

    return(
          <section className="flex-1 flex flex-col bg-gray-100 overflow-hidden justify-center">
            
                {/* Stats section*/}
                <div className="flex justify-center gap-8 p-4 bg-gray-20">
                    <StatCard label="Total Tracked" value={jobsData.length || "-"} />
                    <StatCard label="Interviews" value={jobsData.filter(j => j.status === 'interview').length || "-"} />
                    <StatCard label="Ghosted" value={jobsData.filter(j => j.status === 'ghosted').length || "-"} />
                </div>

                {/* Conversation section */}
                <div className="flex-1 overflow-y-auto px-4 md:px-[20%] lg:px-[25%] py-10">

                {messages.length === 1 && (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                        <img src='src\assets\JTrack.png' alt="" width={100} className="drop-shadow-md" />
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-7 mt-8 tracking-wide">Hi, Applicant</h1>
                    <p className="text-gray-400 max-w-sm">
                        What can coach help you with today? I've analyzed your board and I'm ready when you are.
                    </p>
                    <button className="bg-black/3 mt-4 p-2 rounded-full hover:bg-black/8 transition-opacity outline-1 outline-black/15">
                        {!jobsData.length && <Link to='/' className=""><IconSet iconName="plus" size={24}></IconSet></Link>}                        
                    </button>

                    </div>
                    
                )}

                {/* Main Convo - only maps if there are actual exchanges */}
                <div className="space-y-4  p-3 rounded-md px-4 text-sm">
                    {messages.length > 1 && messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl p-4 rounded-[24px] drop-shadow-md leading-relaxed tracking-wide ${
                        m.role === 'user' 
                            ? 'bg-gray-800 text-white rounded-tr-none' 
                            : 'bg-white border border-gray-100 rounded-tl-none text-gray-800'
                        }`}>
                        {m.text}
                        </div>
                    </div>
                    ))}
                    {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl text-gray-400 text-sm animate-pulse">
                        Coach is thinking...
                        </div>
                    </div>
                    )}
                </div>
                </div>

                {/* Input section*/}
                <div className="p-10 bg-transparent">
                    <div className="max-w-3xl mx-auto relative bg-white rounded-2xl border border-gray-200 shadow-lg p-2">
                    <textarea 
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        onKeyDown={(e) => (e.key === 'Enter' && !e.shiftKey) && (e.preventDefault(), getCoachReply(userPrompt, jobsData))}
                        placeholder="Ask about your applications..."
                        className="w-full p-4 pr-16 bg-transparent border-none focus:ring-0 resize-none outline-none text-gray-700"
                        rows={2}
                    />
                    <button 
                        onClick={() => getCoachReply(userPrompt, jobsData)}
                        className="absolute right-4 bottom-4 bg-gray-400 text-white p-2 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        <IconSet iconName="send" size={20} /> 
                    </button>
                    </div>
                </div>
            </section>
            
    )

}
export default ChatPage