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



const Modal = ({ onAddJob, editingJob, updateJob, cancelJob, onAddCustomCol }: ModalProps) => {
    
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("wishlist");
    const [link, setLink] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [salary, setSalary] = useState("");
    const [moodTxt, setMoodTxt] = useState("");
    
    // const [lastCreatedID, setLastCreatedID] = useState<string>("")
    // console.log(lastCreatedID)
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
        // if (!editingJob) setLastCreatedID(newJob.id)
    
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
    <>
    
    <div className='bg-black/50 p-40 absolute w-full h-full backdrop-blur-[1px] flex justify-center items-center z-1'></div>
    <section className=" bg-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-xl z-1000 max-w-[440px]">
            
            <div className=" flex justify-between items-center mb-4">
                <h1 className="text-[28px]  font-bold">Track Job</h1>
                    <button onClick={handleClose}>
                        <IconSet iconName="close" size={18}></IconSet>
                    </button>
            </div>
            
            <form action="">

                <div className="flex flex-col gap-4  text-[17px]">
                    <div className="flex gap-4.5">
                        <div className="flex flex-col gap-[.4rem]">
                            <label htmlFor="" className="font-semibold text-sm">Company name:</label>
                            
                            <input style={{backgroundColor: state.boarder}} className="p-1 w-full outline-1 outline-gray-400 rounded-md" type="text" name="company" id="" size={28} value={company} onChange={(e)=>{

                                !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                                setCompany(e.target.value);
                            }}/>
                        </div>

                        <div className="flex flex-col gap-[.4rem]">
                        <label htmlFor="" className="font-semibold text-sm">Position:</label>
                        <input type="text" name="role"  className="p-1 outline-1 rounded-md bg-card-main w-full outline-gray-400" id="" size={28} value={position} onChange={(e)=>{
                            
                            !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                            setPosition(e.target.value)
                        }}/>
                        </div>
                    </div>

                    <div className="flex gap-4.5">
                        <div className="flex flex-col gap-[.4rem] ">
                            <label htmlFor="" className="font-semibold text-sm">Salary</label>
                            <input type="text" name="link" id="" size={28}  className="p-1 outline-1 outline-gray-400 rounded-md bg-card-main w-full" value={salary} onChange={(e)=>{
                                
                                !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                                setSalary(e.target.value);
                        
                            }}/>
                        </div>

                        <div className="flex flex-col gap-[.4rem]">
                            <label htmlFor="" className="font-semibold text-sm">Created at:</label>
                            <input type="text" name="date" id="" size={28} className="p-1 outline-1 outline-gray-400 rounded-sm bg-card-main w-full" value={createdAt} onChange={(e)=>{
                                
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
                    <label htmlFor="mood" className=" text-sm font-semibold pt-5 ">Note</label>
                    <textarea name="moodMsg" id="" value={moodTxt} onChange={(e)=>{
                        
                        !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                        setMoodTxt(e.target.value);
                    }} rows={4} className="p-1 outline-1 outline-gray-400  rounded-md bg-card-main w-full"></textarea>
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
                    { onAddCustomCol.map( col => <option value={col.containerName}>{col.containerName}</option> ) }
                </select>

                <PreviewCard companyName={company} jobPosition={position} jobcreatedAt={createdAt} jobSalary={salary}></PreviewCard>
               
               <div className="flex w-full gap-3 font-bold">

                   <button type="button" onClick={ handleClose } className="bg-amber-500 w-full p-3 rounded-lg">Cancel</button>
                
                    <button type="button" onClick={()=>{
                        handleJobsNType();
                        jobStatesReset()
                        
                    }}className="w-full bg-gray-400 rounded-lg">{editingJob ? "Save" : "Track"}</button>
                
                </div>
            </form>

        </section>
    </>
)

}



export { Modal }