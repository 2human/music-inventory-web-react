import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import {
  MODAL_SUBMIT_CREATE,
  MODAL_SUBMIT_DELETE,
  MODAL_SUBMIT_UPDATE,
  SEARCH_REQUEST,
  SEARCH_SET_SORT_AND_SORT,
} from './actions/actionTypes';
import { modalReducer } from './reducers/modalReducer';
import { searchReducer } from './reducers/searchReducer';
import { createSaga } from './sagas/createSaga';
import { deleteSaga } from './sagas/deleteSaga';
import { search } from './sagas/search';
import { setSortAndSort } from './sagas/setSortAndSort';
import { update } from './sagas/update';

function* rootSaga() {
  yield takeLatest(SEARCH_REQUEST, search);
  yield takeLatest(SEARCH_SET_SORT_AND_SORT, setSortAndSort);
  yield takeLatest(MODAL_SUBMIT_UPDATE, update);
  yield takeLatest(MODAL_SUBMIT_DELETE, deleteSaga);
  yield takeLatest(MODAL_SUBMIT_CREATE, createSaga);
}

export const configureStore = (storeEnhancers = []) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({ search: searchReducer, modal: modalReducer }),
    compose(...[applyMiddleware(sagaMiddleware), ...storeEnhancers])
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
