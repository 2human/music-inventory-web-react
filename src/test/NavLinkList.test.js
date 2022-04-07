import React from 'react';
import { createContainer } from "./domManipulators";
import { NavLinkList } from '../components/Navigation/NavLinkList';

describe('NavLinkList', () => {
  
  let render, element, elements; 

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
  });  
  
  const links = ['link1', 'link2'];    
  
  it('renders the navlink-list nav element', () => {
    render(<NavLinkList />);
    expect(element('nav.navlink-list'))
      .not.toBeNull();
  });
  
  it('renders the navigation link list container', () => {
    render(<NavLinkList />);
    expect(element('nav > ul.navlink-list__container'))
      .not.toBeNull();
  });

  it('renders a list item for each link', () => {
    render(<NavLinkList links={links}/>);
    expect(elements('li.navlink-list__item'))
      .toHaveLength(links.length);
  });  

  it('renders an navlink anchor element within each list item', () => {
    render(<NavLinkList links={links} />);
    const renderedLinks = 
      elements('.navlink-list__item a.navlink-list__link');
    expect(renderedLinks).toHaveLength(links.length);
  });

  it('displays the name of each link within an anchor element', () => {
    render(<NavLinkList links={links}/>);
    const renderedLinks = 
      elements('.navlink-list__item a.navlink-list__link');
    expect(renderedLinks[0].textContent).toEqual(links[0]);      
    expect(renderedLinks[1].textContent).toEqual(links[1]);      
  });

});

