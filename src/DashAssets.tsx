import { useState } from "react"

type Tags = string

const Tag = () => {

    const [tagTypes, setTagTypes] = useState<Tags[]>([]);
    const [openField, setOpenField] = useState<boolean>(false);
    const [tag, setTag] = useState<string>("");

    function handleTag(){
        setTagTypes(prev => [tag, ...prev]);
    }

    function handleOpenField(){
        setOpenField(true);
    }
    
    
    return(
        <div>
            <button onClick={handleOpenField}>+</button>

            {openField && 
            <>
                <input type="text" onChange={(e)=>{ setTag(e.target.value) }}/>
                <button onClick={handleTag}>add</button>
                {openField && <><button onClick={()=>{setOpenField(false)}}>close</button></>}
            </>}

            {tagTypes.map(tag => <div> <h4>{tag}</h4> </div>)}
        </div>
    )

}

export default Tag