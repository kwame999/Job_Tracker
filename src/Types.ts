import type { ReactNode } from 'react';
import { icons } from './icons/icon';

export type JobType = {
    
    id?: string
    company: string,
    logo_url: string,
    logo_alt: string,
    position: string,
    status: string,
    link?: string,
    salary?: string | number
    mood_txt: string,

}

export type Company = {
    logo: string,
    alt: string
}

//Column Types (Column.tsx):

export type ColumnProps = {

    children?: ReactNode,
    color?: string,
    name: string,
    onShowModal: () => void
    onCurrentCol: (colName: string) => void
}


export type CardProps = {
    job: JobType,
    onDelete: (id: string) => void
    onEdit: (id: string) => void
    showModal: () => void;
}

export type CardPreview = {
    companyName: string,
    jobPosition: string,
    jobcreatedAt: string
    jobSalary: string | number
}

//Dash assets
export type Tags = string
type IconName = keyof typeof icons;

export type StatsBlockProps = {
        svgType: IconName
        statTxt: string,
        svgSize: number
        children?: React.ReactNode,
        data: any

}
//Header assets (DashAssets.tsx)
export type HeaderProps = {
    jobProjName?: string
    jobProjDetails?: JobType[]
    handleNewTag: (tag: Tags[]) => void
    tagTypes: Tags[]
    isCollapsed?: boolean
    
}

//Modal assets (Modal.tsx)
export type State = {
    boarder: string,
};

export type ValueState = {
    value: string | number
};

export type Action = 
      { type: 'EMPTY' }
    | { type: 'ACTIVE' }



//SideNav (SideNav.tsx)
export type SideNavProps = {
    recentJobs: JobType[]

}
//Main modal props
type AddJob = (newJob: JobType) => void;
type UpdateJob = (job: JobType) => void;
type cancelJob = () => void;

export type ModalProps = {
    onAddJob: AddJob,
    editingJob: JobType | null,
    updateJob:  UpdateJob,
    cancelJob: cancelJob
    onAddCustomCol: CustomContainerT[]
    currentCol: string
    onSetCurrentCol: (colName: string) => void
}


export type TabViewProps = {
    children: ReactNode
    data: any
    jobs: JobType[]
    onShowModal: () => void
    tags: Tags[]
    onHandleTab: (currentTab: string) => void
    tabActive: string
 
}

type CustomContainerT = {
  containerName: string,
  containerColor?: string,
}
