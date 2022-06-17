import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ content, onDismiss }) => {
  return ReactDOM.createPortal(
    <div id="modalContainer" className="modal" onClick={onDismiss}>
      <div
        id="modalContent"
        onClick={(e) => e.stopPropagation()}
        className="modal__content">
        {content}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

Modal.defaultProps = {
  onDismiss: () => {},
};

export default Modal;
