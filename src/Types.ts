import type { ReactNode } from 'react';

export type JobType = {
    
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

export type Company = {
    logo: string,
    alt: string
}

//Column Types (Column.tsx):

export type ColumnProps = {

    children?: ReactNode,
    color?: string,
    name: string,
}


export type CardProps = {
    job: JobType,
    onDelete: (id: string) => void
    onEdit: (id: string) => void
}

export type CardPreview = {
    companyName: string,
    jobPosition: string,
    jobLink: string
}

//Dash assets
export type Tags = string

export type StatsBlockProps = {
        svgType: string,
        statTxt: string,
        children: React.ReactNode
}
//Header assets (DashAssets.tsx)
export type HeaderProps = {
    jobProjName: string
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
}


