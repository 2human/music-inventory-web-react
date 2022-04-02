import React from 'react';
import { NavLinkList } from './NavLinkList';
import logo from '../../assets/images/logo-small.jpg';

export const Navigation = () => {

  const links = ['Home', 'Search', 'Shop', 'About'];

  // console.log((<img
  //   src={'../../assets/images/logo-small.jpg'}
  //   alt="Logo" className="navigation__logo"
  //   width="100"
  //   />).props.src);

  return (
    <header className="navigation">
      <Logo />
      <NavLinkList links={links}/>
      <DonateBtn />
    </header>
  );
};

const Logo = () => <img
                      src={logo}
                      alt="Logo" className="navigation__logo"
                      width="100"
                    />

const DonateBtn = () => <a 
                          id="donateBtn"
                          className="btn btn--big"
                          href="#"
                        >
                          Donate
                        </a>




