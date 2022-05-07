import {
  itMaintainsExistingState,
  itSetsStatus,
} from '../reducerGenerators';
import {
  SEARCH_FAILED,
  SEARCH_REQUEST,
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

    itSetsStatus(searchReducer, action, 'SUBMITTING');
    itMaintainsExistingState(searchReducer, action);
  });

  describe('SEARCH_SUCCESSFUL action', () => {
    const action = {
      type: SEARCH_SUCCESSFUL,
      searchResults,
    };

    itSetsStatus(searchReducer, action, 'SUCCESSFUL');
    itMaintainsExistingState(searchReducer, action);

    it('sets searchResults to search results received', () => {
      expect(searchReducer(undefined, action)).toMatchObject({
        searchResults,
      });
    });
  });
});
