import { useState } from "react"
import type { Tags, StatsBlockProps} from './Types'

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


const TabView = () => {

    const tabItems: string[] = ["Kanban View", "Accepted", "Wishlist", "Ghosted"];
    const [Kanban, Accepted, Wishlist, Ghosted] = tabItems
    // const [isActive, setIsActive] = useState<boolean>(true);
    const [tabActive, setTabActive] = useState<string>(tabItems[0]);
    // const isActtives: boolean = true
    console.log(tabActive)    
    function handleTab(tab: number){
        setTabActive(
            tabItems[tab]
        )
    }

    return(
        <>        
            <div className="tabs-container">
                <ul className="tab-nav">
                    <li onClick={()=>{ handleTab(0) }}>{Kanban}</li>
                    <li onClick={()=>{ handleTab(1) }}>{Accepted}</li>
                    <li onClick={()=>{ handleTab(2) }}>{Wishlist}</li>
                    <li onClick={()=>{ handleTab(3) }}>{Ghosted}</li>
                </ul>

                <div className="tab-viewport"></div>
            </div>

        </>
    )

}

// type TabViewPortProps = {
//     crntTab: string
//     children: React.ReactNode
// }

// const TabViewPort = ({crntTab, children}:TabViewPortProps) => {


//     return(
//         crntTab ===
//         <div>
//             {children}
//         </div>
//     )
// }


const StatBlock = ({svgType, statTxt, children}: StatsBlockProps) => {


    return(

        <div>
            <>
            <svg>{svgType}</svg>
            <p>{statTxt}</p>
            </>
            {children}
        </div>

    )
}

const ProjectSetModal = () => {


    return(
        <form>
            <h1>New Tracker:</h1>
            <>
                <input type="text" name="projName" id="" />
            </>
          
            <input type="text" name="tags" />
            <input type="text" name="status" />


        </form>
    )

}
export {Tag, TabView, StatBlock, ProjectSetModal} 