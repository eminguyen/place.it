import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import './style.less';

const NavBar = () => {
  return (
    <nav className="map-nav-bar">
      <NavLink to="/">
        <p>home</p>
      </NavLink>
      <NavLink to="/">
        <p>projects</p>
      </NavLink>
      <img src={logo} />
      <NavLink to="/">
        <p>analytics</p>
      </NavLink>
      <NavLink to="/">
        <p>profile</p>
      </NavLink>
    </nav>
  );
};

export default NavBar;
