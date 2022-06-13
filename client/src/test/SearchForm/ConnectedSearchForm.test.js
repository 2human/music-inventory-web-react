import { expectRedux } from 'expect-redux';
import React from 'react';
import 'whatwg-fetch';
import {
  createConnectorShallowRenderer,
  type,
} from '../shallowHelpers';
import {
  ConnectedSearchForm,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/SearchForm/ConnectedSearchForm';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { createContainerWithStore } from '../domManipulators';
import { fetchResponseOk } from '../spyHelpers';
import {
  advancedFields,
  basicFields,
  replicateFormInputs,
  tableSelectFields,
} from './testFieldData';
import { searchRequest } from '../../store/actions';
import { itMapsStateToPropsWhenNoOwnProps } from '../connectorHelpers';

describe('ConnectedSearchForm', () => {
  //full rendering
  let renderWithStore, submit, form, store;

  let shallowRenderConnector, connectedChild;

  const searchResults = [
    {
      field1: 'field1value',
    },
    { field2: 'field2value' },
  ];

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
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('connects the SearchForm component', () => {
    shallowRenderConnector(<ConnectedSearchForm {...dataProps} />);
    expect(connectedChild()).toEqual(SearchForm);
  });

  it('dispatches searchRequest when submitting search', async () => {
    renderWithStore(<ConnectedSearchForm {...dataProps} />);
    await submit(form('searchForm'));
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(searchRequest(replicateFormInputs(dataProps)));
  });

  describe('mapStateToProps', () => {
    const state = {
      search: {
        basicSearchFields: 'basicfields',
        tableSelectFields: 'tablefields',
        advancedSearchFields: 'advancedfields',
      },
    };

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'basicSearchFields',
      state.search.basicSearchFields
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'advancedSearchFields',
      state.search.advancedSearchFields
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'tableSelectFields',
      state.search.tableSelectFields
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'initialTable',
      state.search.initialTable
    );

    const ownProps = {
      basicSearchFields: 'fields',
      tableSelectFields: 'tables',
      advancedSearchFields: 'advancedfields',
      initialTable: 'inittable',
    };

    it('maps ownProps to props when ownProps are defined', () => {
      expect(mapStateToProps({}, ownProps)).toMatchObject({
        ...ownProps,
      });
    });

    it('maps the searchRequest action to the searchRequest prop', () => {
      expect(mapDispatchToProps).toMatchObject({
        searchRequest,
      });
    });
  });
});
