import { put } from 'redux-saga/effects';
import {
  searchSelectPage,
  searchSetSortOrder,
  searchSort,
} from '../actions';

export function* setSortAndSort({ payload }) {
  const column = payload;
  yield put(searchSetSortOrder(column));
  yield put(searchSort());
  yield put(searchSelectPage(1));
}
