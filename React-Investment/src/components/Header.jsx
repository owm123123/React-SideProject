import React from 'react';
import logo from '../assets/investment-calculator-logo.png';

const Header = () => {
  return (
    <div id="header">
      <img src={logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </div>
  );
};

export default Header;
