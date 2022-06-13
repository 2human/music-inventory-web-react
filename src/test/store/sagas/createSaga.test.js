import { storeSpy, expectRedux } from 'expect-redux';
import { configureStore } from '../../../store';
import 'whatwg-fetch';
import {
  fetchResponseError,
  fetchResponseOk,
} from '../../spyHelpers';
import {
  modalRequestFailed,
  modalRequestSubmitting,
  modalRequestSuccessful,
  submitCreate,
} from '../../../store/actions';

describe('createSaga', () => {
  let store;

  const data = { id: 999, melodicIncipit: 'melodicincipit' };

  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk());
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchCreate = (data) => store.dispatch(submitCreate(data));

  it('sets current status to submitting', () => {
    dispatchCreate(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestSubmitting());
  });

  it('submits request to the fetch api', async () => {
    dispatchCreate(data);

    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/entries',
      {
        body: JSON.stringify(data),
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  });

  it('dispatches searchSuccessful on success', () => {
    dispatchCreate(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestSuccessful());
  });

  it('dispatches modalRequestFailed on non-specific error', () => {
    window.fetch.mockReturnValue(fetchResponseError());
    dispatchCreate(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestFailed());
  });
});
