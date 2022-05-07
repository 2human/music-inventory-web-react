import {
  MODAL_CREATE_ROW,
  MODAL_EDIT_ROW,
  MODAL_VIEW_ROW,
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
