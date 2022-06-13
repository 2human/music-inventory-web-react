import React from 'react';
import {
  ConnectedModalController,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/Modal/ModalController/ConnectedModalController';
import { ModalController } from '../../components/Modal/ModalController/ModalController';
import { closeModal } from '../../store/actions';
import { itMapsStateToProps } from '../connectorHelpers';
import { createConnectorShallowRenderer } from '../shallowHelpers';

describe('ConnectedResultsMessage', () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    modal: {
      modalOpen: 'modalopen',
      modalType: 'modaltype',
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it('connects the SingleRowForm component', () => {
    shallowRenderConnector(<ConnectedModalController />);
    expect(connectedChild()).toEqual(ModalController);
  });

  describe('mapStateToProps', () => {
    itMapsStateToProps(
      mapStateToProps(state),
      'modalOpen',
      state.modal.modalOpen
    );

    itMapsStateToProps(
      mapStateToProps(state),
      'modalType',
      state.modal.modalType
    );
  });

  describe('mapDispatchToProps', () => {
    it('maps the onDismiss action to closeModal', () => {
      expect(mapDispatchToProps).toMatchObject({
        onDismiss: closeModal,
      });
    });
  });
});
