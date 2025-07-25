import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ITask } from '../types';
import { tasksApi } from '../api/tasksApi';

interface TasksState {
  list: ITask[];
  currentTask: ITask | null;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  list: [],
  currentTask: null,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  return await tasksApi.fetchAll();
});

export const fetchTaskById = createAsyncThunk('tasks/fetchById', async (id: string) => {
  return await tasksApi.fetchById(id);
});

export const createTask = createAsyncThunk('tasks/create', async (task: Omit<ITask, 'id'>) => {
  return await tasksApi.create(task);
});

export const updateTask = createAsyncThunk('tasks/update', async (task: ITask) => {
  return await tasksApi.update(task);
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await tasksApi.remove(id);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load tasks';
      })

      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load task';
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.loading = false;
        const idx = state.list.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.currentTask?.id === action.payload.id) state.currentTask = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update task';
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.list = state.list.filter((t) => t.id !== action.payload);
        if (state.currentTask?.id === action.payload) state.currentTask = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
