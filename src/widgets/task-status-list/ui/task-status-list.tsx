import React from 'react';
import styled from 'styled-components';
import { Divider, T } from '@admiral-ds/react-ui';
import { TaskItem } from '@/features/task-item';

type Props = {
  tasks?: Array<Number>;
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
  padding: 0.5rem 1.5rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  ${({ $isMobile }) => ($isMobile ? `box-sizing: border-box;` : ``)}
`;

export const TaskStatusList: React.FC<Props> = ({ title, isMobile }) => {
  return (
    <StatusDiv $isMobile={isMobile}>
      <T font="Header/H5" as="h2">
        {title}
      </T>
      <Divider />
      <TaskList $isMobile={isMobile}>
        {/* Временные задания */}
        <TaskItem />
        <TaskItem />
      </TaskList>
    </StatusDiv>
  );
};
