import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Fetch todos
    fetchTodosRequest: (state) => {
      state.loading = true;
    },
    fetchTodosSuccess: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add todo
    addTodoRequest: (state) => {
      state.loading = true;
    },
    addTodoSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Toggle todo
    toggleTodoRequest: (state) => {
      state.loading = true;
    },
    toggleTodoSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    toggleTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete todo
    deleteTodoRequest: (state) => {
      state.loading = true;
    },
    deleteTodoSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  toggleTodoRequest,
  toggleTodoSuccess,
  toggleTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer; 