import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import "../styles.css";
import logo from "../logos.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#007bff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div className='navbar'>
      <div>
        {" "}
        <Link className='nav-link' style={isActive(history, "/")} to='/'>
          LELA BOOKSHOP
        </Link>
      </div>
      <ul className='nav navbar-expand-lg'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, "/shop")}
            to='/shop'
          >
            Shop
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, "/cart")}
            to='/cart'
          >
            Cart{" "}
            <sup>
              <small className='cart-badge'>{itemTotal()}</small>
            </sup>
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, "/admin/dashboard")}
              to='/admin/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, "/user/dashboard")}
              to='/user/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            {" "}
            <li className='nav-item'>
              {" "}
              <Link
                className='nav-link'
                style={isActive(history, "/signin")}
                to='/signin'
              >
                Sign in
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, "/signup")}
                to='/signup'
              >
                Sign up
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className='nav-item'>
            <span
              className='nav-link'
              style={{ cursor: "pointer", color: "#000000" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
