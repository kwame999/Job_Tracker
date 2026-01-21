import { useState, type ReactNode } from "react"
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

type TabViewProps = {
    children: ReactNode
}
const TabView = ({children}: TabViewProps) => {

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
                <ul className="tab-nav flex gap-6 justify-end">
                    <li onClick={()=>{ handleTab(0) }}>{Kanban}</li>
                    <li onClick={()=>{ handleTab(1) }}>{Accepted}</li>
                    <li onClick={()=>{ handleTab(2) }}>{Wishlist}</li>
                    <li onClick={()=>{ handleTab(3) }}>{Ghosted}</li>
                </ul>

                <div className="tab-viewport flex outline-1 p-3.5 gap-7 p  justify-center overflow-x-scroll">
                    {children}
                </div>
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


const StatBlock = ({svgType, statTxt, children, data}: StatsBlockProps) => {


    return(

        <div>
            <div className="flex items-center gap-1">
            <svg height={30} width={30} className=" outline-1">{svgType}</svg>
            <p>{statTxt}</p>
            <p>{data}</p>
            </div>
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