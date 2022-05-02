import { expectRedux, storeSpy } from 'expect-redux';
import React from 'react';
import 'whatwg-fetch';
import { ConnectedSearchForm } from '../../components/SearchForm/ConnectedSearchForm';
import { SEARCH_REQUEST } from '../../store/actions/actionTypes';
import {
  createContainerWithStore,
  withEvent,
} from '../domManipulators';
import {
  fetchResponseOk,
  requestURLOf,
  urlSearchParam,
} from '../spyHelpers';
import {
  advancedFields,
  basicFields,
  replicateFormInputs,
  tableSelectFields,
} from './testFieldData';

describe('ConnectedSearchForm', () => {
  let renderWithStore,
    submit,
    form,
    store,
    click,
    element,
    elements,
    change,
    field;

  const searchResults = {
    field1: 'field1value',
    field2: 'field2value',
  };

  beforeEach(() => {
    ({
      renderWithStore,
      submit,
      form,
      store,
      click,
      element,
      elements,
      submit,
      form,
      change,
      field,
    } = createContainerWithStore());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk({ searchResults }));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders the searchForm form', () => {
    renderWithStore(<ConnectedSearchForm />);
    expect(form('searchForm')).not.toBeNull();
  });

  it('dispatches SEARCH_REQUEST when submitting search', async () => {
    const initialTable = tableSelectFields[0].value;
    renderWithStore(
      <ConnectedSearchForm
        basicSearchFields={basicFields}
        advancedSearchFields={advancedFields}
        tableSelectFields={tableSelectFields}
        initialTable={initialTable}
      />
    );
    await submit(form('searchForm'));
    return expectRedux(store)
      .toDispatchAnAction()
      .matching({
        type: SEARCH_REQUEST,
        formInputs: replicateFormInputs(initialTable, advancedFields),
      });
  });
});
