import { useState } from "react"

type JobType = {
    
    id: string,
    company: string,
    companyIcon: Company,
    position: string,
    status: string,
    link?: string,
    createdAt: string,
    rating?: number,
    moodTxt: string,
    favorites: boolean,
}


type Company = {
    logo: string,
    alt: string
}


type SideNavProps = {
    recentJobs: JobType[]

}


const SideNav = ({recentJobs}:SideNavProps) => {

    const [modeIcon, setModeIcon] = useState<boolean>(false)
    const [isExpanded, isSetExpanded] = useState<boolean>(false);

    function handleSwitch(){
        setModeIcon(!modeIcon ? true : false);
    }

    function handleSwitchNav(){
        isSetExpanded(!isExpanded ? true : false);
    }

    return(

        <aside onClick={handleSwitchNav}><div><svg>xx</svg>
            
            {isExpanded && <h3>Dashboard</h3>}</div>
            {isExpanded && <nav> 
                                <ul>
                                    <li>Tracked Jobs:</li>{recentJobs.map(job =>  <li>{job.company}</li> )}
                                </ul> 
                          </nav>}
            <button onClick={ handleSwitch }>{ !modeIcon ? <svg>sun</svg> : <svg>Moon</svg> }</button>

        </aside>
        
    )

}

export default SideNav