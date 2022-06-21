import React from 'react';
import {
  ConnectedSingleRowView,
  mapStateToProps,
} from '../../components/SingleRowView/ConnectedSingleRowView';
import { SingleRowView } from '../../components/SingleRowView/SingleRowView';
import { itMapsStateToProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';

describe('ConnectedResultsMessage', () => {
  let shallowRenderConnector, connectedChild;
  const state = {
    modal: {
      fields: {
        entries: { field1: 'field1val' },
      },
      dataType: 'entries',
      rowId: 999,
    },
    search: {
      results: [{ id: 999, field1: 'field1val' }],
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the SingleRowView component', () => {
    shallowRenderConnector(<ConnectedSingleRowView />);
    expect(connectedChild()).toEqual(SingleRowView);
  });

  describe('mapStateToProps', () => {
    itMapsStateToProps(
      mapStateToProps(state),
      'fields',
      state.modal.fields[state.modal.dataType]
    );

    itMapsStateToProps(
      mapStateToProps(state),
      'data',
      state.search.results[0]
    );
  });
});
