import {
  MODAL_CLOSE,
  MODAL_CREATE_ROW,
  MODAL_EDIT_ROW,
  MODAL_OPEN_CREATE_ROW_FORM,
  MODAL_OPEN_EDIT_ROW_FORM,
  MODAL_OPEN_VIEW_ROW,
  MODAL_REQUEST_FAILED,
  MODAL_REQUEST_SUCCESSFUL,
  MODAL_SUBMITTING_REQUEST,
  MODAL_VIEW_ROW,
} from '../actions/actionTypes';

const defaultState = {
  modalOpen: false,
  modalType: undefined,
  dataType: undefined,
  rowId: undefined,
  columnName: undefined,
  status: undefined,
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MODAL_OPEN_EDIT_ROW_FORM:
      return {
        ...state,
        modalOpen: true,
        modalType: 'edit',
        rowId: action.payload.id,
        columnName: action.payload.column,
      };
    case MODAL_OPEN_CREATE_ROW_FORM:
      return {
        ...state,
        modalOpen: true,
        modalType: 'create',
        dataType: action.payload,
      };
    case MODAL_OPEN_VIEW_ROW:
      return {
        ...state,
        modalType: 'view',
        modalOpen: true,
        rowId: action.payload,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false,
      };
    case MODAL_SUBMITTING_REQUEST:
      return {
        ...state,
        status: 'SUBMITTING',
      };
    case MODAL_REQUEST_FAILED:
      return {
        ...state,
        status: 'FAILED',
      };
    case MODAL_REQUEST_SUCCESSFUL:
      return {
        ...state,
        status: 'SUCCESSFUL',
      };
    default:
      return state;
  }
};
