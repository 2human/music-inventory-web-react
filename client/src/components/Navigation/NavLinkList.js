import React from 'react';

export const NavLinkList = ({ links })=> {

  return (
    <nav
      id="headerNavigation"
      className="navlink-list"
      >
      <ul className='navlink-list__container'>
        {links.map( link => <NavLink key={link} link={link} />)}
      </ul>
    </nav>
  );
}

const NavLink = ({ link }) => {
  return (
    <li className="navlink-list__item">
      <a href="#" className="navlink-list__link">{link}</a>
    </li>
  );
}

NavLinkList.defaultProps = {
  links: ['Home', 'Search', 'Shop', 'About']
}
