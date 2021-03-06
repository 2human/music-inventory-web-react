import React from 'react';
import { ConnectedSingleRowForm } from '../../SingleRowForm/ConnectedSingleRowForm';
import { ConnectedSingleRowView } from '../../SingleRowView/ConnectedSingleRowView';
import Modal from '../Modal';

export const ModalController = ({
  modalOpen,
  modalType,
  onDismiss,
}) => {
  if (modalOpen) {
    let modalContent;
    switch (modalType) {
      case 'view':
        modalContent = <ConnectedSingleRowView />;
        break;
      case 'edit':
      case 'create':
      default:
        modalContent = <ConnectedSingleRowForm />;
    }

    return <Modal content={modalContent} onDismiss={onDismiss} />;
  } else return <div id="closedModal" />;
};

ModalController.defaultProps = {
  modalOpen: false,
};
