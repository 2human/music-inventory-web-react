import {
  MODAL_CREATE_ROW,
  MODAL_EDIT_ROW,
  MODAL_VIEW_ROW,
  SEARCH_FAILED,
  SEARCH_REQUEST,
  SEARCH_RESET_SORT,
  SEARCH_SELECT_PAGE,
  SEARCH_SET_RESULTS_PER_PAGE,
  SEARCH_SET_SORT,
  SEARCH_SET_SORT_AND_SORT,
  SEARCH_SORT,
  SEARCH_SUBMITTING,
  SEARCH_SUCCESSFUL,
} from './actionTypes';

export const openEditRow = (rowId, column) => {
  return {
    type: MODAL_EDIT_ROW,
    payload: { id: rowId, column },
  };
};

export const openCreateRow = (dataType) => {
  return {
    type: MODAL_CREATE_ROW,
    payload: dataType,
  };
};

export const openViewRow = (rowId) => {
  return {
    type: MODAL_VIEW_ROW,
    payload: rowId,
  };
};

export const searchSubmitting = () => {
  return {
    type: SEARCH_SUBMITTING,
  };
};

export const searchSuccessful = (results, dataType) => {
  return {
    type: SEARCH_SUCCESSFUL,
    payload: { results, dataType },
  };
};

export const searchFailed = () => {
  return {
    type: SEARCH_FAILED,
  };
};

export const searchRequest = (formInputs) => {
  return {
    type: SEARCH_REQUEST,
    payload: formInputs,
  };
};

export const searchSetSortOrder = (column) => {
  return {
    type: SEARCH_SET_SORT,
    payload: column,
  };
};

export const searchSort = () => {
  return {
    type: SEARCH_SORT,
  };
};

export const searchSetSortOrderAndSort = (column) => {
  return {
    type: SEARCH_SET_SORT_AND_SORT,
    payload: column,
  };
};

export const searchResetSort = () => {
  return {
    type: SEARCH_RESET_SORT,
  };
};

export const searchSelectPage = (page) => {
  return {
    type: SEARCH_SELECT_PAGE,
    payload: page,
  };
};

export const searchSetResultsPerPage = (resultsPerPage) => {
  return {
    type: SEARCH_SET_RESULTS_PER_PAGE,
    payload: resultsPerPage,
  };
};
