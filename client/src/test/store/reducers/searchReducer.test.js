import {
  itMaintainsExistingState,
  itSetsStatus,
} from '../../reducerHelpers';
import { searchReducer } from '../../../store/reducers/searchReducer';
import {
  searchFailed,
  searchResetSort,
  searchSelectPage,
  searchSetResultsPerPage,
  searchSetSortOrder,
  searchSort,
  searchSubmitting,
  searchSuccessful,
  updateResults,
} from '../../../store/actions';
import { columnData } from '../../../components/SearchResults/ResultTable/columnData';
import { basicSearchFields } from '../../../components/SearchForm/form-fields/basicSearch';
import { tableSelectFields } from '../../../components/SearchForm/form-fields/tableSelect';
import { advancedSearchFields } from '../../../components/SearchForm/form-fields/advancedSearch';
import {
  sortResults,
  updatedResults,
} from '../../../store/reducers/reducerHelpers';

describe('searchReducer', () => {
  const results = [
    { id: 998, field1: 'fieldvalue1' },
    { id: 999, field1: 'fieldvalue2' },
  ];

  it('returns a default state for an undefined existing state', () => {
    expect(searchReducer(undefined, {})).toEqual({
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
      totalPages: undefined,
    });
  });

  describe('searchSubmitting action', () => {
    itMaintainsExistingState(searchReducer, searchSubmitting());
    itSetsStatus(searchReducer, searchSubmitting(), 'SUBMITTING');
  });

  describe('searchFailed action', () => {
    itMaintainsExistingState(searchReducer, searchFailed());
    itSetsStatus(searchReducer, searchFailed(), 'FAILED');
  });

  describe('searchSuccessful action', () => {
    itMaintainsExistingState(
      searchReducer,
      searchSuccessful(results)
    );
    itSetsStatus(
      searchReducer,
      searchSuccessful(results),
      'SUCCESSFUL'
    );

    it('sets searchResults to search results received', () => {
      expect(
        searchReducer(undefined, searchSuccessful(results))
      ).toMatchObject({
        results,
      });
    });

    it('sets the dataType in accordance to the table searched', () => {
      const dataType = 'dataType';
      expect(
        searchReducer(undefined, searchSuccessful([], dataType))
      ).toMatchObject({
        dataType,
      });
    });
  });

  describe('searchSetSortOrder', () => {
    itMaintainsExistingState(searchReducer, searchSetSortOrder());

    it('sets the sort order to the column in ascending order by default', () => {
      const column = 'columnName';
      expect(
        searchReducer(undefined, searchSetSortOrder(column))
      ).toMatchObject({ sortBy: { column, order: 'ascending' } });
    });

    it('sets the sort order to the column in descending order if already sorting by it in ascending order', () => {
      const column = 'columnName';
      expect(
        searchReducer(
          { sortBy: { column, order: 'ascending' } },
          searchSetSortOrder(column)
        )
      ).toMatchObject({ sortBy: { column, order: 'descending' } });
    });
  });

  describe('searchSort', () => {
    itMaintainsExistingState(searchReducer, searchSort());

    it('sorts the data according to the sortBy props column', () => {
      const results = [
        { col1: 'data2' },
        { col1: 'data3' },
        { col1: 'data1' },
      ];

      const sortBy = { column: 'col1', order: 'ascending' };
      expect(
        searchReducer({ sortBy, results }, searchSort()).results
      ).toEqual(sortResults(results, sortBy));
    });
  });

  describe('searchResetSort', () => {
    itMaintainsExistingState(searchReducer, searchSort());

    it('sorts the data according to the sortBy props column', () => {
      const sortBy = { column: 'col1', order: 'ascending' };
      const defaultSortBy = {
        column: 'collection',
        order: 'ascending',
      };
      expect(
        searchReducer({ sortBy }, searchResetSort())
      ).toMatchObject({
        sortBy: defaultSortBy,
      });
    });
  });

  describe('searchResetSort', () => {
    itMaintainsExistingState(searchReducer, searchResetSort());

    it('sets the currentPage to the page number provided', () => {
      expect(
        searchReducer({ currentPage: 1 }, searchSelectPage(5))
      ).toMatchObject({ currentPage: 5 });
    });

    it('decrements the currentPage when "Previous" value is provided', () => {
      expect(
        searchReducer(
          { currentPage: 2 },
          searchSelectPage('Previous')
        )
      ).toMatchObject({ currentPage: 1 });
    });

    it('increments the currentPage when "Next" value is provided', () => {
      expect(
        searchReducer({ currentPage: 2 }, searchSelectPage('Next'))
      ).toMatchObject({ currentPage: 3 });
    });
  });

  describe('searchSetResultsPerPage', () => {
    itMaintainsExistingState(searchReducer, searchResetSort());

    it('sets resultsPerPage to the value provided', () => {
      expect(
        searchReducer(
          { resultsPerPage: 999 },
          searchSetResultsPerPage(888)
        )
      ).toMatchObject({ resultsPerPage: 888 });
    });

    it('sets the page number to one', () => {
      expect(
        searchReducer(
          { resultsPerPage: 999, currentPage: 4 },
          searchSetResultsPerPage(888)
        )
      ).toMatchObject({ currentPage: 1 });
    });
  });

  describe('updateResults', () => {
    itMaintainsExistingState(searchReducer, updateResults('', []));

    it('updates the edited result when updateType is "edit"', () => {
      const editedRow = { id: 999, field1: 'newvalue' };
      expect(
        searchReducer({ results }, updateResults('edit', editedRow))
      ).toMatchObject({
        results: updatedResults('edit', results, editedRow),
      });
    });
  });
});
