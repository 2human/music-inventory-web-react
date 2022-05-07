import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { SEARCH_REQUEST } from './actions/actionTypes';
import { searchReducer } from './reducers/searchReducer';
import { search } from './sagas/search';

function* rootSaga() {
  yield takeLatest(SEARCH_REQUEST, search);
}

export const configureStore = (storeEnhancers = []) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({ search: searchReducer }),
    compose(...[applyMiddleware(sagaMiddleware), ...storeEnhancers])
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
