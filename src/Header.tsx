import { Children, useState, type ReactNode, useEffect } from "react"
import type { HeaderProps } from './Types'
import { StatBlock } from "./DashAssets"
import { IconSet } from "./icons/icon"
import { Tag } from "./DashAssets"
import './index.css'


//  Gradient strings
const presetBanners = [
    "bg-gradient-to-tr from-[#FFD1FF] via-[#FAD0C4] to-[#D2E9FF]", // Soft Mesh
    "bg-gradient-to-r from-[#84fab0] to-[#8fd3f4]",               // Fresh Mint
    "bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb]"               // Sky Blue
]

const Header = ({jobProjName, jobProjDetails, handleNewTag, tagTypes, isCollapsed, isPowerMode, handlePowerMode, setCurrentTab}: HeaderProps)=> {

    const [crntBanner, setCrntBanner] = useState(()=> {
        const currentBanner = localStorage.getItem('Banner');
        return currentBanner ? currentBanner : presetBanners[0]

    });
    const [openSettings, setOpenSettings] = useState<boolean>(false)
    const [editContent, setEditContent] =  useState<boolean>(false);
    
    useEffect(()=>{
        localStorage.setItem('Banner', crntBanner);
    },[crntBanner]);

    function handleCrntBanner(e: React.ChangeEvent<HTMLInputElement>){
        setCrntBanner(e.target.value)
    }
    
    function handleSwitch(){
        setOpenSettings(!openSettings);
    }

    function handleEdit(){
        setEditContent(!editContent);
    }
    
    isPowerMode && setCurrentTab?.('')

    return(
        <section className="bg-gray-50 border-b border-black/[0.06]">
            {/* Top Bar */}
            <div className="flex py-3 px-8 justify-between items-center h-[60px]">
                <div className="flex items-center gap-3">
                    <h1 
                        className={`text-lg font-bold text-[#0A0A0A] outline-none px-2 rounded-md transition-all ${editContent ? 'bg-black/[0.04] ring-1 ring-black/[0.1]' : ''}`} 
                        contentEditable={ editContent }
                        suppressContentEditableWarning={true}
                    >
                        { jobProjName }
                    </h1>

                    <button 
                        className="p-2 hover:bg-black/[0.04] rounded-lg transition-colors text-black/30 hover:text-black" 
                        onClick={ handleEdit }
                    >                        
                        <IconSet iconName="edit" size={18} />
                    </button>
                </div>

                    <div className="flex gap-4 outline-1 rounded-md outline-gray-300 px-1 py-0.5  dropshadow-sm">
                        <button className={`p-1 hover:bg-black/[0.08] rounded-md transition-colors flex justify-center items-center ${isPowerMode && 'bg-black/[0.08]'}`}
                                onClick={handlePowerMode}
                        >
                            {!isPowerMode ? <IconSet iconName='zen' size={18}></IconSet> : <IconSet iconName="power" size={22}></IconSet>}
                        </button>

                        <button 
                            onClick={ handleSwitch }
                            className="px-1 hover:bg-black/[0.08] rounded-md transition-colors flex justify-center items-center">
                            <IconSet iconName="more" size={15} />
                        </button>
                </div>
            </div>

            {/* Banner Section: When isCollapsed, image is shown else not*/}
            <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out border-y border-black/[0.03] ${
                        (isCollapsed || isPowerMode) ? 'h-0 opacity-0' : 'h-[120px] opacity-100'
                }`}>
                {/* Banner */}
                <div className={`w-full h-[120px] relative ${crntBanner}`}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
                    {/* <div className=" absolute -right-px bottom-px hover:bg-white/80 p-2 bg-white/20 rounded-full mb-2 mr-8">
                        <IconSet iconName='editPencil' size={20}></IconSet>
                    </div> */}
                </div>
            </div>

            {/* Settings Modal */}
            {openSettings &&
                <ProjectsSettingsModal onClose={handleSwitch}>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">                        
                            <h2 className="text-xl font-bold text-[#0A0A0A]">Project Appearance</h2>
                            <button onClick={handleSwitch} className="p-1 hover:bg-gray-100 rounded-full">
                                <IconSet iconName="close" size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="text-[13px] font-semibold text-black/50 capitalize tracking-wider">Your Banner:</label>
                            <fieldset className="flex flex-col gap-3">
                                {presetBanners.map((bannerClass, index) => (
                                    <label 
                                        key={index}
                                        className={`flex items-center gap-3 p-1 rounded-xl border-2 transition-all ${crntBanner === bannerClass ? 'border-black/[0.1] bg-black/[0.02]' : 'border-transparent hover:bg-gray-50'}`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="banner" 
                                            className="hidden" 
                                            checked={ crntBanner === bannerClass } 
                                            value={ bannerClass } 
                                            onChange={handleCrntBanner}
                                        />
                                        <div className={`w-full h-12 rounded-lg border border-black/5 ${bannerClass} shadow-sm`}></div>
                                    </label>
                                ))}
                            </fieldset>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                            <Tag handleNewTag={handleNewTag} tagTypes={tagTypes}></Tag>
                        </div>
                    </div>
                </ProjectsSettingsModal>
            }
        </section>
    )
}

type ProjectSettingProp = {
    children: ReactNode;
    onClose: () => void;
}

const ProjectsSettingsModal = ({children, onClose}: ProjectSettingProp) => {
    return(
        <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1001]" onClick={onClose} />
            <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[400px] p-8 rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-[1002] animate-in zoom-in-95 duration-200">
                {children}
            </section>
        </>
    )
}




export { Header, ProjectsSettingsModal}