import React from 'react';
import { SearchResults } from '../../components/SearchResults/SearchResults';
import { itMapsStateToPropsWhenNoOwnProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';
import {
  ConnectedSearchResults,
  mapStateToProps,
} from '../../components/SearchResults/ConnectedSearchResults';

describe('ConnectedResultTable', () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    search: {
      status: 'stat',
      results: [0, 2, 3],
      resultsPerPage: 'resultsperpage',
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the SearchResults component', () => {
    shallowRenderConnector(<ConnectedSearchResults />);
    expect(connectedChild()).toEqual(SearchResults);
  });

  describe('mapStateToProps', () => {
    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'status',
      state.search.status
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'resultsLength',
      state.search.results.length
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(
        { ...state, search: { results: undefined } },
        {}
      ),
      'resultsLength',
      undefined
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps({ ...state }, {}),
      'resultsPerPage',
      state.search.resultsPerPage
    );
  });
});
