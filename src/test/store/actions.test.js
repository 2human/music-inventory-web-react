import {
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
} from '../../store/actions';
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
} from '../../store/actions/actionTypes';

describe('actions', () => {
  const dataType = 'dataType';
  const id = 999;

  it('openEditRow returns the right action type and payload', () => {
    const column = 'col';
    expect(openEditRow(id, column)).toMatchObject({
      type: MODAL_EDIT_ROW,
      payload: { id, column },
    });
  });

  it('openCreateRow returns the right action type and payload', () => {
    expect(openCreateRow(dataType)).toMatchObject({
      type: MODAL_CREATE_ROW,
      payload: dataType,
    });
  });

  it('openEditRow returns the right action type and payload', () => {
    expect(openViewRow(id)).toMatchObject({
      type: MODAL_VIEW_ROW,
      payload: id,
    });
  });

  it('openViewRow returns the right action type and payload', () => {
    expect(openViewRow(id)).toMatchObject({
      type: MODAL_VIEW_ROW,
      payload: id,
    });
  });

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
});
