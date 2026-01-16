import { useEffect, useReducer, useState } from "react"

type Company = {
    logo: string,
    alt: string
}

type JobType = {
    
    id: string,
    company: string,
    companyIcon: Company,
    position: string,
    status: string,
    link?: string,
    createdAt: string,
    rating?: number,
    moodTxt: string,
    favorites: boolean,
}

type State = {
    boarder: string,
};
type ValueState = {
    key: string | number
};

type Action = 
      { type: 'EMPTY' }
    | { type: 'ACTIVE' }
    | { type: 'FILLED' }
    | { type: 'SET_COMPANY' }
    | { type: 'SET_POSITION' }
    | { type: 'SET_STATUS' }
    | { type: 'SET_LINK' }
    | { type: 'SET_CREATEDAT' }
    | { type: 'SET_RATING' }
    | { type: 'SET_MOODTXT' }


type AddJob = (newJob: JobType) => void;
type UpdateJob = (job: JobType) => void;
type cancelJob = (job: JobType) => void;

type ModalProps = {
    onAddJob: AddJob,
    editingJob: JobType | null,
    updateJob:  UpdateJob,
    cancelJob: cancelJob
}

function inputReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'EMPTY':
            return { boarder: "white" };
        case 'ACTIVE':
            return {  boarder: "green" };
        case 'FILLED':
            return {  boarder: "green" };
        default:
            return state; 
    }
}

function valueReducer(state: ValueState, action: Action): ValueState{
    switch(action.type){
        case 'SET_COMPANY':
        
    }

    return state
}


const Modal = ({ onAddJob, editingJob, updateJob, cancelJob }: ModalProps) => {
    
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("");
    const [link, setLink] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [rating, setRating] = useState(0);
    const [moodTxt, setMoodTxt] = useState("");

    const [valueState, dispatchValue] = useReducer(valueReducer, {key: "s"})
    const [state, dispatch] = useReducer(inputReducer, {boarder: "white", 
                                                     })
    
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

function jobStatesReset(e: React.MouseEvent){
    
    e.preventDefault();
    setCompany("");
    setCreatedAt("");
    setLink("");
    setMoodTxt("");
    setPosition("");
    setStatus("");
    
}
return(
    
    <section>

            <form action="">

                <div>
                    
                    <label htmlFor="">Company name:</label>
                    
                    <input style={{backgroundColor: state.boarder}} type="text" name="company" id="" value={company} onChange={(e)=>{
                        setCompany(e.target.value)
                        
                        !e.target.value ?
                        dispatch({
                            type: 'EMPTY'
                        }):
                        dispatch({
                            type: 'ACTIVE'
                        })
                    }}/>
                    <label htmlFor="">role:</label>
                    <input type="text" name="role"  id="" value={position} onChange={(e)=>{
                        setPosition(e.target.value)
                    }}/>
                    <label htmlFor="">link</label>
                    <input type="text" name="link" id="" value={link} onChange={(e)=>{
                        setLink(e.target.value);
                    }}/>
                    <label htmlFor="">Created at:</label>
                    <input type="text" name="date" id="" value={createdAt} onChange={(e)=>{
                        setCreatedAt(e.target.value);
                    }}/>
                    <label htmlFor="mood"></label>
                
                </div>

                <textarea name="moodMsg" id="" value={moodTxt} onChange={(e)=>{
                    setMoodTxt(e.target.value);
                }}></textarea>

                <select name="status" id="" onChange={(e)=>{
                    setStatus(e.target.value);
                }}>
                    
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="ghosted">Ghosted</option>
                
                </select>

                <button type="submit" onClick={(e)=>{
                    handleJobsNType();
                    jobStatesReset(e)
                }}>{editingJob ? "Save" : "Track"}</button>
                
                <button type="submit" onClick={(e)=>{
                    e.preventDefault();
                    jobStatesReset(e);

                }}>Cancel</button>
            </form>

        </section>
)

}


export { Modal }