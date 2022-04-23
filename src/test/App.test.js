import React from 'react';
import { createShallowRenderer, type } from './shallowHelpers';
import App from '../components/App';
import { NavLinkList } from '../components/Navigation/NavLinkList';

describe('App', () => {
  let shallowRender, elementMatching;

  beforeEach(() => {
    ({ shallowRender, elementMatching } = createShallowRenderer());
  });

  const itDisplaysComponent = (component) => {
    it(`displays the ${component} component`, () => {
      shallowRender(<App />);
      expect(elementMatching(type(component))).not.toBeNull();
    });
  };

  itDisplaysComponent(NavLinkList);
});
