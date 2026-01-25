import { Children, useState, type ReactNode } from "react"
import type { HeaderProps } from './Types'
import { StatBlock } from "./DashAssets"
import { IconSet } from "./icons/icon"
import { Tag } from "./DashAssets"
import './index.css'

const presetBanners = ["./src/banners/default_0.png","imagelink2", "imagelink3"]

const Header = ({jobProjName, jobProjDetails, handleNewTag, tagTypes}: HeaderProps)=> {

    const [crntBanner, setCrntBanner] = useState(presetBanners[0]);
    const [openSettings, setOpenSettings] = useState<boolean>(false)
    const [editContent, setEditContent] =  useState<boolean>(false);
    // const [projName, setProjName] =  useState<boolean>(false);
    
    function handleCrntBanner(e: React.ChangeEvent<HTMLInputElement>){
        setCrntBanner(e.target.value)
    }

    
    function handleSwitch(){
        setOpenSettings(!openSettings ? true : false);
    }

    function handleEdit(){
        setEditContent(!editContent ? true : false);
    }

    return(
        <section className="">
            <div className="flex py-2 px-6 justify-between text-center h-13.25 text-text-header font-bold items-center">
                {/* <img src="czxc" alt="" /> */}

                <div className="flex items-center gap-4">
                    <h1 className="text-lg" contentEditable={ editContent }>{jobProjName}</h1>

                    <button className="" onClick={ handleEdit }>                        
                        <IconSet iconName="edit" size={20}></IconSet>
                    </button>
                </div>

                <button onClick={handleSwitch}>
                    <IconSet iconName="more" size={20}></IconSet>
                </button>
                {/* <svg>s</svg> */}
            </div>

            <div className=" w-full outline-1 outline-main-outline">
                <img src={crntBanner} alt="Gradient Mesh" width="" height="40" className="w-full"/>
                <div className=" bg-neutral-500 w-full h-8"></div>
            </div>

            
            {openSettings &&
            
                <ProjectsSettingsModal>
                    <section className="bg-purple-600 absolute w-fit flex flex-col p-5 rounded-xl">
                        <div className="flex justify-between">                        
                            <h1>Edit Project</h1>
                            <button onClick={handleSwitch}>
                                <IconSet iconName="moon" size={14}></IconSet>
                            </button>
                        </div>
                        <fieldset className="flex flex-col gap-2 ">
                            
                            <div className="flex gap-2  overflow-clip rounded-[100px]
                            ">

                                <input type="radio" name="default" id="" checked={ crntBanner === presetBanners[0] } value={ presetBanners[0] } onChange={(e)=>{
                                    handleCrntBanner(e);
                                }}/>
                                <img src={presetBanners[0]} alt="" width={""} height={100} className="w-100 h-10 rounded-[100px]" />

                            </div>

                            <div className="flex gap-2  overflow-clip rounded-[100px]">

                                <input type="radio" name="default" id="" checked={ crntBanner === presetBanners[1] } value={ presetBanners[1] } onChange={(e)=>{
                                    handleCrntBanner(e);
                                }}/>
                                <img src={presetBanners[0]} alt="" width={""} height={100} className="w-100 h-10 rounded-[100px]" />

                            </div>

                            <div className="flex gap-2  overflow-clip rounded-[100px]">

                                <input type="radio" name="default" id="" checked={ crntBanner === presetBanners[2] } value={ presetBanners[2] } onChange={(e)=>{
                                    handleCrntBanner(e);
                                }}/>
                                <img src={presetBanners[0]} alt="" width={""} height={100} className="w-100 h-10 rounded-[100px]" />

                            </div>
                            
                        </fieldset>
                        <Tag handleNewTag={handleNewTag} tagTypes={tagTypes}></Tag>
                    </section>
            </ProjectsSettingsModal>
            
            }




        </section>
    )

}

type ProjectSettingProp = {
    children: ReactNode
}

const ProjectsSettingsModal = ({children}: ProjectSettingProp) => {


    return(
        <section>
            
            {children}

        </section>
    )
}




export { Header, ProjectsSettingsModal}