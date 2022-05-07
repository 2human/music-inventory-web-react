import {
  itMaintainsExistingState,
  itSetsStatus,
} from '../reducerHelpers';
import {
  SEARCH_SUBMITTING,
  SEARCH_SUCCESSFUL,
} from '../../store/actions/actionTypes';
import { searchReducer } from '../../store/reducers/searchReducer';

describe('searchReducer', () => {
  const searchResults = {
    field1: 'field1value',
    field2: 'field2value',
  };

  it('returns a default state for an undefined existing state', () => {
    expect(searchReducer(undefined, {})).toEqual({
      formInputs: {},
      status: undefined,
      error: false,
    });
  });

  describe('SEARCH_SUBMITTING action', () => {
    const action = { type: SEARCH_SUBMITTING };

    itMaintainsExistingState(searchReducer, action);
    itSetsStatus(searchReducer, action, 'SUBMITTING');
  });

  describe('SEARCH_SUCCESSFUL action', () => {
    const action = {
      type: SEARCH_SUCCESSFUL,
      searchResults,
    };

    itMaintainsExistingState(searchReducer, action);
    itSetsStatus(searchReducer, action, 'SUCCESSFUL');

    it('sets searchResults to search results received', () => {
      expect(searchReducer(undefined, action)).toMatchObject({
        searchResults,
      });
    });
  });
});
