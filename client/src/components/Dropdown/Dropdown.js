import React from 'react';

export const Dropdown = ({
  parentLink,
  links,
  linkClickCallback,
}) => (
  <div className="dropdown">
    <DropdownParentLink text={parentLink} />
    {links.map((link) => (
      <DropdownLink
        link={link}
        key={link.value}
        handleLinkClick={linkClickCallback}
      />
    ))}
  </div>
);

const DropdownParentLink = ({ text }) => (
  <div className="btn-text dropdown__parent">
    {text}
    <i className="down-arrow btn-text__down-arrow" />
  </div>
);

const DropdownLink = ({ link, handleLinkClick }) => (
  <div
    className="btn-text dropdown__link"
    key="link"
    onClick={() => handleLinkClick(link.value)}>
    {link.name}
  </div>
);

Dropdown.defaultProps = {
  parent: '',
  links: [],
  linkClickCallback: () => {},
};
