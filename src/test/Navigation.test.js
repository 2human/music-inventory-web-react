import React from 'react';
import { createContainer } from './domManipulators';
import { Navigation } from '../components/Navigation/Navigation';

//TODO add test for verifying logo source
describe('Navigation', () => {
  let render, element;

  beforeEach(() => {
    ({ render, element } = createContainer());
  });

  it('renders a navigation header element', () => {
    render(<Navigation />);
    expect(element('header.navigation')).not.toBeNull();
  });

  it('renders the navigation container within the header element', () => {
    render(<Navigation />);
    expect(element('header > nav.navlink-list')).not.toBeNull();
  });

  //TODO: fix this to check for props
  it('renders the link names within the navlink-list', () => {
    const links = ['Home', 'Search', 'Shop', 'About'];
    render(<Navigation />);
    const navLinkList = element('header > nav.navlink-list');
    expect(navLinkList.textContent).toContain(links[0]);
    expect(navLinkList.textContent).toContain(links[1]);
    expect(navLinkList.textContent).toContain(links[2]);
    expect(navLinkList.textContent).toContain(links[3]);
  });

  it('renders the logo image element', () => {
    render(<Navigation />);
    const logoElement = element('img.navigation__logo');
    expect(logoElement).not.toBeNull();
  });

  it('renders the donate button', () => {
    render(<Navigation />);
    expect(element('a#donateBtn.btn.btn--big')).not.toBeNull();
  });
});
