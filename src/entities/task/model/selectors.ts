import type { RootState } from '@app/store';

export const selectTasks = (state: RootState) => state.tasks.list;
export const selectTaskById = (state: RootState) => state.tasks.currentTask;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;
