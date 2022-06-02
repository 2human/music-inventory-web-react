import { put, call } from 'redux-saga/effects';
import {
  searchFailed,
  searchResetSort,
  searchSelectPage,
  searchSort,
  searchSubmitting,
  searchSuccessful,
} from '../actions';
import { requestURLObjectFrom } from './searchHelpers';

export function* search({ payload }) {
  const formInputs = payload;
  yield put(searchSubmitting());
  let result;
  try {
    result = yield call(
      window.fetch,
      requestURLObjectFrom(formInputs)
    );
    if (result.ok) {
      const results = yield call([result, 'json']);
      yield put(searchSuccessful(results, formInputs.table));
      yield put(searchResetSort());
      yield put(searchSort());
      yield put(searchSelectPage(1));
    }
  } catch (error) {
    result = { ok: false };
  }
  if (!result.ok) {
    yield put(searchFailed());
  }
}
