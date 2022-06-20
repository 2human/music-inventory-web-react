import { formFields } from '../../components/SingleRowForm/formData';
import {
  MODAL_CLOSE,
  MODAL_OPEN_CREATE_ROW_FORM,
  MODAL_OPEN_EDIT_ROW_FORM,
  MODAL_OPEN_VIEW_ROW,
  MODAL_REQUEST_FAILED,
  MODAL_REQUEST_SUCCESSFUL,
  MODAL_SUBMITTING_REQUEST,
} from '../actions/actionTypes';
import { dataType } from '../sagas/sagaHelpers';

const defaultState = {
  modalOpen: false,
  modalType: undefined,
  dataType: undefined,
  rowId: undefined,
  columnName: undefined,
  status: undefined,
  fields: formFields,
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MODAL_OPEN_EDIT_ROW_FORM:
      return {
        ...state,
        modalOpen: true,
        modalType: 'edit',
        rowId: action.payload.rowData
          ? action.payload.rowData.id
          : undefined,
        columnName: action.payload.columnClicked,
        dataType: dataType(action.payload.rowData),
      };
    case MODAL_OPEN_CREATE_ROW_FORM:
      return {
        ...state,
        modalOpen: true,
        modalType: 'create',
        dataType: action.payload,
        rowId: undefined,
        columnName: undefined,
      };
    case MODAL_OPEN_VIEW_ROW:
      return {
        ...state,
        modalType: 'view',
        modalOpen: true,
        rowId: action.payload.id,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false,
        status: undefined,
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
