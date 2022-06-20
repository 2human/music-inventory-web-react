import { storeSpy, expectRedux } from 'expect-redux';
import { configureStore } from '../../../store';
import 'whatwg-fetch';
import {
  fetchResponseError,
  fetchResponseOk,
} from '../../spyHelpers';
import {
  closeModal,
  modalRequestFailed,
  modalRequestSubmitting,
  modalRequestSuccessful,
  submitDelete,
  updateResults,
} from '../../../store/actions';

describe('deleteSaga', () => {
  let store;

  const data = { id: 999, melodicIncipit: 'melodicincipit' };

  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk());
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchDelete = (data) => store.dispatch(submitDelete(data));

  it('sets current status to submitting', () => {
    dispatchDelete(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestSubmitting());
  });

  it('submits request to the fetch api', async () => {
    dispatchDelete(data);

    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/entries',
      {
        body: JSON.stringify(data),
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  });

  it('dispatches searchSuccessful on success', () => {
    dispatchDelete(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestSuccessful());
  });

  it('dispatches updateResult on success', () => {
    dispatchDelete(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(updateResults('delete', data));
  });

  it('dispatches closeModal on success', () => {
    dispatchDelete(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(closeModal());
  });

  it('dispatches modalRequestFailed on non-specific error', () => {
    window.fetch.mockReturnValue(fetchResponseError());
    dispatchDelete(data);
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(modalRequestFailed());
  });
});
