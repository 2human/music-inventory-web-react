import { put, call } from 'redux-saga/effects';
import {
  modalRequestFailed,
  modalRequestSubmitting,
  modalRequestSuccessful,
} from '../actions';
import { dataType } from './sagaHelpers';

const fetch = (data) => {
  return window.fetch(`http://localhost:8080/${dataType(data)}`, {
    body: JSON.stringify(data),
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
  });
};

export function* createSaga({ payload }) {
  yield put(modalRequestSubmitting());

  const data = payload;
  let result;

  try {
    result = yield call(fetch, data);
    if (result.ok) {
      yield put(modalRequestSuccessful());
    }
  } catch (error) {
    result = { ok: false };
  }

  if (!result.ok) {
    yield put(modalRequestFailed());
  }
}
