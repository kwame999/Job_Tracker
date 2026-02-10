import { useEffect, useState } from "react"
import type { SideNavProps } from './Types'
import {IconSet} from "./icons/icon"
import './index.css'
import { Link } from "react-router-dom"

const SideNav = ({recentJobs}:SideNavProps) => {

    const [modeIcon, setModeIcon] = useState<boolean>(false)
    const [isExpanded, isSetExpanded] = useState<boolean>(()=>{
        const getSide = localStorage.getItem('sideNav')
        return JSON.parse(getSide!)
    });
    
    useEffect(()=>{
        localStorage.setItem('sideNav', JSON.stringify(isExpanded))
    }, [isExpanded]);


    function handleSwitch(e: React.MouseEvent){
        e.stopPropagation(); 
        setModeIcon(!modeIcon ? true : false);
    }

    
    function handleSwitchNav(e: React.MouseEvent){
        e.stopPropagation();
        isSetExpanded(!isExpanded ? true : false);
    }

    return(
        <aside 
            className={`
                flex flex-col h-screen pt-[20px] pb-[20px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                bg-gray-50 border-r border-black/[0.1] shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]
                relative overflow-hidden select-none resize-none
                ${isExpanded ? "w-[240px]" : "w-[50px] cursor-ew-resize"}
            `}
            onClick={() => !isExpanded && isSetExpanded(true)}
        >
            {/* Top Icon (Bar-Left) */}
            <div className={`px-[12px] ${isExpanded && 'px-[20px]'} w-full flex justify-between mb-2`}>
                
                {isExpanded && <h3 className="font-bold text-lg text-black/80">JTrack</h3> }
                <div 
                    onClick={handleSwitchNav}
                    className={`
                        flex items-center justify-center w-[26px] h-[26px] 
                        transition-transform hover:scale-110 active:scale-95
                        ${isExpanded ? "cursor-ew-resize" : "cursor-pointer"}
                        `}
                        >
                    <IconSet iconName="barleft" size={24}/>
                </div>
            </div>
                { isExpanded && <hr className="text-black/10 we"/>}

            {/* Dashboard Text & Content */}
            {isExpanded && (
                <div className="mt-5 px-[18px] w-full animate-in fade-in slide-in-from-top-2 duration-400">
                    {/* <h3 className="font-bold text-base text-black/80 mb-8">Dashboard</h3> */}
                        <div className="flex flex-col gap-1">
                                <Link to="/" className="hover:bg-gray-100 rounded-lg w-full p-2.5 text-[14px] flex gap-2 items-center">
                                    <IconSet iconName="tags" size={24}></IconSet>                    
                                    <p>Dashboard</p>

                                </Link>
                          
                                <Link to="/chat" className="hover:bg-gray-100 rounded-lg w-full p-2.5 text-[14px] flex gap-3 items-center">
                                    <IconSet iconName="sparkle" size={20}></IconSet>                    
                                    <p>AI Coach</p>
                                </Link>
                        
                        </div>
                    <nav onClick={(e) => e.stopPropagation()}> 
                        <ul className="flex flex-col gap-4">
                            <li className="text-[10px] font-bold text-black/30 uppercase tracking-[0.15em] mt-8">Tracked Jobs:</li>
                            {recentJobs.map((job, i) => (
                                <li key={i} className="text-sm font-medium text-black/60 hover:text-black cursor-pointer truncate transition-colors">
                                    {job.company}
                                </li>
                            ))}
                        </ul> 
                    </nav>
                </div>
            )}

            {/* Theme Toggle */}
            <div className="mt-auto px-[12px] w-full">
                <button 
                    className="flex items-center justify-center w-[26px] h-[40px] hover:bg-black/[0.04] rounded-md transition-all active:scale-90"
                    onClick={handleSwitch}
                >
                    <div className="transition-transform duration-200">
                        { !modeIcon ? <IconSet iconName="sun" size={22}/> : <IconSet iconName="moon" size={22}/> }
                    </div>
                </button>
            </div>
        </aside>
    )
}
export default SideNav