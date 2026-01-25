import { useState, useEffect } from 'react'
import {Column, Card} from './Column'
import { Modal } from './Modal'
import {Tag, TabView, StatBlock, ModalNewContainer} from './DashAssets'
import './index.css'
import {Header} from './Header'
import type { JobType} from './Types'
import SideNav from './SideNav'
import { IconSet } from './icons/icon'

type CustomContainerT = {
  containerName: string,
  containerColor?: string,
}

function App() {
 const [jobs, setJobs] = useState<JobType[]>([])
 const [editJob, setNewEditJob] = useState<JobType | null>(null)
 const [showModal, setShowModal] = useState<boolean>(false)
 const [showNewModal, setShowNewModal] = useState<boolean>(false)
 const [customContainer, setCustomContainer] = useState<CustomContainerT[]>([])


 function handleContainer(newContainer: CustomContainerT){
  setCustomContainer(prev => [...prev, newContainer])
 }

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

  function handleNewModal(){
  setShowNewModal(!showNewModal? true : false)
 }

function jobStatusTypeCheck(jobStatus: string){
  
  return jobs.some(job => job.status === jobStatus)
 
}

function renderFilteredJob(jobStatus: string){
          
  return jobs.filter(jobs => jobs.status === jobStatus)
      .map(job => ( <Card key={job.id} 
                          job={job} 
                          onDelete={handleDeleteJobs} 
                          onEdit={handleEditJob}></Card>) ) 
}

  return (
  <div className='flex h-screen overflow-hidden bg-main-bgs'>
        
        {showModal &&  
                          
                  
                          <Modal 
                
                          onAddJob={handleJobs} 
                          editingJob={editJob} 
                          updateJob={handleUpdateJob} 
                          cancelJob={handleCancelJob}
                          onAddCustomCol={customContainer}>
                          
                          </Modal>
                    
        }

  <SideNav recentJobs={jobs}></SideNav>
 
  <div className='w-full'>
    
    <Header jobProjName='UX-Hunt 2026' jobProjDetails = {jobs}></Header>
    <TabView data={jobs} jobs={jobs} onShowModal = {handleShowModal}>


  {jobs.length && <div className=' flex gap-8 h-[64vh] justify-center w-full'>
 
                    { jobStatusTypeCheck('ghosted') && <Column color='' name='Ghosted' onShowModal={handleShowModal}>
                                                        { renderFilteredJob('ghosted') }
                                                    </Column> }
  
                    { jobStatusTypeCheck('applied') && <Column color='' name='Applied' onShowModal={handleShowModal}>
                                                        { renderFilteredJob('applied') }
                                                    </Column> }

                    { jobStatusTypeCheck('wishlist') && <Column color='' name='Wished' onShowModal={handleShowModal}>
                                                        { renderFilteredJob('wishlist') }
                                                    </Column> }

                    { jobStatusTypeCheck('interview') && <Column color='' name='Interview' onShowModal={handleShowModal}>
                                                          { renderFilteredJob('interview') }
                                                        </Column> }

                    { jobStatusTypeCheck('offer') && <Column color='' name='Offer' onShowModal={handleShowModal}>
                                                        { renderFilteredJob('offer') }
                                                    </Column> }

                    { jobStatusTypeCheck('rejected') && <Column color='' name='Rejected' onShowModal={handleShowModal}>
                                                        { renderFilteredJob('rejected') }
                                                        </Column> }
                        

                  </div>}
            
          {customContainer.map(container => <Column  name={container.containerName} onShowModal={handleShowModal}></Column>)}
          
          
          <div className=' bg-transparent flex p-2  rounded-[1000px] font-medium'>
          {/* <Column color='' name="" onShowModal={()=> true }> 
          <div className='w-full bg-red-400'></div>
          <button>fgd</button>
          </Column> */}
              <button  className='flex flex-col items-center justify-center text-gray-600' onClick={handleNewModal}>Container
                <IconSet iconName='plus' size={28}></IconSet>
              </button>
          </div>

          
          {  showNewModal &&  <ModalNewContainer setNewContainer={handleContainer}></ModalNewContainer>  }
            
  </TabView>
  </div>
  </div>


  )
}

export default App
