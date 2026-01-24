import { useState } from 'react'
import {Column, Card} from './Column'
import { Modal } from './Modal'
import {Tag, TabView, StatBlock} from './DashAssets'
import './index.css'
import {Header} from './Header'
import type { JobType} from './Types'
import SideNav from './SideNav'


function App() {
 const [jobs, setJobs] = useState<JobType[]>([])
 const [editJob, setNewEditJob] = useState<JobType | null>(null)
 const [showModal, setShowModal] = useState<boolean>(false)
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
  handleShowModal()

 }

 function handleShowModal(){
  setShowModal(!showModal? true : false)
 }

 

  return (
  <div className='flex h-screen overflow-hidden bg-main-bgs'>
  {showModal &&  
                    
                    <>
                    <Modal 
          
                    onAddJob={handleJobs} 
                    editingJob={editJob} 
                    updateJob={handleUpdateJob} 
                    cancelJob={handleCancelJob}>

                    </Modal>
                    <div className='bg-black/50 p-40 absolute w-full h-full backdrop-blur-[1px] flex justify-center items-center'></div>
                    </>

               

}
  <SideNav recentJobs={jobs}></SideNav>
 
  <div className='w-full'>
    
  <Header jobProjName='UX-Hunt 2026' jobProjDetails = {jobs}></Header>


  
  <TabView data={jobs} jobs={jobs} onShowModal = {handleShowModal}>

    
  {jobs.length > 0 && <div className=' flex gap-8 h-[64vh] justify-center w-full'>
  <Column color='' name='Active' onShowModal={handleShowModal}>
    {jobs.map(job => (<Card key={job.id} job={job} onDelete={handleDeleteJobs} onEdit={handleEditJob}></Card>))};
  </Column>

  <Column color='red' name='Waiting' onShowModal={handleShowModal}>
      {jobs.map(job => ( <Card key={job.id} job={job} onDelete={handleDeleteJobs} onEdit={handleEditJob}></Card>))};
  </Column>

  <Column color='pink' name='Ghosted' onShowModal={handleShowModal}>
  {jobs.map(job => (<Card key={job.id} job={job} onDelete={handleDeleteJobs} onEdit={handleEditJob}></Card>))};
    </Column>
    </div>
    }
    
  </TabView>

      {/* <Tag/>
      
      <p className='bg-twitter-blue'>sadada

      </p> */}
    </div>
   </div>

    // <Column name='Active'>
    // </Column>
  )
}

export default App
