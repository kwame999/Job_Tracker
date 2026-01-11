import { useState } from "react"

const Modal = () => {
    
    const [jobType, setJobType] = useState([{}])
    console.log(jobType)
    
    function handleJobType(){
        
        setJobType(
            [...jobType,  {
                
                id: "",
                company: "",
                role: "",
                status: ["wishlist", "applied", "interview", "offer", "rejected", "ghosted"],
                link: "",
                createdAt: "",
                rating: "",
                moodTxt: "",
                
            }
        ]
        
    )
    
        
    }
    
    

    return(
    
    <section>

        <form action="">

            <div>
                <label htmlFor="">Company name:</label>
                <input type="text" name="company" id="" />
                <input type="text" name="role" id="" />
                <input type="text" name="date" id="" />
                <input type="text" name="link" id="" />
            
            </div>

            <textarea name="moodMsg" id=""></textarea>
            <select name="status" id="">
                
                <option value="wishlist">Wishlist</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="ghosted">Ghosted</option>
            
            </select>

            <button type="submit" onClick={handleJobType}>ss</button>
        </form>

    </section>
)


}

type JobType = {
    
    id: number,
    company: string,
    position: string,
    status: "wishlist" | "applied" | "interview" | "offer" | "rejected" | "ghosted",
    link?: string,
    createdAt: string,
    rating: number,
    moodTxt: string,


}

const Card = (jobType: JobType) => {
    
    const {company, position, link, status, moodTxt, createdAt, rating} = jobType

    return(
        
        <section>
        
            <p>Company:{company}</p>
            <p>Position:{position}</p>
            <p>Link:{link}</p>
            <p>Applied:{createdAt}</p>
            <p>Status:{status}</p>
            <p>Mood:{moodTxt}</p>
            <p>Rating:{rating}</p>
        
        </section>
    )

}



export {Modal, Card}