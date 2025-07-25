import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '@entities/task';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
