import { useEffect, useReducer, useState } from "react"
import { PreviewCard } from "./Column";
import type { JobType, State, ModalProps, Action } from './Types'


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
    const [rating, setRating] = useState(0);
    const [moodTxt, setMoodTxt] = useState("");

    const [state, dispatch] = useReducer(inputReducer, { boarder: "grey", })
    
    useEffect(() => {

    if(!editingJob) return

    const {company, position, status, link, createdAt, rating, moodTxt} = editingJob;
    
    setCompany(company);
    setPosition(position);
    setStatus(status);
    setLink(link ?? "");
    setCreatedAt(createdAt);
    setRating(rating ?? 0);
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
            rating: rating,
            moodTxt: moodTxt,
            favorites: false,
        }
        if(editingJob){
             updateJob(newJob)
        } else { 
             onAddJob(newJob)
        } 
        
    
}





function jobStatesReset(){
    
    setCompany("");
    setCreatedAt("");
    setLink("");
    setMoodTxt("");
    setPosition("");
    setStatus("wishlist");
    
}
return(
    
    <section>

            <form action="">

                <div>
                    
                    <label htmlFor="">Company name:</label>
                    
                    <input style={{backgroundColor: state.boarder}} type="text" name="company" id="" value={company} onChange={(e)=>{

                        !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                        e.target.value && setCompany(e.target.value);
                    }}/>
                    <label htmlFor="">role:</label>
                    <input type="text" name="role"  id="" value={position} onChange={(e)=>{
                        
                        !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                        setPosition(e.target.value)
                    }}/>
                    <label htmlFor="">link</label>
                    <input type="text" name="link" id="" value={link} onChange={(e)=>{
                        
                        !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                        setLink(e.target.value);
                    }}/>
                    <label htmlFor="">Created at:</label>
                    <input type="text" name="date" id="" value={createdAt} onChange={(e)=>{
                        
                        !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                        setCreatedAt(e.target.value);
                    }}/>
                    <label htmlFor="mood"></label>
                
                </div>

                <textarea name="moodMsg" id="" value={moodTxt} onChange={(e)=>{
                    
                    !e.target.value ? dispatch({type: "EMPTY"}) : dispatch({type: "ACTIVE"});
                    setMoodTxt(e.target.value);
                }}></textarea>

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

                <PreviewCard companyName={company} jobPosition={position} jobLink={link}></PreviewCard>
                <button type="button" onClick={()=>{
                    handleJobsNType();
                    jobStatesReset()
                }}>{editingJob ? "Save" : "Track"}</button>
                
                <button type="button" onClick={()=>{
                    jobStatesReset();
                    cancelJob()
                }}>Cancel</button>
            </form>

        </section>
)

}


export { Modal }