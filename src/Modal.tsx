import { useEffect, useReducer, useState } from "react"
import { PreviewCard } from "./Column";
import type { JobType, State, ModalProps, Action } from './Types'
import { IconSet } from "./icons/icon";
import supabase from './lib/supabaseClient'


const Modal = ({ onAddJob, editingJob, updateJob, cancelJob, onAddCustomCol, currentCol, onSetCurrentCol }: ModalProps) => {
    
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState(currentCol); //Default status is controlled by currentCol
    const [link, setLink] = useState("");
    const [salary, setSalary] = useState<string | number>("");
    const [moodTxt, setMoodTxt] = useState("");
   

    useEffect(() => {
        if(!editingJob) return
        const {company, position, status, link, salary, mood_txt} = editingJob;
        
        setCompany(company);
        setPosition(position);
        setStatus(status);
        setLink(link ?? "");
        setSalary(salary ?? 0);
        setMoodTxt(mood_txt);

    },[editingJob]);

    async function handleJobsNType(){

        const newJob: JobType = {
        company: company,
        position: position,
        status: status,
        link: link,
        salary: (typeof salary === 'string' ? parseInt(salary, 10) : salary) || 0,
        mood_txt: moodTxt,
        logo_url: `https://img.logo.dev/${company}.com?token=pk_RKtwoXuaQDSJdIEDV1NYVA`,
        logo_alt: `${company} logo`,
        }

        const {data, error} = await supabase
        .from('jobs')
        .insert([newJob])
        .select()

       if (error) {
        console.error("Supabase Error:", error.message);
        return; 
        }


        if (data && data.length) {
        const savedJob = data[0]; 

            if (editingJob) {
                const { data, error } = await supabase
                .from('jobs')
                .update(newJob)           
                .eq('id', editingJob.id)  
                .select();                

                if (error) {
                    console.error("Update failed:", error.message);
                } else if (data && data.length > 0){
                    updateJob(data[0]); 
                    handleClose()}
            } else { onAddJob(savedJob); }

    }

        // if (editingJob) { updateJob(data[0]) } else { newJob.company && onAddJob(!data?.length || !data ? [] : data[0]) }
        
    }

    function handleClose(){
        jobStatesReset();
        cancelJob();
    }

    function jobStatesReset(){
        setCompany("");
        setLink("");
        setMoodTxt("");
        setPosition("");
        setStatus(status); //set back to users last selected status when job is created
        setSalary(""); 
    
    }

    return (
        <>
            <div className='fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[999]' onClick={handleClose}></div>

            <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[520px] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_1px_rgba(0,0,0,0.1)] z-[1000] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Form Header */}
                <div className="pt-[28px] px-[32px] pb-[24px] border-b border-[#F0F0F0] relative">
                    <button onClick={handleClose} className="absolute right-[24px] top-[24px] w-[32px] h-[32px] rounded-[8px] flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <IconSet iconName="close" size={16}/>
                    </button>
                    <h2 className="text-[24px] font-bold text-[#0A0A0A] leading-[1.3] tracking-[-0.02em]">
                        {editingJob ? "Edit Application" : "Track New Job Application"}
                    </h2>
                    <p className="mt-[6px] text-[14px] text-[#737373] leading-[1.5]">
                        Add details about your job application to track progress
                    </p>
                </div>

                {/* Form Body */}
                <div className="p-[32px] pt-[28px] flex flex-col gap-[24px]">
                    <div className="grid grid-cols-2 gap-[16px]">
                        <div className="flex flex-col gap-[6px]">
                            <label className="text-[13px] font-semibold text-[#1A1A1A]">Company Name</label>
                            <input 
                                placeholder="e.g., Google"
                                className="w-full h-[40px] px-[14px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[14px] outline-none focus:border-black transition-all"
                                type="text" 
                                value={company} 
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-[6px]">
                            <label className="text-[13px] font-semibold text-[#1A1A1A]">Position</label>
                            <input 
                                placeholder="e.g., Product Designer"
                                className="w-full h-[40px] px-[14px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[14px] outline-none focus:border-black transition-all"
                                type="text" 
                                value={position} 
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[16px]">
                        <div className="flex flex-col gap-[6px]">
                            <label className="text-[13px] font-semibold text-[#1A1A1A]">Salary</label>
                            <input 
                                placeholder="e.g., $120,000"
                                className="w-full h-[40px] px-[14px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[14px] outline-none focus:border-black transition-all"
                                type="text" 
                                value={salary} 
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-[6px]">
                            <label className="text-[13px] font-semibold text-[#1A1A1A]">Status</label>
                            <select 
                                className="w-full h-[40px] px-[14px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[14px] outline-none focus:border-black transition-all cursor-pointer"
                                value={status.toLowerCase()} 
                                onChange={(e) => {
                                    setStatus(e.target.value);        //status remains state when modal is open, else btn clicked is state
                                    onSetCurrentCol("");   //when setting status, reset currentcol
                                }}
                            >
                                
                                <option value="wishlist">Wishlist</option>
                                <option value="applied">Applied</option>
                                <option value="interview">Interview</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                                <option value="ghosted">Ghosted</option>
                                {onAddCustomCol.map(col => <option key={col.containerName} value={col.containerName.toLowerCase()}>{col.containerName}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[6px]">
                        <label className="text-[13px] font-semibold text-[#1A1A1A]">Notes</label>
                        <textarea 
                            placeholder="Add any additional notes..."
                            rows={3}
                            className="w-full p-[14px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[14px] outline-none focus:border-black transition-all resize-none"
                            value={moodTxt} 
                            onChange={(e) => setMoodTxt(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-[32px] py-[24px] border-t border-[#F0F0F0] flex gap-[12px] bg-white">
                    <button type="button" onClick={()=>{
                        handleClose()
                        onSetCurrentCol("");
                    }} className="flex-1 h-[44px] bg-white border-[1.5px] border-[#E5E5E5] rounded-[8px] text-[15px] font-semibold text-[#404040] hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        onClick={() => { handleJobsNType(); jobStatesReset(); }}
                        className="flex-1 h-[44px] bg-[#0A0A0A] border-none rounded-[8px] text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#262626] transition-colors"
                    >
                        {editingJob ? "Save Changes" : "Track Application"}
                    </button>
                </div>
            </section>
        </>
    )
}



export { Modal }