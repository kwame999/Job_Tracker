import { useEffect, useReducer, useState } from "react"
import { PreviewCard } from "./Column";
import type { JobType, State, ModalProps, Action } from './Types'
import { IconSet } from "./icons/icon";


function inputReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'EMPTY':
            return { boarder: "white"}
        case 'ACTIVE':
            return {  boarder: "green" };
        default:
            return state; 
    }
}



const Modal = ({ onAddJob, editingJob, updateJob, cancelJob }: ModalProps) => {
    
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("wishlist");
    const [link, setLink] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [salary, setSalary] = useState("");
    const [moodTxt, setMoodTxt] = useState("");
    
    const [state, dispatch] = useReducer(inputReducer, { boarder: "grey", })
    
    useEffect(() => {

    if(!editingJob) return

    const {company, position, status, link, createdAt, salary, moodTxt} = editingJob;
    
    setCompany(company);
    setPosition(position);
    setStatus(status);
    setLink(link ?? "");
    setCreatedAt(createdAt);
    setSalary(salary ?? "");
    setMoodTxt(moodTxt)

    },[editingJob])

    function handleJobsNType(){
        const newJob: JobType =
        
        {
            
            id: editingJob ?  editingJob.id : crypto.randomUUID(),
            company: company,
            companyIcon: {
                logo: `https://img.logo.dev/${company}.com?token=pk_RKtwoXuaQDSJdIEDV1NYVA`,
                alt: `${company} logo`
            },
            position: position,
            status: status,
            link: link,
            createdAt: createdAt,
            date: new Date(),
            salary: parseInt(salary),
            moodTxt: moodTxt,
            favorites: false,
        }


        if(editingJob){ updateJob(newJob) } else { onAddJob(newJob) } 
        
    
}


function handleClose(){
    
        jobStatesReset();
        cancelJob()
}


function jobStatesReset(){
    
    setCompany("");
    setCreatedAt("");
    setLink("");
    setMoodTxt("");
    setPosition("");
    setStatus("wishlist");
    // setSalary(0)
    
}
return(
    
    <section className="bg-red-300 absolute z-1  p-6 rounded-2xl">
            <div className=" flex justify-between">
            <h1 className="text-[28px]  font-bold pb-1.5">Track Job</h1>
            <button onClick={handleClose}>
                <IconSet iconName="sun" size={18}></IconSet>
            </button>
            </div>
            <form action="">

                <div className="flex flex-col gap-4  text-[17px]">
                    <div className="flex outline-red-700 outline-2">
                        <div className="flex flex-col gap-[.4rem]">
                            <label htmlFor="" className="font-semibold">Company name:</label>
                            
                            <input style={{backgroundColor: state.boarder}} className="p-1" type="text" name="company" id="" size={28} value={company} onChange={(e)=>{

                                !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                                setCompany(e.target.value);
                            }}/>
                        </div>

                        <div className="flex flex-col gap-[.4rem]">
                        <label htmlFor="" className="font-semibold">Position:</label>
                        <input type="text" name="role"  className="p-1" id="" size={28} value={position} onChange={(e)=>{
                            
                            !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                            setPosition(e.target.value)
                        }}/>
                        </div>
                    </div>

                    <div className="flex gap-[.4rem]  outline-red-700 outline-2">
                        <div className="flex flex-col gap-[.4rem] ">
                            <label htmlFor="" className="font-semibold">Salary</label>
                            <input type="text" name="link" id="" size={28}  className="p-1 bg-green-400" value={salary} onChange={(e)=>{
                                
                                !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                                setSalary(e.target.value);
                        
                            }}/>
                        </div>

                        <div className="flex flex-col gap-[.4rem]">
                            <label htmlFor="" className="font-semibold">Created at:</label>
                            <input type="text" name="date" id="" size={28} className="p-1" value={createdAt} onChange={(e)=>{
                                
                                !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                                setCreatedAt(e.target.value);
                            }}/>
                        </div>
                    </div>
                    
                    {/* <label htmlFor="" className="text-base">Link</label>
                    <input type="text" name="date" id="" size={28} className="p-1" value={""} onChange={()=>{
                        
                  
                    }}/> */}
                
                </div>

                <div className="flex flex-col gap-[.4rem]">
                    <label htmlFor="mood" className=" text-[17px] font-semibold pt-5">Note</label>
                    <textarea name="moodMsg" id="" value={moodTxt} onChange={(e)=>{
                        
                        !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                        setMoodTxt(e.target.value);
                    }} rows={4} className=" bg-yellow-300"></textarea>
                </div>

                <select name="status" id="" onChange={(e)=>{
                    
                    !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                    setStatus(e.target.value);
                }}>
                    
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="ghosted">Ghosted</option>
                
                </select>

                <PreviewCard companyName={company} jobPosition={position} jobLink={link} jobSalary={salary}></PreviewCard>
               
               <div className="bg-green-500 flex w-full">

                   <button type="button" onClick={ handleClose } className="bg-amber-500 w-full p-3">Cancel</button>
                
                    <button type="button" onClick={()=>{
                        handleJobsNType();
                        jobStatesReset()
                    }}className="w-full">{editingJob ? "Save" : "Track"}</button>
                
                </div>
            </form>

        </section>
)

}



export { Modal }