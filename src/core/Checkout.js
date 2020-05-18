import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showSuccess = () => (
    <div className='alert alert-info' style={{ display: "" }}>
      Thank you for shopping with us, your order will be confirmed shortly
    </div>
  );

  const handleCheckout = () => {
    emptyCart(() => {
      setRun(!run);
      console.log("payment success and empty cart");
      showSuccess();
    });
  };

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
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
