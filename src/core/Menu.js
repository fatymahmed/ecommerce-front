import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'></li>
        <Link className='nav-link' style={isActive(history, "/")} to='/'>
          Home
        </Link>
        <Link
          className='nav-link'
          style={isActive(history, "/signin")}
          to='/signin'
        >
          Sign in
        </Link>
        <Link
          className='nav-link'
          style={isActive(history, "/signup")}
          to='/signup'
        >
          Sign up
        </Link>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
