import { Link, T } from '@admiral-ds/react-ui';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  task?: string;
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

  &:hover {
    scale: 110%;
    cursor: pointer;
  }
`;

export const TaskItem: React.FC<Props> = () => {
  //   Временное задание для проверки
  const task = {
    id: 1,
    title: 'Do this task',
    descripton: 'A long description of the task afa gag aa g aga gaga gag agag',
    category: 'Bug',
    priority: 'Low',
    status: 'To Do',
  };

  return (
    <Source as={RouterLink} to={`task/${task.id}`}>
      <T font="Header/H6" as="h3">
        {task.title}
      </T>
      <T font="Body/Body 2 Long" as="p">
        {task.descripton}
      </T>
      {/* Bug (Danger) / Feature (Success) / Documentation (Primary) / Refactor (Warning) / Test (Neutral)

      Low (Success) / Medium (Warning) / High (Danger) */}
    </Source>
  );
};
