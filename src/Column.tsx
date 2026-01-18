import { useState } from "react"
import type { ColumnProps, CardProps, CardPreview } from './Types'


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

const Card = ({job, onDelete, onEdit}: CardProps) => {
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {id, company, position, link, status, moodTxt, createdAt, rating} = job
    function handleOpen(){
        setIsOpen( !isOpen ? true : false );
    }
    
    return(
        <section>
        
            <p>Company:{company}</p>
            <p>Position:{position}</p>
            {isOpen && 
                <>
                    <p>Link:{link}</p>
                    <p>Applied:{createdAt}</p>
                    <p>Status:{status}</p>
                    <p>Mood:{moodTxt}</p>
                    <p>Rating:{rating}</p>
                </>
            }
        <div>
            <button onClick={ ()=> {onDelete(id)} }>Delete</button>
            <button onClick={ ()=> {onEdit(id)} }>Edit</button>
            <button onClick={ handleOpen }>Expand</button>
        </div>

        </section>
    )


}

const PreviewCard = ({companyName, jobPosition, jobLink}: CardPreview) => {
    
    return(
        <section>
            <p>Company:{companyName}</p>
            <p>Position:{jobPosition}</p>
            <p>Link:{jobLink}</p>
        </section>
    )

}


export { Column, Card, PreviewCard}