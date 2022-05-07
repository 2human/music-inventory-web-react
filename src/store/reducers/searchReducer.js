import {
  SEARCH_FAILED,
  SEARCH_SUBMITTING,
  SEARCH_SUCCESSFUL,
} from '../actions/actionTypes';

const defaultState = {
  formInputs: {},
  status: undefined,
  error: false,
};

export const searchReducer = (state = defaultState, action) => {
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
