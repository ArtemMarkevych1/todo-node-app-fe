import { call, put, takeLatest, delay, fork } from 'redux-saga/effects';
import {
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  addTodoFailure,
  toggleTodoSuccess,
  toggleTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
  fetchTodosRequest,
} from '../slices/todoSlice';
import TodoApi from '../../api/Api';

function* autoFetchTodos() {
  // Auto fetch todos every 49 minutes in order to keep the server awake
  while (true) {
    try {
      const todos = yield call(TodoApi.fetchTodos);
      yield put(fetchTodosSuccess(todos));
      yield delay(49 * 60 * 1000);
    } catch (error) {
      yield put(fetchTodosFailure(error.message));
      yield delay(49 * 60 * 1000);
    }
  }
}

function* fetchTodosSaga() {
  try {
    const todos = yield call(TodoApi.fetchTodos);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* addTodoSaga(action) {
  try {
    const todo = yield call(TodoApi.addTodo, action.payload);
    yield put(addTodoSuccess(todo));
    yield put(fetchTodosRequest())
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

function* toggleTodoSaga(action) {
  try {
    const todo = yield call(TodoApi.toggleTodo, action.payload.id, action.payload.completed);
    yield put(toggleTodoSuccess(todo));
    yield put(fetchTodosRequest())
  } catch (error) {
    yield put(toggleTodoFailure(error.message));
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(TodoApi.deleteTodo, action.payload);
    yield put(deleteTodoSuccess(action.payload));
    yield put(fetchTodosRequest())
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

export function* todoSaga() {
  yield fork(autoFetchTodos);
  yield takeLatest('todos/fetchTodosRequest', fetchTodosSaga);
  yield takeLatest('todos/addTodoRequest', addTodoSaga);
  yield takeLatest('todos/toggleTodoRequest', toggleTodoSaga);
  yield takeLatest('todos/deleteTodoRequest', deleteTodoSaga);
} 