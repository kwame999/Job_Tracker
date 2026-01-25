import { useState, type ReactNode } from "react"
import type { Tags, StatsBlockProps} from './Types'
import { IconSet } from "./icons/icon";
import './index.css'
import type { TabViewProps } from "./Types";
const Tag = () => {

    const [tagTypes, setTagTypes] = useState<Tags[]>([]);
    const [tag, setTag] = useState<string>("");

    function handleTag(){
        setTagTypes(prev => [tag, ...prev]);
        setTag("")
    }

    function handleDeleteTag(id: number){
        setTagTypes( tagTypes.filter((tags, indx) => indx !== id))
    }


    return(
      
        <div>

            <>

            <div className="flex bg-red-700 min-w-140 max-w-140 p-2">
                
             <div className="flex gap-3 overflow-x-scroll w-full"> 
                    
                    { tagTypes.map((tag, indx) => 

                        <div className="flex gap-1 outline-1 bg-amber-50 p-1 rounded-4xl" key={`${indx}`}>
                            
                            <button onClick={()=>{ handleDeleteTag(indx) }}>
                                <IconSet iconName="plus" size={18}></IconSet>
                            </button>
                            
                            <h4>{tag}</h4> 
                        
                        </div>

                    )}
                </div>
            
                <input type="text" className="ml-auto" value={tag} onChange={(e)=>{ setTag(e.target.value)}} onKeyDown={(e)=>{                
                    if(e.key === 'Enter') handleTag();
                }}/>
            </div>
            </>
             {tagTypes.length > 4 && <p className="text-blue-500">Cannot set more than {tagTypes.length} tags</p>
}              
            
        </div>
    )

}



const TabView = ({children, data, jobs, onShowModal}: TabViewProps) => {

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
            <div className="tabs-container ml-6 mr-6 out">
                <div className="flex justify-between  items-center my-5 out">
                    <div className='flex flex-col gap-2 px-2'>
                        <div className='flex gap-8'>
                            <StatBlock svgType='clock' svgSize={25} statTxt='Created:' data={Date.now()}></StatBlock>
                            <StatBlock svgType='track' svgSize={25} statTxt='Jobs Tracked:' data={data.length}></StatBlock>
                        </div>
                            <StatBlock svgType='tags' svgSize={25} statTxt='Tags:' data={"ux"}></StatBlock>
                    </div>
                    <ul className="tab-nav flex gap-6 text-center bg-green-600 p-2.5 w-fit rounded-xl outline-1  ">
                        <li onClick={()=>{ handleTab(0) }} className="bg-purple-200 p-1 rounded-md">{Kanban}</li>
                        <li onClick={()=>{ handleTab(1) }} className=" p-1">{Accepted}</li>
                        <li onClick={()=>{ handleTab(2) }} className=" p-1">{Wishlist}</li>
                        <li onClick={()=>{ handleTab(3) }} className=" p-1">{Ghosted}</li>
                    </ul>
                </div>

                {jobs.length ? <div className="tab-viewport flex  gap-7  justify-between overflow-x-scroll px-2 py-2">{children}</div> 
                             : <div className="flex flex-col w-full items-center justify-center  outline-2 outline-dashed rounded-xl py-7 h-[60vh] outline-gray-300 bg-gray-100"> <img src="\src\assets\flat-briefcase-icon-by-Vexels 1.png" alt="" width={200} />
                             
                             
                                    <div className="flex center flex-col items-center gap-1">
                                        <h1 className="text-lg font-bold">No Jobs Tracked...</h1>
                                        <p>Add jobs to track your journey and see your growth!</p>

                                        <div className="w-full flex justify-center items-center mt-5">

                                            <button className=" bg-gray-700 p-2 w-[40%] rounded-lg font-bold shadow-[0px_4px_12px_0px_rgba(0,0,0,0.17)]" 
                                                    onClick={ onShowModal }>Track
                                            </button>
                                        
                                        </div>
                                    </div>
                             
                             </div> }
                                    
                                    
               
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


const StatBlock = ({svgType,svgSize, statTxt, children, data}: StatsBlockProps) => {

    
    return(
        
        <div>
            <div className="flex items-center gap-1">
            <IconSet iconName={svgType} size={svgSize}></IconSet>
            <p className="font-bold text-text-header2 text-md mr-1">{statTxt}</p>
            <p className="text-text-paragrah font-semibold">{data}</p>
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

type CustomContainerT = {
  containerName: string,
  containerColor?: string,
}

type ModalNewContainerProps = {
setNewContainer: (container: CustomContainerT) => void

}

const ModalNewContainer = ({setNewContainer}: ModalNewContainerProps) => {
    
  const [showNewModal, setShowNewModal] = useState<boolean>(true)
  const [containerName, setContainerName] = useState<string>("")
//   const [containerColor, setContainerColor] = useState<string>("")


  function handleNewModal(){
  setShowNewModal(!showNewModal && false)
 }
    
 function handleNewContainer(){

    const newContainer = {

        containerName: containerName,
        // containerColor: containerName,
    }

    setNewContainer(newContainer);

 }


    return(

    showNewModal && (
        <form className=" absolute bg-red-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 ">
            <div className=" flex justify-between">
            <h1>Name</h1>
            <button onClick={(e)=> {
                e.preventDefault();
                handleNewModal();
            }}>
                <IconSet iconName="close" size={18}></IconSet>
W            </button>
            </div>
            <input type="text" name="projName" id="" onChange={(e)=>{
                setContainerName(e.target.value)
            }} />
       
            <div>
                Container color

                <ul className="flex justify-evenly">
                    <li>fdsfs</li>    
                    <li>fdsfs</li>    
                    <li>fdsfs</li>    
                </ul>                
            </div>
        
            <button className="p-2 bg-red-500" onClick={(e)=>{
                
                e.preventDefault();
                handleNewContainer();
                handleNewModal();

            }}>Create</button>

        </form>
    )
)
}



export {Tag, TabView, StatBlock, ProjectSetModal, ModalNewContainer} 