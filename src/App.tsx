import { useState, useEffect } from 'react'
import {Column, Card} from './Column'
import { Modal } from './Modal'
import {Tag, TabView, StatBlock, ModalNewContainer} from './DashAssets'
import './index.css'
import {Header} from './Header'
import type { JobType, Tags } from './Types'
import SideNav from './SideNav'
import { IconSet } from './icons/icon'
import supabase from './lib/supabaseClient'
type CustomContainerT = {
  containerName: string,
  containerColor?: string,
}
// console.log(supabase)
function App() {

  
 const [jobs, setJobs] = useState<JobType[]>([])
 const [editJob, setNewEditJob] = useState<JobType | null>(null)
 const [showModal, setShowModal] = useState<boolean>(false)
 const [showNewModal, setShowNewModal] = useState<boolean>(false)
 const [customContainer, setCustomContainer] = useState<CustomContainerT[]>([])
 const [tagTypes, setTagTypes] = useState<Tags[]>([]);
 const [tabActive, setTabActive] = useState<string>('Dashboard');
 const [currentColumn, setCurrentColumn] = useState<string>('wishlist');

 useEffect(() => {
  localStorage.setItem('Jobs', JSON.stringify(jobs));
 },[jobs]);

 useEffect(()=>{

  const datas = async () => {
    const {data, error} = await supabase
    .from('jobs')
    .select('*');

  if (error) {
      console.log('Error fetching:', error)
    } else {
      console.log('My Jobs:', data)
      setJobs(data)
    }

  }

  datas()
 },[])
 
  
 function handleContainer(newContainer: CustomContainerT){
  setCustomContainer(prev => [...prev, newContainer])
 }

 function handleJobs(newJob: JobType){
    setJobs(previous => [...previous, newJob])
 }

 async function handleDeleteJobs(id: string) {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id)
    .select() 

  if (error) {
    console.error('Delete failed:', error.message);
  } else {
    setJobs(prev => prev.filter(job => job.id !== id));

  }
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
                          onEdit={handleEditJob}
                          showModal={handleShowModal}></Card>) ) 
}

function handleSetTags(newTag: Tags[]){

  setTagTypes(newTag)
}

function handleTab(currentTab: string){
  setTabActive(currentTab)
}

function handleCurrentColumn(colName: string){
  setCurrentColumn(colName)
}

  return (
  <div className='flex h-screen overflow-hidden bg-main-bgs'>
        
        {showModal &&  
                          
                  
                          <Modal 
                          onAddJob={handleJobs} 
                          editingJob={editJob} 
                          updateJob={handleUpdateJob} 
                          cancelJob={handleCancelJob}
                          onAddCustomCol={customContainer}
                          currentCol={currentColumn}
                          onSetCurrentCol={handleCurrentColumn}>
                          </Modal>
                    
        }

  <SideNav recentJobs={jobs}></SideNav>
 
  <div className='flex-1 min-w-0 flex flex-col overflow-hidden'>
    
    <Header jobProjName='UX-Hunt 2026' isCollapsed={tabActive === 'Kanban View'}  jobProjDetails = {jobs} handleNewTag = {handleSetTags} tagTypes={tagTypes}></Header>
    <TabView data={jobs} jobs={jobs} onShowModal = {handleShowModal} tags={tagTypes} onHandleTab={handleTab} tabActive= {tabActive}>


  {jobs.length && <div className=' flex gap-8 h-full justify-center'>
 
                    { jobStatusTypeCheck('ghosted') && <Column name='Ghosted' onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                        { renderFilteredJob('ghosted') }
                                                    </Column> }
  
                    { jobStatusTypeCheck('applied') && <Column name='Applied' onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                        { renderFilteredJob('applied') }
                                                    </Column> }

                    { jobStatusTypeCheck('wishlist') && <Column name='Wishlist' onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                        { renderFilteredJob('wishlist') }
                                                    </Column> }

                    { jobStatusTypeCheck('interview') && <Column name='Interview' onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                          { renderFilteredJob('interview') }
                                                        </Column> }

                    { jobStatusTypeCheck('offer') && <Column name='Offer' onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                        { renderFilteredJob('offer') }
                                                    </Column> }

                    { jobStatusTypeCheck('rejected') && <Column name='Rejected' onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                        { renderFilteredJob('rejected') }
                                                        </Column> }
                        
                    {/* {jobs.map(job => jobStatusTypeCheck(job.status) && <Column name={job.status} onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                                       { renderFilteredJob(job.status)}
                                                                       </Column>)} */}
                    {customContainer.map(container => <Column  name={container.containerName} onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                      {renderFilteredJob(container.containerName.toLowerCase())}
                                                      </Column>)}
                    
                  </div>}
            
          
          <div className=' bg-transparent flex p-2  rounded-[1000px] font-medium ml-auto justify-center items-center bg-red-600 h-full'>
              <button onClick={handleNewModal} 
                      className='flex flex-col items-center justify-center text-gray-400 hover:text-black transition-colors'>
                
                      <div className='w-12 h-12 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-1'>
                        <IconSet iconName='plus' size={28}></IconSet>
                      </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Column</span>
              </button>
          </div>

          
          {  showNewModal &&  <ModalNewContainer setNewContainer={handleContainer}></ModalNewContainer>  }
            
  </TabView>
  </div>
  </div>


  )
}

export default App
