import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const DashBoard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='Card Header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase History</h3>
        <ul className='list-group'>
          <li className='list-group-item'>history</li>
        </ul>
      </div>
    );
  };
  return (
    <Layout
      className='container-fluid'
      title='Dashboard'
      description={`Good day ${name}`}
    >
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
