import type { ITask } from '../types';

const TASKS_KEY = 'tasks';

export function loadTasksFromStorage(): ITask[] {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function saveTasksToStorage(tasks: ITask[]) {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error(e);
  }
}
