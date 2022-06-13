import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../components/Modal/Modal';
import { ModalController } from '../../components/Modal/ModalController/ModalController';
import { ConnectedSingleRowForm } from '../../components/SingleRowForm/ConnectedSingleRowForm';
import { createShallowRenderer, id, type } from '../shallowHelpers';

describe('ModalController', () => {
  let shallowRender, elementMatching;

  beforeEach(() => {
    ({ shallowRender, elementMatching } = createShallowRenderer());

    ReactDOM.createPortal = jest.fn((element) => {
      return element;
    });
  });

  it('renders the empty #closedModal div when modalOpen is false', () => {
    shallowRender(<ModalController modalOpen={false} />);
    expect(elementMatching(id('#closedModal'))).not.toBeNull();
  });

  it('renders the Modal component when modalOpen is true', () => {
    shallowRender(<ModalController modalOpen={true} />);
    expect(elementMatching(type(Modal))).not.toBeNull();
  });

  it('renders the Modal component when modalOpen is true', () => {
    shallowRender(<ModalController modalOpen={true} />);
    expect(elementMatching(type(Modal))).not.toBeNull();
  });

  it('passes the ConnectedSingleRowForm component to the Modal as props when modalType is "edit"', () => {
    shallowRender(
      <ModalController modalOpen={true} modalType={'edit'} />
    );
    expect(elementMatching(type(Modal)).props.content).toEqual(
      <ConnectedSingleRowForm />
    );
  });

  it('passes the ConnectedSingleRowForm component to the Modal as props when modalType is "create"', () => {
    shallowRender(
      <ModalController modalOpen={true} modalType={'create'} />
    );
    expect(elementMatching(type(Modal)).props.content).toEqual(
      <ConnectedSingleRowForm />
    );
  });

  it('passes the ConnectedSingleRowForm component to the Modal as props when modalOpen is true', () => {
    const onDismissSpy = jest.fn();
    shallowRender(
      <ModalController
        modalOpen={true}
        modalType={'create'}
        onDismiss={onDismissSpy}
      />
    );
    expect(elementMatching(type(Modal)).props.onDismiss).toEqual(
      onDismissSpy
    );
  });
});
