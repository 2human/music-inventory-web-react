import { connect } from 'react-redux';
import { closeModal } from '../../../store/actions';
import { ModalController } from './ModalController';

export const mapStateToProps = (state) => ({
  modalOpen: state.modal.modalOpen,
  modalType: state.modal.modalType,
});

export const mapDispatchToProps = {
  onDismiss: closeModal,
};

export const ConnectedModalController = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalController);
