import React from 'react';
import styled from 'styled-components';
import { Divider, IconButton, skeletonAnimationMixin, T, TooltipHoc } from '@admiral-ds/react-ui';
import { TaskItem } from '@/features/task-item';
import { selectTasksLoading, type ITask } from '@/entities/task';
import PlusCircleSolid from '@admiral-ds/icons/build/service/PlusCircleSolid.svg?react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

type Props = {
  tasks: ITask[];
  title: string;
  isMobile: boolean;
};

const StatusDiv = styled.section<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  ${({ $isMobile }) =>
    $isMobile
      ? `
      width: 100%; 
      height: calc(100vh - 180px);
      `
      : `
      width: 250px; 
      height: calc(100vh - 141px);
      `}
`;

const TaskList = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow-y: auto;
  width: 100%;
  padding: 1rem 1.5rem;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ $isMobile }) => ($isMobile ? `box-sizing: border-box;` : ``)}
`;

const ButtonWithTooltip = TooltipHoc(IconButton);

const Skeleton = styled.div`
  width: 100%;
  height: 9rem;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: var(--admiral-border-radius-Medium);
  box-shadow: var(--admiral-box-shadow-Shadow08);
  transition: scale 0.5s;
  &:hover {
    scale: 110%;
    cursor: pointer;
  }
  ${skeletonAnimationMixin};
`;

export const TaskStatusList: React.FC<Props> = ({ title, isMobile, tasks = [] }) => {
  const location = useLocation();
  const isLoading = useSelector(selectTasksLoading);

  return (
    <StatusDiv $isMobile={isMobile}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <T font="Header/H5" as="h2">
          {title}
        </T>
        <Link
          to={`/task/new`}
          state={{
            backgroundLocation: location,
            defaultStatus: title,
          }}
        >
          <ButtonWithTooltip renderContent={() => 'Создать задачу'} dimension="s">
            <PlusCircleSolid />
          </ButtonWithTooltip>
        </Link>
      </div>
      <Divider />
      <TaskList $isMobile={isMobile}>
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </TaskList>
    </StatusDiv>
  );
};
