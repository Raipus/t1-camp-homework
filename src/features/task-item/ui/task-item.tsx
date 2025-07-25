import { deleteTask, type ITask } from '@/entities/task';
import { TaskTag } from '@/features/task-tag';
import { IconButton, Link, T, TooltipHoc } from '@admiral-ds/react-ui';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DeleteSolid from '@admiral-ds/icons/build/system/DeleteSolid.svg?react';
import { useAppDispatch } from '@/app/store';

type Props = {
  task: ITask;
};

const Source = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: var(--admiral-border-radius-Medium);
  background: var(--admiral-color-Neutral_Neutral00);
  box-shadow: var(--admiral-box-shadow-Shadow08);
  transition: scale 0.5s;
  overflow: visible;
  text-decoration: none;
  gap: 1rem;

  &:hover {
    scale: 110%;
    cursor: pointer;
  }
`;

const ButtonWithTooltip = TooltipHoc(IconButton);

export const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <Source as={RouterLink} to={`task/${task.id}`} state={{ backgroundLocation: location }}>
      <T font="Header/H6" as="h3">
        {task.title}
      </T>
      <T font="Body/Body 2 Long" as="p">
        {task.description}
      </T>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <TaskTag title={task.category} />
          <TaskTag title={task.priority} />
        </div>
        <ButtonWithTooltip
          renderContent={() => 'Удалить задачу'}
          dimension="s"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!task?.id) return;
            dispatch(deleteTask(task.id));
          }}
        >
          <DeleteSolid />
        </ButtonWithTooltip>
      </div>
    </Source>
  );
};
