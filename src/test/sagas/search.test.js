import { storeSpy, expectRedux } from 'expect-redux';
import { configureStore } from '../../store';
import {
  itMaintainsExistingState,
  itSetsStatus,
} from '../reducerGenerators';
import 'whatwg-fetch';
import {
  SEARCH_FAILED,
  SEARCH_REQUEST,
  SEARCH_SUBMITTING,
  SEARCH_SUCCESSFUL,
} from '../../store/actions/actionTypes';
import { reducer, search } from '../../store/sagas/search';
import { requestURLObjectFrom } from '../../store/sagas/searchHelpers';
import { fetchResponseError, fetchResponseOk } from '../spyHelpers';

const formInputs = {
  searchText: '',
  table: 'table',
  basicSearchSelection: ['basicSearch'],
  advancedSearchInputs: {
    field1: 'field1text',
    field2: 'field2text',
  },
  advancedSearchOn: false,
};

const searchResults = {
  field1: 'field1value',
  field2: 'field2value',
};

describe('search', () => {
  let store, fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.fn();
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk(searchResults));
    store = configureStore([storeSpy]);
  });

  const dispatchRequest = (formInputs) =>
    store.dispatch({
      type: SEARCH_REQUEST,
      formInputs,
    });

  it('sets current status to submitting', () => {
    dispatchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: SEARCH_SUBMITTING });
  });

  it('submits request to the fetch api', async () => {
    dispatchRequest(formInputs);
    expect(window.fetch).toHaveBeenCalledWith(
      requestURLObjectFrom(formInputs)
    );
  });

  it('dispatches SEARCH_SUCCESSFUL on success', () => {
    dispatchRequest(formInputs);
    expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: SEARCH_SUCCESSFUL, searchResults });
  });

  it('dispatches SEARCH_FAILED on non-specific error', () => {
    window.fetch.mockReturnValue(fetchResponseError());
    dispatchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: SEARCH_FAILED });
  });
});

describe('reducer', () => {
  it('returns a default state for an undefined existing state', () => {
    expect(reducer(undefined, {})).toEqual({
      formInputs: {},
      status: undefined,
      error: false,
    });
  });

  describe('SEARCH_SUBMITTING action', () => {
    const action = { type: SEARCH_SUBMITTING };

    itSetsStatus(reducer, action, 'SUBMITTING');
    itMaintainsExistingState(reducer, action);
  });

  describe('SEARCH_SUCCESSFUL action', () => {
    const action = {
      type: SEARCH_SUCCESSFUL,
      searchResults,
    };

    itSetsStatus(reducer, action, 'SUCCESSFUL');
    itMaintainsExistingState(reducer, action);

    it('sets searchResults to search results received', () => {
      expect(reducer(undefined, action)).toMatchObject({
        searchResults,
      });
    });
  });
});
