import { expectRedux, storeSpy } from 'expect-redux';
import React from 'react';
import 'whatwg-fetch';
import {
  createConnectorShallowRenderer,
  type,
} from '../shallowHelpers';
import { ConnectedSearchForm } from '../../components/SearchForm/ConnectedSearchForm';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SEARCH_REQUEST } from '../../store/actions/actionTypes';
import { createContainerWithStore } from '../domManipulators';
import { fetchResponseOk } from '../spyHelpers';
import {
  advancedFields,
  basicFields,
  replicateFormInputs,
  tableSelectFields,
} from './testFieldData';

describe('ConnectedSearchForm', () => {
  //full rendering
  let renderWithStore, submit, form, store;

  let shallowRenderConnector, connectedChild;

  const searchResults = {
    field1: 'field1value',
    field2: 'field2value',
  };

  const dataProps = {
    basicSearchFields: basicFields,
    advancedSearchFields: advancedFields,
    tableSelectFields: tableSelectFields,
    initialTable: tableSelectFields[0].value,
  };

  beforeEach(() => {
    ({ renderWithStore, submit, form, store } =
      createContainerWithStore());
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk({ searchResults }));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('connects the SearchForm component', () => {
    shallowRenderConnector(<ConnectedSearchForm {...dataProps} />);
    expect(connectedChild()).toEqual(SearchForm);
  });

  it('dispatches SEARCH_REQUEST when submitting search', async () => {
    renderWithStore(<ConnectedSearchForm {...dataProps} />);
    await submit(form('searchForm'));
    return expectRedux(store)
      .toDispatchAnAction()
      .matching({
        type: SEARCH_REQUEST,
        formInputs: replicateFormInputs(dataProps),
      });
  });
});
