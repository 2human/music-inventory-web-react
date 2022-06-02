import React from 'react';
import {
  ConnectedResultsPerPage,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/SearchResults/ResultsPerPage/ConnectedResultsPerPage';
import { ResultsPerPage } from '../../components/SearchResults/ResultsPerPage/ResultsPerPage';
import { searchSetResultsPerPage } from '../../store/actions';
import { itMapsStateToPropsWhenNoOwnProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';

describe('ConnectedResultsPerPage', () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    search: {
      resultsPerPageOptions: [777, 888],
      resultsPerPage: [669],
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the ResultsPerPage component', () => {
    shallowRenderConnector(<ConnectedResultsPerPage />);
    expect(connectedChild()).toEqual(ResultsPerPage);
  });

  describe('mapStateToProps', () => {
    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'options',
      state.search.resultsPerPageOptions
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'selected',
      state.search.resultsPerPage
    );
  });

  describe('mapDispatchToProps', () => {
    it('maps the searchSetResultsPerPage action to handleCellDoubleClick', () => {
      expect(mapDispatchToProps).toMatchObject({
        handleOptionClick: searchSetResultsPerPage,
      });
    });
  });
});
