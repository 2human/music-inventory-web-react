import { advancedSearchFields } from '../../components/SearchForm/form-fields/advancedSearch';
import { basicSearchFields } from '../../components/SearchForm/form-fields/basicSearch';
import { tableSelectFields } from '../../components/SearchForm/form-fields/tableSelect';
import { columnData } from '../../components/SearchResults/ResultTable/columnData';
import {
  SEARCH_FAILED,
  SEARCH_RESET_SORT,
  SEARCH_SELECT_PAGE,
  SEARCH_SET_RESULTS_PER_PAGE,
  SEARCH_SET_SORT,
  SEARCH_SORT,
  SEARCH_SUBMITTING,
  SEARCH_SUCCESSFUL,
} from '../actions/actionTypes';
import {
  selectedResultPage,
  sortProperties,
  sortResults,
} from './reducerHelpers';

const defaultState = {
  results: [],
  dataType: undefined,
  columnData,
  sortBy: { column: 'collection', order: 'ascending' },
  basicSearchFields: basicSearchFields,
  tableSelectFields: tableSelectFields,
  advancedSearchFields: advancedSearchFields,
  initialTable: 'sources',
  formInputs: {},
  status: undefined,
  error: false,
  resultsPerPageOptions: [10, 50, 100, 500],
  maxPageButtons: 8,
  resultsPerPage: 50,
  currentPage: 1,
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
        results: action.payload.results,
        dataType: action.payload.dataType,
      };
    case SEARCH_SET_SORT:
      return {
        ...state,
        sortBy: sortProperties(state.sortBy, action.payload),
      };
    case SEARCH_SORT:
      return {
        ...state,
        results:
          state.results === undefined
            ? undefined
            : sortResults(state.results, state.sortBy),
      };
    case SEARCH_RESET_SORT:
      return {
        ...state,
        sortBy: { column: 'collection', order: 'ascending' },
      };
    case SEARCH_SELECT_PAGE:
      return {
        ...state,
        currentPage: selectedResultPage(
          action.payload,
          state.currentPage
        ),
      };
    case SEARCH_SET_RESULTS_PER_PAGE:
      return {
        ...state,
        resultsPerPage: action.payload,
        currentPage: 1,
      };
    default:
      return state;
  }
};
