import type { DashboardProps } from "../Types"
import { Header } from "../Header"
import { TabView } from "../DashAssets"
import { Column } from "../Column"
import { IconSet } from "../icons/icon"
import { ModalNewContainer } from "../DashAssets"
import ChatPage from "./ChatPage"
 
const Dashboard = ({
  jobs,
  isLoading,
  isPowerMode,
  tabActive,
  tagTypes,
  customContainer,
  showNewModal,
  handleTab,
  handleShowModal,
  handleCurrentColumn,
  handleNewModal,
  handleContainer,
  handleSetTags,
  handlePowerMode,
  renderFilteredJob,
  jobStatusTypeCheck,
 }: DashboardProps) =>{
   
    return(
        <div className="flex h-full overflow-hidden ">
            {isPowerMode &&
            <div className="w-[22%] h-full border-gray-100 flex flex-col overflow-hidden">
            <ChatPage jobsData={jobs} isPowerMode={isPowerMode}></ChatPage>
            </div>}

            <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">   
                <Header jobProjName='UX-Hunt 2026' isCollapsed={tabActive === 'Kanban View'} isPowerMode={isPowerMode} handlePowerMode={handlePowerMode} jobProjDetails = {jobs} handleNewTag = {handleSetTags} tagTypes={tagTypes} ></Header>

                <TabView data={jobs} jobs={jobs} onShowModal = {handleShowModal} tags={tagTypes} onHandleTab={handleTab} tabActive= {tabActive} isLoading={isLoading}>


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
                                    {customContainer.map(({container_name, id}) => <Column key={id} name={container_name} onShowModal={handleShowModal} onCurrentCol={handleCurrentColumn}>
                                                                    {renderFilteredJob(container_name.toLowerCase())}
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

export default Dashboard

