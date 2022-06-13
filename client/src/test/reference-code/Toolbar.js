import React from 'react';
import ReactDOM from 'react-dom';
import { Toolbar } from '../components/Toolbar/Toolbar';




describe('Toolbar', () => {

  let container;

  beforeEach(() => {
    container= document.createElement('div');
  });

  const render = component => ReactDOM.render(component, container);  

  const toolbar = () =>
    container.querySelector('div#toolbar'); 

  const tools = [
    { name: 'tool1' },
    { name: 'tool2' },
    { name: 'tool3' }
  ]

  it('renders a toolbar div', () => {
    render(<Toolbar />);
    expect(toolbar()).not.toBeNull();
  });

  it('renders a button for each tool', () => {    
    render(<Toolbar tools={tools}/>);
    const buttons = toolbar().querySelectorAll('button');
    expect(buttons).toHaveLength(tools.length);
  });

  it('displays the name of each tool inside its button', () => {  
    render(<Toolbar tools={tools}/>);
    const firstButton = toolbar().querySelector(
      'button:first-child'
    );
    const lastButton = toolbar().querySelector(
      'button:last-child'
    );
    expect(firstButton.textContent).toEqual(tools[0].name);
    expect(lastButton.textContent).
      toEqual(tools[tools.length - 1].name);

  });

});