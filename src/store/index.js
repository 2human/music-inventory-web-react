import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { SEARCH_REQUEST } from './actions/actionTypes';
import { search, reducer as searchReducer } from './sagas/search';

function* rootSaga() {
  console.log('DISPATCHING');
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
