import { put, call } from 'redux-saga/effects';
import {
  closeModal,
  modalRequestFailed,
  modalRequestSubmitting,
  modalRequestSuccessful,
} from '../actions';
import { dataType } from './sagaHelpers';

const fetch = (data) => {
  return window.fetch(`/${dataType(data)}`, {
    body: JSON.stringify(data),
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
  });
};

export function* deleteSaga({ payload }) {
  yield put(modalRequestSubmitting());

  const data = payload;
  let result;

  try {
    result = yield call(fetch, data);

    if (result.ok) {
      yield put(modalRequestSuccessful());
      yield put(closeModal());
    }
  } catch (error) {
    result = { ok: false };
  }

  if (!result.ok) {
    yield put(modalRequestFailed());
  }
}
