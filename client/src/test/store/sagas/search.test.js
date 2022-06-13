import { storeSpy, expectRedux } from 'expect-redux';
import { configureStore } from '../../../store';
import 'whatwg-fetch';
import { requestURLObjectFrom } from '../../../store/sagas/sagaHelpers';
import {
  fetchResponseError,
  fetchResponseOk,
} from '../../spyHelpers';
import {
  searchFailed,
  searchRequest,
  searchResetSort,
  searchSelectPage,
  searchSort,
  searchSubmitting,
  searchSuccessful,
} from '../../../store/actions';

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

const searchResults = [
  { field1: 'field1value' },
  { field1: 'field2value' },
];

describe('search', () => {
  let store;

  beforeEach(() => {
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk(searchResults));
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchSearchRequest = (formInputs) =>
    store.dispatch(searchRequest(formInputs));

  it('sets current status to submitting', () => {
    dispatchSearchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSubmitting());
  });

  it('submits request to the fetch api', async () => {
    dispatchSearchRequest(formInputs);
    expect(window.fetch).toHaveBeenCalledWith(
      requestURLObjectFrom(formInputs)
    );
  });

  it('dispatches searchSuccessful on success', () => {
    dispatchSearchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSuccessful(searchResults, formInputs.table));
  });

  it('dispatches searchResetSort on success', () => {
    dispatchSearchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchResetSort());
  });

  it('dispatches searchSort on success', () => {
    dispatchSearchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSort());
  });

  it('dispatches searchSelectPage on success', () => {
    dispatchSearchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchSelectPage(1));
  });

  it('dispatches searchFailed on non-specific error', () => {
    window.fetch.mockReturnValue(fetchResponseError());
    dispatchSearchRequest(formInputs);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchFailed());
  });
});
