import { axiosInstance } from '@/shared/lib/api';
import type { ITask } from '../types';

export const tasksApi = {
  fetchAll: (): Promise<ITask[]> => axiosInstance.get('/tasks').then((res) => res.data),

  fetchById: (id: string): Promise<ITask> =>
    axiosInstance.get(`/tasks/${id}`).then((res) => res.data),

  create: (task: Omit<ITask, 'id'>): Promise<ITask> =>
    axiosInstance.post('/tasks', task).then((res) => res.data),

  update: (task: ITask): Promise<ITask> =>
    axiosInstance.patch(`/tasks/${task.id}`, task).then((res) => res.data),

  remove: (id: string): Promise<void> =>
    axiosInstance.delete(`/tasks/${id}`).then((res) => res.data),
};
