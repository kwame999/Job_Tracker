import { useState } from 'react';
import type { ColumnProps, CardProps, CardPreview } from './Types';
import { IconSet } from './icons/icon';
import './index.css';

const Column = ({
  children,
  color,
  name,
  onShowModal,
  onCurrentCol,
}: ColumnProps) => {
  const [more, setMore] = useState(false);

  return (
    <div className='app-column flex flex-col shrink-0 min-w-[420px] max-w-[350px] h-fit max-h-full rounded-[16px] app-border overflow-hidden'>
      {/* Column Header */}
      <div className='app-column-header p-4 flex justify-between items-center border-b app-border'>
        <div className='flex items-center gap-2'>
          <div
            className='w-2.5 h-2.5 rounded-full'
            style={{ backgroundColor: color }}
          ></div>
          <span className='font-bold app-text capitalize'>{name}</span>
        </div>
        <button
          onClick={() => setMore(!more)}
          className='p-1 hover:bg-black/10 rounded-md transition-colors'
        >
          <IconSet iconName='moreHorizontal' size={20} />
        </button>
      </div>

      {/* Column Area */}
      <div className='app-column-body h-fit overflow-y-auto p-3 flex flex-col gap-3 custom-scrollbar'>
        {children}
      </div>

      {/* Column Buttom / Add Button */}
      <div className='app-column-footer p-3 border-t app-border'>
        <button
          onClick={() => {
            onCurrentCol(name.toLowerCase());
            onShowModal();
          }}
          className='w-full py-2.5 flex justify-center items-center gap-2 rounded-xl border-2 border-dashed app-border app-muted hover:bg-white/40 transition-all font-bold text-sm'
        >
          <IconSet iconName='plus' size={18} />
          <span>Add Job</span>
        </button>
      </div>
    </div>
  );
};

const Card = ({ job, onDelete, onEdit, showModal }: CardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id, company, position, mood_txt, salary, logo_url, logo_alt } = job;

  return (
    <section className='app-card flex flex-col rounded-xl app-border shadow-sm p-4'>
      <div className='flex gap-3 items-center'>
        {/* Image area */}
        <img
          src={logo_url}
          alt={logo_alt}
          className='w-12 h-12 rounded-lg object-contain border border-gray-100'
        />
        <div className='flex-1 overflow-hidden'>
          {/* Company Name and Top Row Meta */}
          <p className='font-bold app-text truncate'>{company}</p>
          <p className='text-xs font-semibold text-blue-600 truncate'>
            {'Position: ' + (position || '-')}
          </p>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <IconSet
            iconName={!isOpen ? 'cheveronDown' : 'cheveronUp'}
            size={18}
          ></IconSet>
        </button>
      </div>

      {/* Meta Row */}
      <div className='flex gap-3 mt-3 overflow-x-auto no-scrollbar'>
        <div className='flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded'>
          $Salary: {salary || '-'}
        </div>

        {/* {createdAt && (
                    <div className='flex items-center gap-1 text-[10px] font-bold bg-gray-50 text-gray-500 px-2 py-1 rounded whitespace-nowrap'>
                         {createdAt}
                    </div>
                )} */}
      </div>

      {/* Note Row */}
      {isOpen && (
        <div className='mt-4 pt-4 border-t border-gray-50 space-y-3'>
          <p className={`text-xs app-muted ${!mood_txt && 'italic'}`}>
            {mood_txt || 'No notes...'}
          </p>
          <div className='flex gap-2'>
            <button
              className='flex-1 py-1.5 text-xs font-bold bg-gray-100 rounded-lg flex justify-center gap-2 items-center'
              onClick={() => {
                onEdit(id!);
                showModal();
              }}
            >
              {' '}
              <IconSet iconName='edit2' size={14}></IconSet>Edit
            </button>

            <button
              className='flex-1 py-1.5 text-xs font-bold bg-red-50 text-red-600 rounded-lg flex justify-center gap-2 items-center'
              onClick={() => onDelete(id!)}
            >
              {' '}
              <IconSet iconName='delete' size={14}>
                Delete
              </IconSet>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const PreviewCard = ({
  companyName,
  jobPosition,
  jobcreatedAt,
  jobSalary,
}: CardPreview) => {
  // const {icon} = companyIcon
  return (
    <section className='flex w-full bg-card-main outline-gray-300 outline-1 items-center p-3 gap-4 rounded-lg mt-4 mb-8 overflow-clip shadow-[0px_4px_12px_0px_rgba(0,0,0,0.17)]'>
      <img
        src={`https://img.logo.dev/${companyName}.com?token=pk_RKtwoXuaQDSJdIEDV1NYVA`}
        alt=''
        width={55}
        className='rounded-lg'
      />
      <div className='flex  flex-col'>
        <p className='font-bold text-lg  w-100'>{companyName}</p>
        <div className='flex justify-between gap-5'>
          {jobPosition && (
            <p>
              <span className='font-medium'>Position:</span>
              {jobPosition}
            </p>
          )}
          {jobSalary && (
            <p>
              <span className='font-medium'>Salary:</span>
              {jobSalary}
            </p>
          )}
          {jobcreatedAt && (
            <p>
              <span className='font-medium'>Applied::</span>
              {jobcreatedAt}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export { Column, Card, PreviewCard };
