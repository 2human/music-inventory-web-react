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
  submitUpdate,
  updateResults,
} from '../../../store/actions';

describe('update', () => {
  let store;

  const data = { id: 999, melodicIncipit: 'melodicincipit' };

  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk());
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchSubmitUpdate = (data) =>
    store.dispatch(submitUpdate(data));

  it('sets current status to submitting', () => {
    dispatchSubmitUpdate(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestSubmitting());
  });

  it('submits request to the fetch api', async () => {
    dispatchSubmitUpdate(data);
    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/entries',
      {
        body: JSON.stringify(data),
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  });

  it('dispatches searchSuccessful on success', () => {
    dispatchSubmitUpdate(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestSuccessful());
  });

  it('dispatches updateRow on success', () => {
    dispatchSubmitUpdate(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(updateResults('edit', data));
  });

  it('dispatches modalRequestFailed on non-specific error', () => {
    window.fetch.mockReturnValue(fetchResponseError());
    dispatchSubmitUpdate(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestFailed());
  });
});
