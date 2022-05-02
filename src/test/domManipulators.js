import ReactDOM from 'react-dom';
import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { storeSpy } from 'expect-redux';
import { configureStore } from '../store';

export const createContainer = () => {
  const labelFor = (formElement) =>
    container.querySelector(`label[for="${formElement}"]`);
  const inputsOfType = (inputType) =>
    elements(`input[type="${inputType}"]`);

  const container = document.createElement('div');
  const element = (selector) => container.querySelector(selector);
  const elements = (selector) =>
    Array.from(container.querySelectorAll(selector));
  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const field = (formId, name) => form(formId).elements[name];

  const simulateEvent = (eventName) => (element, eventData) =>
    ReactTestUtils.Simulate[eventName](element, eventData);

  const simulateEventAndWait =
    (eventName) => async (element, eventData) =>
      await act(async () =>
        ReactTestUtils.Simulate[eventName](element, eventData)
      );

  return {
    render: (component) => ReactDOM.render(component, container),
    container,
    labelFor,
    inputsOfType,
    element,
    elements,
    click: simulateEvent('click'),
    change: simulateEvent('change'),
    submit: simulateEventAndWait('submit'),
    field,
    form,
  };
};

export const createContainerWithStore = () => {
  const store = configureStore([storeSpy]);

  const container = createContainer();
  return {
    ...container,
    store,
    renderWithStore: (component) => {
      act(() => {
        ReactDOM.render(
          <Provider store={store}>{component}</Provider>,
          container.container
        );
      });
    },
  };
};

export const withEvent = (name, value) => ({
  target: { name, value },
});
