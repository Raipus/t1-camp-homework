import { useIsMobile } from '@/shared/lib/hooks';
import {
  Button,
  InputField,
  Label,
  Modal,
  ModalButtonPanel,
  ModalContent,
  ModalTitle,
  Select,
  TextField,
  Option,
  skeletonAnimationMixin,
} from '@admiral-ds/react-ui';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createTask,
  fetchTaskById,
  selectTasksLoading,
  updateTask,
  type ITask,
} from '@/entities/task';
import { useAppDispatch, type RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type Props = {
  type: string;
};

const TitleSkeleton = styled.div`
  width: 60%;
  height: 24px;
  border-radius: 4px;
  ${skeletonAnimationMixin};
`;

export const TaskModal: React.FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useIsMobile(769);

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const { defaultStatus } = (location.state as { defaultStatus?: string }) || {};

  const optionsCategory = ['Баг', 'Фича', 'Документация', 'Рефакторинг', 'Тест'];
  const optionsPriority = ['Низкий', 'Средний', 'Высокий'];
  const optionsStatus = ['Предстоит', 'В работе', 'Выполнено'];

  const [title, setTitle] = useState<string>('Название');
  const onChangetitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const [description, setDescription] = useState<string>('Краткое описание задачи');
  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const [category, setCategory] = useState<string>('Фича');
  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
  const [priority, setPriority] = useState<string>('Средний');
  const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value);
  const [status, setStatus] = useState<string>('Предстоит');
  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value);

  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectTasksLoading);

  const task = useSelector((state: RootState) =>
    id ? (state.tasks.list.find((t) => t.id === id) ?? null) : null,
  );

  const closeModal = () => {
    if (state?.backgroundLocation) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const onCreateTask = () => {
    const newTask: ITask = {
      title,
      description,
      category,
      priority,
      status,
    };
    dispatch(createTask(newTask));
    closeModal();
  };

  const onUpdateTask = () => {
    const updatedTask: ITask = {
      id,
      title,
      description,
      category,
      priority,
      status,
    };
    dispatch(updateTask(updatedTask));
    closeModal();
  };

  useEffect(() => {
    if (type === 'create' && defaultStatus) {
      setStatus(defaultStatus);
    }
  }, [type, defaultStatus]);

  useEffect(() => {
    if (id && type !== 'create') {
      dispatch(fetchTaskById(id));
    }
  }, [id, type]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  return (
    <Modal onClose={closeModal} style={isMobile ? { width: '90%' } : {}}>
      <ModalTitle>
        {isLoading ? (
          <TitleSkeleton />
        ) : type === 'create' ? (
          'Создание задачи'
        ) : (
          `Изменение задачи "${title}"`
        )}
      </ModalTitle>
      <ModalContent>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div>
            <Label>Название задачи</Label>
            <InputField value={title} onChange={onChangetitle} skeleton={isLoading} />
          </div>
          <div>
            <Label>Краткое описание задачи</Label>
            <TextField value={description} onChange={onChangeDescription} skeleton={isLoading} />
          </div>
          <div>
            <Label>Категория</Label>
            <Select
              placeholder="Категория"
              value={category}
              onChange={onChangeCategory}
              skeleton={isLoading}
            >
              {optionsCategory.map((option, ind) => (
                <Option key={ind} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Приоритет</Label>
            <Select
              placeholder="Приоритет"
              value={priority}
              onChange={onChangePriority}
              skeleton={isLoading}
            >
              {optionsPriority.map((option, ind) => (
                <Option key={ind} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Статус</Label>
            <Select
              placeholder="Статус"
              value={status}
              onChange={onChangeStatus}
              skeleton={isLoading}
            >
              {optionsStatus.map((option, ind) => (
                <Option key={ind} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </ModalContent>
      <ModalButtonPanel style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          appearance="primary"
          dimension="m"
          onClick={type === 'create' ? onCreateTask : onUpdateTask}
        >
          {type === 'create' ? 'Создать' : 'Изменить'}
        </Button>
        <Button appearance="secondary" dimension="m" onClick={closeModal}>
          Отмена
        </Button>
      </ModalButtonPanel>
    </Modal>
  );
};
