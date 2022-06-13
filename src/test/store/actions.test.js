import {
  closeModal,
  modalRequestFailed,
  modalRequestSubmitting,
  modalRequestSuccessful,
  openCreateRow,
  openEditRow,
  openViewRow,
  searchFailed,
  searchRequest,
  searchResetSort,
  searchSelectPage,
  searchSetResultsPerPage,
  searchSetSortOrder,
  searchSetSortOrderAndSort,
  searchSort,
  searchSubmitting,
  searchSuccessful,
  submitCreate,
  submitDelete,
  submitUpdate,
} from '../../store/actions';
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
} from '../../store/actions/actionTypes';

describe('actions', () => {
  const dataType = 'dataType';
  const id = 999;
  const data = { id: '999', field1: 'f1data' };

  describe('modal', () => {
    it('openEditRow returns the right action type and payload', () => {
      const columnClicked = 'col';
      expect(openEditRow(data, columnClicked)).toMatchObject({
        type: MODAL_OPEN_EDIT_ROW_FORM,
        payload: { rowData: data, columnClicked },
      });
    });

    it('openCreateRow returns the right action type and payload', () => {
      expect(openCreateRow(dataType)).toMatchObject({
        type: MODAL_OPEN_CREATE_ROW_FORM,
        payload: dataType,
      });
    });

    it('openViewRow returns the right action type and payload', () => {
      expect(openViewRow(id)).toMatchObject({
        type: MODAL_OPEN_VIEW_ROW,
        payload: id,
      });
    });

    it('submitUpdateRequest returns the right action type and payload', () => {
      expect(submitUpdate(data)).toMatchObject({
        type: MODAL_SUBMIT_UPDATE,
        payload: data,
      });
    });

    it('modalRequestSubmitting returns the right action type and payload', () => {
      expect(modalRequestSubmitting()).toMatchObject({
        type: MODAL_SUBMITTING_REQUEST,
      });
    });

    it('modalRequestFailed returns the right action type and payload', () => {
      expect(modalRequestFailed()).toMatchObject({
        type: MODAL_REQUEST_FAILED,
      });
    });

    it('modalRequestFailed returns the right action type and payload', () => {
      expect(modalRequestSuccessful()).toMatchObject({
        type: MODAL_REQUEST_SUCCESSFUL,
      });
    });

    it('closeModal returns the right action type and payload', () => {
      expect(closeModal()).toMatchObject({
        type: MODAL_CLOSE,
      });
    });

    it('submitDelete returns the right action type and payload', () => {
      expect(submitDelete(data)).toMatchObject({
        type: MODAL_SUBMIT_DELETE,
        payload: data,
      });
    });

    it('submitCreate returns the right action type and payload', () => {
      expect(submitCreate(data)).toMatchObject({
        type: MODAL_SUBMIT_CREATE,
        payload: data,
      });
    });
  });

  describe('search', () => {
    it('searchSubmitting returns the right action type', () => {
      expect(searchSubmitting()).toMatchObject({
        type: SEARCH_SUBMITTING,
      });
    });

    it('searchSuccessful returns the right action type', () => {
      const results = ['results'];
      expect(searchSuccessful(results, dataType)).toMatchObject({
        type: SEARCH_SUCCESSFUL,
        payload: { results, dataType },
      });
    });

    it('searchFailed returns the right action type', () => {
      expect(searchFailed()).toMatchObject({
        type: SEARCH_FAILED,
      });
    });

    it('searchRequest returns the right action type and payload', () => {
      const formInputs = { formInputs: 'inputs' };
      expect(searchRequest(formInputs)).toMatchObject({
        type: SEARCH_REQUEST,
        payload: formInputs,
      });
    });

    it('searchSetSortOrder returns the right action type and payload', () => {
      const column = 'columnName';
      expect(searchSetSortOrder(column)).toMatchObject({
        type: SEARCH_SET_SORT,
        payload: column,
      });
    });

    it('searchSort returns the right action type and payload', () => {
      expect(searchSort()).toMatchObject({
        type: SEARCH_SORT,
      });
    });

    it('searchResetSort returns the right action type and payload', () => {
      expect(searchResetSort()).toMatchObject({
        type: SEARCH_RESET_SORT,
      });
    });

    it('searchResetSort returns the right action type and payload', () => {
      expect(searchSelectPage(5)).toMatchObject({
        type: SEARCH_SELECT_PAGE,
        payload: 5,
      });
    });

    it('searchSetSortAndSort returns the right action type and payload', () => {
      const column = 'columnName';
      expect(searchSetSortOrderAndSort(column)).toMatchObject({
        type: SEARCH_SET_SORT_AND_SORT,
        payload: column,
      });
    });

    it('searchSetSortAndSort returns the right action type and payload', () => {
      const resultsPerPage = '999';
      expect(searchSetResultsPerPage(resultsPerPage)).toMatchObject({
        type: SEARCH_SET_RESULTS_PER_PAGE,
        payload: resultsPerPage,
      });
    });

    it('updateData returns the right action type and payload', () => {
      const resultsPerPage = '999';
      expect(searchSetResultsPerPage(resultsPerPage)).toMatchObject({
        type: SEARCH_SET_RESULTS_PER_PAGE,
        payload: resultsPerPage,
      });
    });
  });
});
