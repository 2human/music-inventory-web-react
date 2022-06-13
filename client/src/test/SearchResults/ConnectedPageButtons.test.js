import React from 'react';
import { itMapsStateToPropsWhenNoOwnProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';
import { PageButtons } from '../../components/SearchResults/PageButtons/PageButtons';
import {
  ConnectedPageButtons,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/SearchResults/PageButtons/ConnectedPageButtons';
import { searchSelectPage } from '../../store/actions';

describe('ConnectedPageButtons', () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    search: {
      maxPageButtons: 999,
      currentPage: 888,
      results: new Array(99),
      resultsPerPage: 50,
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the PageButtons component', () => {
    shallowRenderConnector(<ConnectedPageButtons />);
    expect(connectedChild()).toEqual(PageButtons);
  });

  describe('mapStateToProps', () => {
    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'maxButtons',
      state.search.maxPageButtons
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'currentPage',
      state.search.currentPage
    );

    itMapsStateToPropsWhenNoOwnProps(
      mapStateToProps(state, {}),
      'totalPages',
      Math.ceil(
        state.search.results.length / state.search.resultsPerPage
      )
    );
  });

  describe('mapDispatchToProps', () => {
    it('maps the searchSelectPage action to handleButtonClick', () => {
      expect(mapDispatchToProps).toMatchObject({
        handleButtonClick: searchSelectPage,
      });
    });
  });
});
