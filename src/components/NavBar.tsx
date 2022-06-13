import React from 'react';
import {Link} from 'react-router-dom'

export function NavBar() {
  

  return (
    <div className='NavBar'>
      <nav>
        <div className="nav-wrapper blue">
          <Link to="/"  className="brand-logo">Booking App</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li><a href="/login">Login</a></li> */}
        </ul>
        </div>
  </nav>
    </div>
  );
}
