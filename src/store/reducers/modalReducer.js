import {
  MODAL_CREATE_ROW,
  MODAL_EDIT_ROW,
  MODAL_VIEW_ROW,
} from '../actions/actionTypes';

const defaultState = {
  modalOpen: false,
  modalType: undefined,
  dataType: undefined,
  rowId: undefined,
  columnName: undefined,
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MODAL_EDIT_ROW:
      return {
        ...state,
        modalOpen: true,
        modalType: 'edit',
        rowId: action.payload.id,
        columnName: action.payload.column,
      };
    case MODAL_CREATE_ROW:
      return {
        ...state,
        modalOpen: true,
        modalType: 'create',
        dataType: action.payload,
      };
    case MODAL_VIEW_ROW:
      return {
        ...state,
        modalType: 'view',
        modalOpen: true,
        rowId: action.payload,
      };
    default:
      return state;
  }
};
