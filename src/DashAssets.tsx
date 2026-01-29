import { useState, type ReactNode } from "react"
import type { Tags, StatsBlockProps, HeaderProps} from './Types'
import { IconSet } from "./icons/icon";
import './index.css'
import type { TabViewProps } from "./Types";


const Tag = ({handleNewTag, tagTypes}: HeaderProps) => {

    const [tag, setTag] = useState<string>("");

    function handleTag(){
        if(tagTypes.length > 4 || tag === "") return
        handleNewTag([tag, ...tagTypes])
        setTag("")
    }

    function handleDeleteTag(id: number){
        handleNewTag( tagTypes.filter((tags, indx) => indx !== id))
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
                <input className="ml-auto" 
                       type="text"
                       value={tag} 
                       onChange={(e)=>{ setTag(e.target.value)}} 
                       onKeyDown={(e)=>{ if(e.key === 'Enter') handleTag(); }}/>
            </div>
            </>
             {tagTypes.length > 4 && <p className="text-blue-500">Cannot set more than {tagTypes.length} tags</p>}              
        </div>
    )

}



const TabView = ({children, data, jobs, onShowModal, tags, onHandleTab, tabActive}: TabViewProps) => {

    const tabItems: string[] = ["Dashboard", "Kanban View"];
    
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="px-8 py-4">
                <div className="flex justify-between items-end">
                    {/* Stats Section */}
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-8'>
                            <StatBlock svgType='clock' svgSize={22} statTxt='Created' data={new Date().toLocaleDateString()} />
                            <StatBlock svgType='calender2' svgSize={24} statTxt='Jobs Tracked' data={data.length || <span className="text-sm font-medium text-black/20 italic ">0 tracked</span>} />
                        </div>
                            <StatBlock svgType='tags' 
                                       svgSize={22} 
                                       statTxt='Active Tags' 
                                       data={tags.length > 0 ? tags.map((tag, indx) => (
                                            <div key={indx} className="px-2.5 py-0.5 bg-black/[0.03] border border-black/[0.09] rounded-lg text-[11px] font-bold text-black/60 ">
                                                {tag}
                                            </div>
                                )) : <span className="text-sm font-medium text-black/20 italic ">No tags set...</span>} />
                        
                        {/* Tags Section */}
                        {/* <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-black/20  tracking-[0.15em]">Active Tags</span>
                            <div className="flex gap-2">
                                {tags.length > 0 ? tags.map((tag, indx) => (
                                    <div key={indx} className="px-2.5 py-0.5 bg-black/[0.03] border border-black/[0.05] rounded-full text-[11px] font-bold text-black/60 shadow-sm">
                                        {tag}
                                    </div>
                                )) : <span className="text-[10px] text-black/20 italic font-medium">No tags set...</span>}
                            </div>
                        </div> */}
                    </div>

                    {/* Tab Switcher */}
                    <nav className="relative flex bg-[#EFEFEF] p-1 rounded-xl border border-black/[0.04] shadow-inner">
                        {tabItems.map((tab) => {
                            const isActive = tabActive === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => onHandleTab(tab)}
                                   
                                    className={`relative z-10 px-4 py-1.5 text-[12px] font-bold transition-all duration-300 rounded-lg ${
                                        isActive ? 'text-[#0A0A0A]' : 'text-black/40 hover:text-black/60'
                                    }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] -z-10 animate-in fade-in zoom-in-95 duration-200" />
                                    )}
                                    {tab}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Viewport Area  */}
<div className="flex-1 min-h-0 overflow-hidden">
    {jobs.length ? (
        <div className="h-full flex gap-7 overflow-x-auto px-8 pb-8 justify-start items-start custom-scrollbar">
            {children}
        </div>
    ) : (
    
        <div className="mx-8 flex flex-col w-auto items-center justify-center border-2 border-dashed rounded-[24px] py-12 h-full border-black/[0.05] bg-gray-50/40 transition-all"> 
            <img 
                src="/src/assets/flat-briefcase-icon-by-Vexels 1.png" 
                alt="Empty Workspace" 
                className="w-48 opacity-15 grayscale mb-6 select-none" 
            />
            <div className="text-center flex flex-col items-center">
                <h2 className="text-1xl font-black text-[#0A0A0A] tracking-tight mb-2 ">
                    Tracker empty
                </h2>
                <p className="text-[14px] text-black/40 font-medium mb-10 max-w-[320px] leading-relaxed">
                    Start your journey by tracking your first application to see your dashboard come to life.
                </p>
                
                <button 
                    className="bg-[#e6e6e6] text-white px-4 py-4 rounded-full text-[13px] font-black uppercase tracking-widest shadow-lg hover:bg-gray-800 hover:scale-[1.02] active:scale-95 transition-all" 
                    onClick={onShowModal}
                >
                    <IconSet iconName="plus" size={23}></IconSet>
                </button>
            </div>
        </div>
    )}
</div>
        </div>
    );
};


const StatBlock = ({svgType,svgSize, statTxt, children, data}: StatsBlockProps) => {
    return(
        <div>
            <div className="flex items-center gap-1">
            <IconSet iconName={svgType} size={svgSize}></IconSet>
            <p className="text-sm font-bold  text-black/30 tracking-wide">{statTxt}:</p>
            <p className="text-sm font-bold text-black/60 ">{data || children}</p> 
            
            </div>
            {/* {children} */}
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