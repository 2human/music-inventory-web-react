import React from 'react';
import { NavLinkList } from './NavLinkList';
import logo from '../../images/logo-small.jpg';

export const Navigation = () => {
  const links = ['Home', 'Search', 'Shop', 'About'];

  return (
    <NavigationContainer>
      <Logo />
      <NavLinkList links={links} />
      <DonateBtn />
    </NavigationContainer>
  );
};

const NavigationContainer = ({ children }) => {
  return <header className="navigation">{children}</header>;
};

const Logo = () => (
  <img
    src={logo}
    alt="Logo"
    className="navigation__logo"
    width="100"
  />
);

const DonateBtn = () => (
  <a id="donateBtn" className="btn btn--big" href="#">
    Donate
  </a>
);
