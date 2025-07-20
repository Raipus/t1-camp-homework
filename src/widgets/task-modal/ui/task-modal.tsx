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
} from '@admiral-ds/react-ui';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask, type ITask } from '@/entities/task';
import { useSelector } from 'react-redux';
import { selectTaskById } from '@entities/task';

type Props = {
  type: string;
};

export const TaskModal: React.FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useIsMobile(769);

  const optionsCategory = ['Баг', 'Фича', 'Документация', 'Рефакторинг', 'Тест'];
  const optionsPriority = ['Низкий', 'Средний', 'Высокий'];
  const optionsStatus = ['Предстоит', 'В работе', 'Выполнено'];

  const [name, setName] = useState<string>('Название');
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const [description, setDescription] = useState<string>('Краткое описание задачи');
  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const [category, setCategory] = useState<string>('Фича');
  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
  const [priority, setPriority] = useState<string>('Средний');
  const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value);
  const [status, setStatus] = useState<string>('Предстоит');
  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value);

  const dispatch = useDispatch();

  const closeModal = () => {
    navigate(-1);
  };

  const onCreateTask = () => {
    const newTask: ITask = {
      id: Date.now(),
      title: name,
      description,
      category,
      priority,
      status,
    };
    dispatch(createTask(newTask));
    closeModal();
  };

  const onUpdateTask = () => {
    let idNum = Number(id);
    const updatedTask: ITask = {
      id: idNum,
      title: name,
      description,
      category,
      priority,
      status,
    };
    dispatch(updateTask(updatedTask));
    closeModal();
  };

  let idNum = Number(id);
  const task = useSelector(selectTaskById(idNum));

  useEffect(() => {
    if (task) {
      setName(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  return (
    <Modal onClose={closeModal} style={isMobile ? { width: '90%' } : {}}>
      <ModalTitle>
        {type === 'create' ? 'Создание задачи' : `Изменение задачи "${name}"`}
      </ModalTitle>
      <ModalContent>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <InputField label="Название задачи" value={name} onChange={onChangeName} />
          <TextField
            label="Краткое описание задачи"
            value={description}
            onChange={onChangeDescription}
          />
          <div>
            <Label>Категория</Label>
            <Select placeholder="Категория" value={category} onChange={onChangeCategory}>
              {optionsCategory.map((option, ind) => (
                <Option key={ind} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Приоритет</Label>
            <Select placeholder="Приоритет" value={priority} onChange={onChangePriority}>
              {optionsPriority.map((option, ind) => (
                <Option key={ind} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Статус</Label>
            <Select placeholder="Статус" value={status} onChange={onChangeStatus}>
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
