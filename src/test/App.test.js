import React from 'react';
import { createContainer } from "./domManipulators";
import App from '../components/App';

describe('App', () => {

  let render, element;  

  beforeEach(() => {
    ({ render, element } = createContainer());
  });

  it('renders the Navigation component', () => {
    render(<App />);
    const navComponent = element('.App > .navigation');
    expect(navComponent).not.toBeNull();
  });
});