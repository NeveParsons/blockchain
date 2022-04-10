import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
        </NavLink>
        <Bars />
        <NavMenu>
        <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/miner' activeStyle>
            Miner
          </NavLink>
          <NavLink to='/hacker' activeStyle>
            Hacker
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;