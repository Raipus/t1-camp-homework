import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ITask } from '../types';
import { loadTasksFromStorage, saveTasksToStorage } from '../lib/localStorage';

interface TasksState {
  list: ITask[];
}

const initialState: TasksState = {
  list: loadTasksFromStorage(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Omit<ITask, 'id'>>) => {
      const newId = state.list.length ? Math.max(...state.list.map((t) => t.id)) + 1 : 1;
      state.list.push({ id: newId, ...action.payload });
      saveTasksToStorage(state.list);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.list);
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const idx = state.list.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
        saveTasksToStorage(state.list);
      }
    },
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.list = action.payload;
      saveTasksToStorage(state.list);
    },
  },
});

export const { createTask, deleteTask, updateTask, setTasks } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
