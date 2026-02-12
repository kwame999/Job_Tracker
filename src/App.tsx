import { useState, useEffect } from 'react';
import { Card } from './Column';
import { Modal } from './Modal';
import './index.css';
import type { JobType, Tags, CustomContainerT } from './Types';
import SideNav from './SideNav';
import supabase from './lib/supabaseClient';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';

function App() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [editJob, setNewEditJob] = useState<JobType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [customContainer, setCustomContainer] = useState<CustomContainerT[]>(
    [],
  );
  const [tagTypes, setTagTypes] = useState<Tags[]>([]);
  const [tabActive, setTabActive] = useState<string>('Dashboard');
  const [currentColumn, setCurrentColumn] = useState<string>('wishlist');
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isPowerMode, setIsPowerMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    const jobsData = async () => {
      const { data, error } = await supabase.from('jobs').select('*');

      setisLoading(isLoading);

      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data);
        setisLoading(!isLoading);
      }
    };

    const containerData = async () => {
      const { data, error } = await supabase.from('containers').select('*');

      setisLoading(isLoading);

      if (error) {
        console.error('Error fetching containers:', error);
      } else {
        setCustomContainer(data);
        setisLoading(!isLoading);
      }
    };

    jobsData();
    containerData();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [isDark, theme]);

  function handleContainer(newContainer: CustomContainerT) {
    setCustomContainer((prev) => [...prev, newContainer]);
  }

  function handleJobs(newJob: JobType) {
    setJobs((previous) => [...previous, newJob]);
  }

  async function handleDeleteJobs(id: string) {
    const { error } = await supabase.from('jobs').delete().eq('id', id);

    setisLoading(true);

    if (error) {
      console.error('Delete failed:', error.message);
    } else {
      setJobs((prev) => prev.filter((job) => job.id !== id));
      setisLoading(false);
    }
  }

  function handleEditJob(id: string) {
    setNewEditJob(jobs.find((job) => id === job.id) ?? null);
  }

  function handleUpdateJob(updatedJob: JobType) {
    setJobs((previous) =>
      previous.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    );
    setNewEditJob(null);
  }

  function handleCancelJob() {
    if (editJob) setNewEditJob(null);
    handleShowModal();
  }

  function handleShowModal() {
    setShowModal(!showModal ? true : false);
  }

  function handleNewModal() {
    setShowNewModal(!showNewModal ? true : false);
  }

  function jobStatusTypeCheck(jobStatus: string) {
    return jobs.some((job) => job.status === jobStatus);
  }

  function renderFilteredJob(jobStatus: string) {
    return jobs
      .filter((jobs) => jobs.status === jobStatus)
      .map((job) => (
        <Card
          key={job.id}
          job={job}
          onDelete={handleDeleteJobs}
          onEdit={handleEditJob}
          showModal={handleShowModal}
        ></Card>
      ));
  }

  function handleSetTags(newTag: Tags[]) {
    setTagTypes(newTag);
  }

  function handleTab(currentTab: string) {
    setTabActive(currentTab);
  }

  function handleCurrentColumn(colName: string) {
    setCurrentColumn(colName);
  }

  function handleSetPowerMode() {
    setIsPowerMode(!isPowerMode ? true : false);
  }

  return (
    <BrowserRouter>
      <div
        className={`flex h-screen overflow-hidden ${isDark ? 'bg-[#0F1115] text-gray-100' : 'bg-main-bgs text-black'}`}
      >
        {showModal && (
          <Modal
            onAddJob={handleJobs}
            editingJob={editJob}
            updateJob={handleUpdateJob}
            cancelJob={handleCancelJob}
            onAddCustomCol={customContainer}
            currentCol={currentColumn}
            onSetCurrentCol={handleCurrentColumn}
          ></Modal>
        )}

        <SideNav
          recentJobs={jobs}
          isDark={isDark}
          onToggleTheme={() =>
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
        />

        <div className='flex-1 min-w-0 flex flex-col overflow-hidden '>
          <Routes>
            <Route
              path='/'
              element={
                <Dashboard
                  jobs={jobs}
                  isLoading={isLoading}
                  tabActive={tabActive}
                  tagTypes={tagTypes}
                  customContainer={customContainer}
                  showNewModal={showNewModal}
                  handleTab={handleTab}
                  handleShowModal={handleShowModal}
                  handleCurrentColumn={handleCurrentColumn}
                  handleNewModal={handleNewModal}
                  handleContainer={handleContainer}
                  renderFilteredJob={renderFilteredJob}
                  jobStatusTypeCheck={jobStatusTypeCheck}
                  handleSetTags={handleSetTags}
                  isPowerMode={isPowerMode}
                  handlePowerMode={handleSetPowerMode}
                />
              }
            ></Route>

            <Route path='/chat' element={<ChatPage jobsData={jobs} />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
