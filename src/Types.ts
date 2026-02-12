import type { JSX, ReactNode } from 'react';
import { icons } from './icons/icon';

export type JobType = {
  id?: string;
  company: string;
  logo_url: string;
  logo_alt: string;
  position: string;
  status: string;
  link?: string;
  salary?: string | number;
  mood_txt: string;
};

export type Company = {
  logo: string;
  alt: string;
};

// Column / card types
export type ColumnProps = {
  children?: ReactNode;
  color?: string;
  name: string;
  onShowModal: () => void;
  onCurrentCol: (colName: string) => void;
};

export type CardProps = {
  job: JobType;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  showModal: () => void;
};

export type CardPreview = {
  companyName: string;
  jobPosition: string;
  jobcreatedAt: string;
  jobSalary: string | number;
};

// Shared scalar/utility types
export type Tags = string;

type IconName = keyof typeof icons;

// Dashboard/header/ui types
export type StatsBlockProps = {
  svgType: IconName;
  statTxt: string;
  svgSize: number;
  children?: ReactNode;
  data: any;
};

export type HeaderProps = {
  jobProjName?: string;
  jobProjDetails?: JobType[];
  handleNewTag: (tag: Tags[]) => void;
  tagTypes: Tags[];
  isCollapsed?: boolean;
  isPowerMode?: boolean;
  handlePowerMode?: () => void;
  setCurrentTab?: (tab: string) => void;
};

// Modal types
export type State = {
  boarder: string;
};

export type ValueState = {
  value: string | number;
};

export type Action = { type: 'EMPTY' } | { type: 'ACTIVE' };

export type SideNavProps = {
  recentJobs: JobType[];
  isDark: boolean;
  onToggleTheme: () => void;
};

type AddJob = (newJob: JobType) => void;
type UpdateJob = (job: JobType) => void;
type CancelJob = () => void;

export type ModalProps = {
  onAddJob: AddJob;
  editingJob: JobType | null;
  updateJob: UpdateJob;
  cancelJob: CancelJob;
  onAddCustomCol: CustomContainerT[];
  currentCol: string;
  onSetCurrentCol: (colName: string) => void;
};

export type TabViewProps = {
  children: ReactNode;
  data: any;
  jobs: JobType[];
  onShowModal: () => void;
  tags: Tags[];
  onHandleTab: (currentTab: string) => void;
  tabActive: string;
  isLoading: boolean;
};

export type CustomContainerT = {
  id?: string;
  container_name: string;
  containerColor?: string;
};

export interface DashboardProps {
  // State
  jobs: JobType[];
  isLoading: boolean;
  isPowerMode: boolean;
  tabActive: string;
  tagTypes: Tags[];
  customContainer: CustomContainerT[];
  showNewModal: boolean;

  // Handlers
  handleTab: (tab: string) => void;
  handleShowModal: () => void;
  handleCurrentColumn: (col: string) => void;
  handleNewModal: () => void;
  handleContainer: (container: CustomContainerT) => void;
  handleSetTags: (newTag: Tags[]) => void;
  handlePowerMode: () => void;

  // Logic helpers
  renderFilteredJob: (status: string) => JSX.Element[]
  jobStatusTypeCheck: (status: string) => boolean
}


// Shared sub-component props
export type ProjectSettingProp = {
  children: ReactNode;
  onClose: () => void;
};

export type ModalNewContainerProps = {
  setNewContainer: (container: CustomContainerT) => void;
};

export type StatCardProps = {
  label: string;
  value: number | string;
};

export type ChatMessage = {
  role: 'user' | 'coach';
  text: string;
};

export type ChatPageProps = {
  jobsData: JobType[];
  isPowerMode?: boolean;
};
