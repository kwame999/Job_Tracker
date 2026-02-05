import { useState } from "react"
import type { ColumnProps, CardProps, CardPreview } from './Types'
import { IconSet } from "./icons/icon"
import './index.css'

const Column = ({children, color, name, onShowModal, onCurrentCol}: ColumnProps) => {
    const [more, setMore] = useState(false)
    
    return(
        <div className="flex flex-col shrink-0 min-w-[420px] max-w-[350px] h-full bg-[#F7F7F7] rounded-[16px] border border-black/[0.05] overflow-hidden">
            
            {/* Column Header */}
            <div className="p-4 flex justify-between items-center bg-white border-b border-black/[0.03]">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: color}}></div>
                    <span className="font-bold text-[#1A1A1A] tracking-tight capitalize">{name}</span>
                </div>
                <button onClick={() => setMore(!more)} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                    <IconSet iconName="moreHorizontal" size={20} />
                </button>
            </div>

            {/* Column Area */}
            <div className="flex-1 bg-gray-50 overflow-y-auto p-3 flex flex-col gap-3 custom-scrollbar">
                {children}
            </div>

            {/* Column Buttom / Add Button */}
            <div className="p-3 bg-[#F7F7F7] border-t border-black/[0.02]">
                <button 
                    onClick={()=>{
                        onCurrentCol(name.toLowerCase());
                        onShowModal();
                    }} 
                    className="w-full py-2.5 flex justify-center items-center gap-2 rounded-xl border-2 border-dashed border-black/[0.08] text-black/40 hover:text-black hover:border-black/20 hover:bg-white transition-all font-bold text-sm"
                >
                    <IconSet iconName="plus" size={18} />
                    <span>Add Job</span>
                </button>
            </div>
        </div>
    )
}

const Card = ({job, onDelete, onEdit, showModal}: CardProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {id, company, position, mood_txt, salary, logo_url, logo_alt} = job

    return(
        <section className="flex flex-col bg-white rounded-xl border border-black/[0.05] shadow-sm p-4">
            <div className="flex gap-3 items-center">
                {/* Image area */}
                <img src={logo_url} alt={logo_alt} className="w-12 h-12 rounded-lg object-contain border border-gray-100"/>
                <div className="flex-1 overflow-hidden">
                    {/* Company Name and Top Row Meta */}
                    <p className="font-bold text-[#0A0A0A] truncate">{company}</p>
                    <p className="text-xs font-semibold text-blue-600 truncate">{"Position: " + (position || "-")}</p>
                </div>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <IconSet iconName={!isOpen ? "cheveronDown" : "cheveronUp"} size={16}></IconSet>
                </button>
            </div>

            {/* Meta Row */}
            <div className="flex gap-3 mt-3 overflow-x-auto no-scrollbar">
                {salary && (
                    <div className="flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded">
                         $Salary: {salary || "-"}
                    </div>
                )}
                {/* {createdAt && (
                    <div className="flex items-center gap-1 text-[10px] font-bold bg-gray-50 text-gray-500 px-2 py-1 rounded whitespace-nowrap">
                         {createdAt}
                    </div>
                )} */}
            </div>

            {/* Note Row */}
            {isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-50 space-y-3">
                    <p className="text-xs text-gray-500 italic">"{mood_txt || 'No notes...'}"</p>
                    <div className="flex gap-2">
                        <button className="flex-1 py-1.5 text-xs font-bold bg-gray-100 rounded-lg" onClick={() => {onEdit(id!)
                                                                                                                     showModal()
                        }}>Edit</button>
                        <button className="flex-1 py-1.5 text-xs font-bold bg-red-50 text-red-600 rounded-lg" onClick={() => onDelete(id!)}>Delete</button>
                    </div>
                </div>
            )}
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



export { Column, Card, PreviewCard}