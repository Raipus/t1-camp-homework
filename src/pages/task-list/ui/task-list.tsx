import React from 'react';
import styled from 'styled-components';
import { Carousel } from '@admiral-ds/react-ui';
import { TaskStatusList } from '@/widgets/task-status-list';
import { useIsMobile } from '@/shared/lib/hooks';
import { selectTasks } from '@/entities/task';
import { useSelector } from 'react-redux';

const Background = styled.main<{ $isMobile: boolean }>`
  background: var(--admiral-color-Special_ElevatedBG);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
  border-top-left-radius: var(--admiral-border-radius-Large);
  border-top-right-radius: var(--admiral-border-radius-Large);
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 104px);
  display: flex;

  ${({ $isMobile }) => ($isMobile ? `justify-content: normal` : `justify-content: space-evenly;`)}
`;

export const TaskListPage: React.FC = () => {
  const isMobile = useIsMobile(769);

  const tasks = useSelector(selectTasks);

  if (isMobile) {
    return (
      <Background $isMobile={isMobile}>
        <Carousel {...{ infiniteScroll: true, sliderAppearance: 'primary', showButtons: false }}>
          <TaskStatusList
            tasks={tasks.filter((t) => t.status === 'Предстоит') || []}
            title="Предстоит"
            isMobile={isMobile}
            key={1}
          />
          <TaskStatusList
            tasks={tasks.filter((t) => t.status === 'В работе') || []}
            title="В работе"
            isMobile={isMobile}
            key={2}
          />
          <TaskStatusList
            tasks={tasks.filter((t) => t.status === 'Выполнено') || []}
            title="Выполнено"
            isMobile={isMobile}
            key={3}
          />
        </Carousel>
      </Background>
    );
  }

  return (
    <Background $isMobile={isMobile}>
      <TaskStatusList
        tasks={tasks.filter((t) => t.status === 'Предстоит') || []}
        title="Предстоит"
        isMobile={isMobile}
        key={1}
      />
      <TaskStatusList
        tasks={tasks.filter((t) => t.status === 'В работе') || []}
        title="В работе"
        isMobile={isMobile}
        key={2}
      />
      <TaskStatusList
        tasks={tasks.filter((t) => t.status === 'Выполнено') || []}
        title="Выполнено"
        isMobile={isMobile}
        key={3}
      />
    </Background>
  );
};
