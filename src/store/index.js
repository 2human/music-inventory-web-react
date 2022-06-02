import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import {
  SEARCH_REQUEST,
  SEARCH_SET_SORT_AND_SORT,
} from './actions/actionTypes';
import { modalReducer } from './reducers/modalReducer';
import { searchReducer } from './reducers/searchReducer';
import { search } from './sagas/search';
import { setSortAndSort } from './sagas/setSortAndSort';

function* rootSaga() {
  yield takeLatest(SEARCH_REQUEST, search);
  yield takeLatest(SEARCH_SET_SORT_AND_SORT, setSortAndSort);
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
