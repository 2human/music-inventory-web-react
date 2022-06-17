import React from 'react';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { createContainer } from '../domManipulators';

describe('Dropdown', () => {
  let render, element, elements, click;

  const linkProps = [
    { name: 'l1', value: 'l1val' },
    { name: 'l2', value: 'l2val' },
  ];

  beforeEach(() => {
    ({ render, element, elements, click } = createContainer());
  });

  it('renders the dropdown container component', () => {
    render(<Dropdown />);
    expect(element('.dropdown')).not.toBeNull();
  });

  it('renders the dropdown parent link with the right text', () => {
    const parentText = 'parenttext';
    render(<Dropdown parentLink={parentText} />);
    const parentLink = element('.dropdown__parent');
    expect(parentLink).not.toBeNull();
    expect(parentLink.textContent).toEqual(parentText);
  });

  it('renders the dropdown links with the right text content', () => {
    render(<Dropdown links={linkProps} />);
    const links = elements('.dropdown__link');
    expect(links).toHaveLength(linkProps.length);
    expect(links[0].textContent).toEqual(linkProps[0].name);
    expect(links[1].textContent).toEqual(linkProps[1].name);
  });

  it('returns the value of the link clicked', () => {
    const linkCallbackSpy = jest.fn();
    render(
      <Dropdown
        links={linkProps}
        linkClickCallback={linkCallbackSpy}
      />
    );
    const links = elements('.dropdown__link');
    click(links[0]);
    expect(linkCallbackSpy).toHaveBeenCalledWith(linkProps[0].value);
  });
});
