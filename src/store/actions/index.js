import {
  MODAL_CLOSE,
  MODAL_OPEN_CREATE_ROW_FORM,
  MODAL_OPEN_EDIT_ROW_FORM,
  MODAL_OPEN_VIEW_ROW,
  MODAL_REQUEST_FAILED,
  MODAL_REQUEST_SUCCESSFUL,
  MODAL_SUBMITTING_REQUEST,
  MODAL_SUBMIT_CREATE,
  MODAL_SUBMIT_DELETE,
  MODAL_SUBMIT_UPDATE,
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

//MODAL

export const openEditRow = (rowId, column) => {
  return {
    type: MODAL_OPEN_EDIT_ROW_FORM,
    payload: { id: rowId, column },
  };
};

export const openCreateRow = (dataType) => {
  return {
    type: MODAL_OPEN_CREATE_ROW_FORM,
    payload: dataType,
  };
};

export const openViewRow = (rowId) => {
  return {
    type: MODAL_OPEN_VIEW_ROW,
    payload: rowId,
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE,
  };
};

export const submitUpdate = (data) => {
  return {
    type: MODAL_SUBMIT_UPDATE,
    payload: data,
  };
};

export const submitDelete = (data) => {
  return {
    type: MODAL_SUBMIT_DELETE,
    payload: data,
  };
};

export const submitCreate = (data) => {
  return {
    type: MODAL_SUBMIT_CREATE,
    payload: data,
  };
};

export const modalRequestSubmitting = () => {
  return {
    type: MODAL_SUBMITTING_REQUEST,
  };
};

export const modalRequestFailed = () => {
  return {
    type: MODAL_REQUEST_FAILED,
  };
};

export const modalRequestSuccessful = () => {
  return {
    type: MODAL_REQUEST_SUCCESSFUL,
  };
};

//SEARCH

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
