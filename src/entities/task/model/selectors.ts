import type { RootState } from '@app/store';

export const selectTasks = (state: RootState) => state.tasks.list;
export const selectTaskById = (id: number) => (state: RootState) =>
  state.tasks.list.find((task) => task.id === id);
