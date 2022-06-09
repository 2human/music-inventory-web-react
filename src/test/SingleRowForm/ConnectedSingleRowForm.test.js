import React from 'react';
import {
  ConnectedSingleRowForm,
  mapStateToProps,
} from '../../components/SingleRowForm/ConnectedSingleRowForm';
import { SingleRowForm } from '../../components/SingleRowForm/SingleRowForm';
import { itMapsStateToProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';

describe('ConnectedResultsMessage', () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    modal: {
      fields: 'fieldsval',
      rowId: 999,
      status: 'statusval',
    },
    search: {
      data: [{ id: 999, field1: 'field1val' }],
    },
  };

  // updateRow:
  // deleteRow,
  // createRow,

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the SingleRowForm component', () => {
    shallowRenderConnector(<ConnectedSingleRowForm />);
    expect(connectedChild()).toEqual(SingleRowForm);
  });

  describe('mapStateToProps', () => {
    itMapsStateToProps(
      mapStateToProps(state),
      'fields',
      state.modal.fields
    );

    itMapsStateToProps(
      mapStateToProps(state),
      'data',
      state.search.data[0]
    );

    //returns undefined data when no row id
    itMapsStateToProps(
      mapStateToProps({
        search: { ...state.search },
        modal: { ...state.modal, rowId: undefined },
      }),
      'data',
      undefined
    );
  });
});
