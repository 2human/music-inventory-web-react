import { expectRedux, storeSpy } from 'expect-redux';
import React from 'react';
import 'whatwg-fetch';
import { ConnectedSearchForm } from '../../components/SearchForm/ConnectedSearchForm';
import { SEARCH_REQUEST } from '../../store/actions/actionTypes';
import { createContainerWithStore } from '../domManipulators';
import { fetchResponseOk } from '../spyHelpers';
import {
  advancedFields,
  basicFields,
  tableSelectFields,
} from './testFieldData';

describe('ConnectedSearchForm', () => {
  let renderWithStore, submit, form, store;

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

  beforeEach(() => {
    ({ renderWithStore, submit, form, store } =
      createContainerWithStore());
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
    renderWithStore(<ConnectedSearchForm />);
    console.log('submitting');
    await submit(form('searchForm'));
    return expectRedux(store).toDispatchAnAction().matching({
      type: SEARCH_REQUEST,
      formInputs: formInputs,
    });
  });
});
