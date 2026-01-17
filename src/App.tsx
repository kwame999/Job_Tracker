import { useState } from 'react'
import {Column, Card} from './Column'
import { Modal } from './Modal'

import './index.css'

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


function App() {
 const [jobs, setJobs] = useState<JobType[]>([])
 const [editJob, setNewEditJob] = useState<JobType | null>(null)
 function handleJobs(newJob: JobType){

    setJobs(previous => [...previous, newJob])

 }

 function handleDeleteJobs(id: string){
  setJobs(previous => previous.filter(job => job.id !== id))
 }

 function handleEditJob(id: string){
  setNewEditJob(
    jobs.find(job => id === job.id) ?? null
  )
 }

 function handleUpdateJob(updatedJob: JobType){
  setJobs(previous => previous.map(job => job.id === updatedJob.id ? updatedJob : job))
  setNewEditJob(null);
 }

 function handleCancelJob(){
  if (editJob) setNewEditJob(null);

 }

  return (
  <>
  <Modal onAddJob={handleJobs} editingJob={editJob} updateJob={handleUpdateJob} cancelJob={handleCancelJob}></Modal>
  
  <Column color='red' name='Active'>
    {jobs.map(job => (
      <Card key={job.id} job={job} onDelete={handleDeleteJobs} onEdit={handleEditJob}></Card>))};
    </Column>
    </>

    // <Column name='Active'>
    // </Column>
  )
}

export default App
