import React from 'react';
import {
  ConnectedSingleRowForm,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/SingleRowForm/ConnectedSingleRowForm';
import { SingleRowForm } from '../../components/SingleRowForm/SingleRowForm';
import { itMapsStateToProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';
import {
  submitCreate,
  submitDelete,
  submitUpdate,
} from '../../store/actions';

describe('ConnectedResultsMessage', () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    modal: {
      fields: {
        entries: { field1: 'field1val' },
      },
      rowId: 999,
      status: 'statusval',
      dataType: 'entries',
    },
    search: {
      results: [{ id: 999, field1: 'field1val' }],
    },
  };

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
      state.modal.fields[state.modal.dataType]
    );

    itMapsStateToProps(
      mapStateToProps(state),
      'data',
      state.search.results[0]
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

    itMapsStateToProps(
      mapStateToProps(state),
      'status',
      state.modal.status
    );
  });

  describe('mapDispatchToProps', () => {
    it('maps the updateRow action to submitUpdate', () => {
      expect(mapDispatchToProps).toMatchObject({
        updateRow: submitUpdate,
      });
    });

    it('maps the deleteRow action to submitDelete', () => {
      expect(mapDispatchToProps).toMatchObject({
        deleteRow: submitDelete,
      });
    });

    it('maps the createRow action to submiteCreate', () => {
      expect(mapDispatchToProps).toMatchObject({
        createRow: submitCreate,
      });
    });
  });
});
