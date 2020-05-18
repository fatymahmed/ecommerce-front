import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, createOrder } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    instance: {},
    address: "",
  });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showSuccess = (success) => (
    <div
      className='alert alert-info'
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const handleCheckout = () => {
    const createOrderData = {
      products,
      amount: getTotal(),
      address: data.address,
    };
    createOrder(userId, token, createOrderData);
    emptyCart(() => {
      setRun(!run);
      console.log("payment success and empty cart");
      setData({
        success: true,
      });
    });
  };

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const showDropIn = () => (
    <div>
      {products.length > 0 ? (
        <div>
          <div className='gorm-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              className='form-control'
              onChange={handleAddress}
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button onClick={handleCheckout} className='btn btn-success'>
        Order
      </button>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      {showDropIn()}
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
