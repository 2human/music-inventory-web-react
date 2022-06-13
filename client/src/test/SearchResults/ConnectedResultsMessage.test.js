import React from 'react';
import {
  ConnectedResultsMessage,
  mapStateToProps,
} from '../../components/SearchResults/ResultsMessage/ConnectedResultMessage';
import { ResultsMessage } from '../../components/SearchResults/ResultsMessage/ResultsMessage';
import { itMapsStateToPropsWhenNoOwnProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';

describe('ConnectedResultsMessage', () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    search: {
      status: 'status',
      results: new Array(5),
      resultsPerPage: 'resultsperpage',
      currentPage: 'curpage',
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the ResultsMessage component', () => {
    shallowRenderConnector(<ConnectedResultsMessage />);
    expect(connectedChild()).toEqual(ResultsMessage);
  });

  describe('mapStateToProps', () => {
    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'status',
      state.search.status
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'totalResults',
      state.search.results.length
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'resultsPerPage',
      state.search.resultsPerPage
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'pageNumber',
      state.search.currentPage
    );
  });
});
