import { useState } from "react"
import type { ColumnProps, CardProps, CardPreview } from './Types'
import { IconSet } from "./icons/icon"
import './index.css'

const Column = ({children, color, name = "grey", onShowModal}: ColumnProps) => {

    const [more, setMore] = useState(false)
    
    function handleMore(){

        setMore(!more ? true : false);
    } 
    
    return(
        <div className="flex flex-col h-full overflow-hidden bg-custom-fade  rounded-t-2xl rounded-b[18px] outline-2 outline-main-outline  drop-shadow-lg">
        <section className=" overflow-hidden p-3 relative" style={{backgroundColor: color}} >

            { more &&  <ColumnOnMore/>}

            <div className="flex justify-between mb-2.5 font-bold tracking-wide">{name}
               
                <button className="" onClick={ handleMore }>  
                    <IconSet iconName="moreHorizontal" size={24}></IconSet> 
                </button>

            </div>
            <div className="flex flex-col overflow-auto h-full ">
                {children}
            </div>

        </section>
            <div className="outline-2">
                <button onClick={onShowModal} className="flex justify-center-safe w-full sticky ">

                    <IconSet iconName="plus" size={24}></IconSet>
                </button>
            </div>        
        </div>
        
    )

}

const Card = ({job, onDelete, onEdit}: CardProps) => {
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {id, company, position, link, status, moodTxt, createdAt, salary, companyIcon: {logo, alt}} = job
    function handleOpen(){
        setIsOpen( !isOpen ? true : false );
    }
    
    return(
        <section className="flex flex-col rounded-xl min-w-134.5">
            
            <div className="flex p-3 bg-card-main rounded-xl w-full text-text-header2 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.17)]">
            <img src={logo} alt={alt} width={55} className="rounded-lg mr-3 outline-1 outline-main-outline"/>
                    <div className="flex  flex-col justify-center w-full">
                        <p className=" font-bold text-md ml-1 text-text-header mb-sm tracking-wider">{company}</p>
                        
                        <div className="flex gap-5 text-sm">
                            <IconSet iconName="user" size={18}>
                                <p><span className=" font-semibold tracking-wide text-text-header">Position: </span>{position}</p>
                            </IconSet>

                            {salary &&
                            
                            <IconSet iconName="money" size={18}>
                                <p><span className="font-semibold text-text-header tracking-wide">Salary: </span>{salary}</p>
                            </IconSet>
                            
                            }

                            {createdAt &&
                            
                            <IconSet iconName="calender" size={18}>
                                <p><span className="font-semibold text-text-header tracking-wide">Applied: </span>{createdAt}</p>
                            </IconSet>
                            
                            }

                        <button onClick={ handleOpen } className="ml-auto">
                            { !isOpen ? <IconSet iconName="cheveronDown" size={16}></IconSet> :
                              <IconSet iconName="cheveronUp" size={16}></IconSet>
                            }
                        </button>

                        </div>
                    </div>
            </div>
                    <div>
                        <button onClick={ ()=> {onDelete(id)} }>Delete</button>
                        <button onClick={ ()=> {onEdit(id)} }>Edit</button>
                    </div>

                    
  

            {isOpen && 
                <>
                    <p>Link:{link}</p>
                    <p>Applied:{createdAt}</p>
                    <p>Status:{status}</p>
                    <p>Mood:{moodTxt}</p>
                    <p>Salary:{salary}</p>
                    
                </>
            }

        </section>
    )


}

const PreviewCard = ({companyName, jobPosition, jobcreatedAt, jobSalary}: CardPreview) => {
    // const {icon} = companyIcon
    return(
        <section className="flex w-full bg-card-main outline-gray-300 outline-1 items-center p-3 gap-4 rounded-lg mt-4 mb-8 overflow-clip shadow-[0px_4px_12px_0px_rgba(0,0,0,0.17)]">
            <img src={`https://img.logo.dev/${companyName}.com?token=pk_RKtwoXuaQDSJdIEDV1NYVA`} alt="" width={55} className="rounded-lg"/>
                <div className="flex  flex-col">
                    <p className="font-bold text-lg  w-100">{companyName}</p>
                    <div className="flex justify-between gap-5">

                        { jobPosition && <p><span className="font-medium">Position:</span>{jobPosition}</p> }
                        { jobSalary &&  <p><span className="font-medium">Salary:</span>{jobSalary}</p> }
                        { jobcreatedAt &&  <p><span className="font-medium">Applied::</span>{jobcreatedAt}</p> }
                       
                    
                    </div>
                </div>  
        </section>
    )

}


const ColumnOnMore = () => {

    return(
        <form className=" absolute bg-pink-400 right-3 top-8 p-2 rounded-sm">
            <p>Change theme</p>
            <input type="radio" name="" id="" />
            <input type="radio" name="" id="" />
            <input type="radio" name="" id="" />
        </form>


    )
}


export { Column, Card, PreviewCard}