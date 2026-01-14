import type { ReactNode } from "react"

//Types:
type ColumnProps = {

    children?: ReactNode,
    color?: string,
    name: string,
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



type Company = {
    logo: string,
    alt: string
}



const Column = ({children, color, name = "grey"}: ColumnProps) => {

    return(
        <section>
            <div className="flex gap-2">{name}
                <button>fdf</button>
            </div>
            <div style={{backgroundColor: color}} 
                         className="flex flex-col">
                {children}
            </div>
        
        </section>
        
    )

}

const Card = (job: JobType) => {
    
    const {company, position, link, status, moodTxt, createdAt, rating} = job

    // const deleteTodo = (id) => { jobType.filter(job => job !== jobType.id)}

    return(
        
        <section>
        
            <p>Company:{company}</p>
            <p>Position:{position}</p>
            <p>Link:{link}</p>
            <p>Applied:{createdAt}</p>
            <p>Status:{status}</p>
            <p>Mood:{moodTxt}</p>
            <p>Rating:{rating}</p>
        <div>
            <button>Delete</button>
            <button>Edit</button>
        </div>

        </section>
    )


}


export { Column, Card}