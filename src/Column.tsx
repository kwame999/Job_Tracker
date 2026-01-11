import type { ReactNode } from "react"

//Types:
interface ColumnProps {

    children?: ReactNode,
    color?: string,
    name: string,
}

// interface JobType {

//     id: number,
//     company: string,
//     role: string,
//     status: ["wishlist", "applied", "interview", "offer", "rejected", "ghosted"],
//     link?: string,
//     createdAt: string,
//     rating: number,
//     moodTxt: string,

// }

// interface CardProps {
//     job
// }

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


// const Card = ({jobType}) => {
    
//     const {...jobType} = jobType
//     return(
//         <section>
//             <p>Company:{jobType.company}</p>
//             <p>Position:{jobType.position}</p>
//             <p>Link:{jobType.link}</p>
//             <p>Applied:{jobType.createdAt}</p>
//             <p>Status:{jobType.status[0]}</p>
//             <p>Mood:{jobType.moodTxt}</p>
//             <p>Rating:{jobType.rating}</p>
        
//         </section>
//     )

// }

export default Column