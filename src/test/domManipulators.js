import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

export const createContainer = () => {
  
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  const container = document.createElement('div');
  const element = selector =>
      container.querySelector(selector);
  const elements = selector =>
      Array.from(container.querySelectorAll(selector));

  const simulateEvent = eventName => (element, eventData) =>
    ReactTestUtils.Simulate[eventName](element, eventData);

  const simulateEventAndWait = eventName => async (
    element,
    eventData
  ) =>
    await act(async () =>
      ReactTestUtils.Simulate[eventName](element, eventData)
    );


  return {
    render: component => ReactDOM.render(component, container),
    container,
    labelFor,
    element,
    elements,
    click: simulateEvent('click'),
    change: simulateEvent('change'),
    submit: simulateEventAndWait('submit')    
  };
};
