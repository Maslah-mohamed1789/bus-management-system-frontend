import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/buses">Buses</Link></li>
        <li><Link to="/passengers">Passengers</Link></li>
        <li><Link to="/routelines">Routelines</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;