import { useReducer, useState } from "react"

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
    boarder: string;
};

type Action = 
    | { type: 'EMPTY' }
    | { type: 'ACTIVE' }
    | { type: 'FILLED' };

type AddJob = (newJob: JobType) => void;

type ModalProps = {
    onAddJob: AddJob
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
const Modal = ({ onAddJob }: ModalProps) => {
    
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("");
    const [link, setLink] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [rating, setRating] = useState(0);
    const [moodTxt, setMoodTxt] = useState("");

    const [state, dispatch] = useReducer(inputReducer, {boarder: "white", 
                                                     })
    
    function handleJobsNType(){
        
        const newJob: JobType =
            
            {
                
                id: crypto.randomUUID(),
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
        
    onAddJob(newJob);
    
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

                <textarea name="moodMsg" id="" onChange={(e)=>{
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
                    e.preventDefault();
                    handleJobsNType();
                    setCompany("");
                    setCreatedAt("");
                    setLink("");
                    setMoodTxt("");
                    setPosition("");
                    setStatus("");
                    setMoodTxt("");
                }}>Track</button>
            </form>

        </section>
)

}


export { Modal }