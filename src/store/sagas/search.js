import { put, call } from 'redux-saga/effects';
import {
  SEARCH_FAILED,
  SEARCH_SUBMITTING,
  SEARCH_SUCCESSFUL,
} from '../actions/actionTypes';
import { requestURLObjectFrom } from './searchHelpers';

export function* search({ formInputs }) {
  yield put({ type: 'SEARCH_SUBMITTING' });
  const result = yield call(
    window.fetch,
    requestURLObjectFrom(formInputs)
  );
  if (result.ok) {
    const searchResults = yield call([result, 'json']);
    yield put({
      type: SEARCH_SUCCESSFUL,
      searchResults,
    });
  } else {
    yield put({ type: SEARCH_FAILED });
  }
}

const defaultState = {
  formInputs: {},
  status: undefined,
  error: false,
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_SUBMITTING:
      return { ...state, status: 'SUBMITTING' };
    case SEARCH_FAILED:
      return { ...state, status: 'FAILED', error: true };
    case SEARCH_SUCCESSFUL:
      return {
        ...state,
        status: 'SUCCESSFUL',
        searchResults: action.searchResults,
      };
    default:
      return state;
  }
};
