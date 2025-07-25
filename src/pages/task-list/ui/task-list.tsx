import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Carousel,
  NotificationItem,
  NotificationItemContent,
  NotificationItemTitle,
} from '@admiral-ds/react-ui';
import { TaskStatusList } from '@/widgets/task-status-list';
import { useIsMobile } from '@/shared/lib/hooks';
import { fetchTasks, selectTasks, selectTasksError } from '@/entities/task';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/store';

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

const NotificationWrapper = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 10000;
`;

export const TaskListPage: React.FC = () => {
  const isMobile = useIsMobile(1025);
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);

  const tasks = useSelector(selectTasks);
  const error = useSelector(selectTasksError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  if (isMobile) {
    return (
      <Background $isMobile={isMobile}>
        {error && showError && (
          <NotificationWrapper>
            <NotificationItem
              status="error"
              displayStatusIcon
              isClosable
              style={{ width: '100%', margin: '1rem auto' }}
              onClose={() => setShowError(false)}
            >
              <NotificationItemTitle>Ошибка загрузки задач</NotificationItemTitle>
              <NotificationItemContent>{error}</NotificationItemContent>
            </NotificationItem>
          </NotificationWrapper>
        )}
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
      {error && showError && (
        <NotificationWrapper>
          <NotificationItem
            status="error"
            displayStatusIcon
            isClosable
            style={{ width: '488px', margin: '1rem auto' }}
            onClose={() => setShowError(false)}
          >
            <NotificationItemTitle>Ошибка загрузки задач</NotificationItemTitle>
            <NotificationItemContent>{error}</NotificationItemContent>
          </NotificationItem>
        </NotificationWrapper>
      )}
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
