import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`} className='mr-2'>
        <button className='btn btn-outline-primary mt-2 mb-2'>
          View Product
        </button>
      </Link>
    );

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mt-2 mb-2'
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = (quantity) =>
    quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock</span>
    );

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Adjust Quantity</span>
          </div>
          <input
            type='number'
            className='form-control'
            value={count}
            onChange={handleChange(product._id)}
          />
          Increment
        </div>
      )
    );
  };

  return (
    <div className='card'>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
        <div className='product-body'>
          <h5 className='name'>{product.name}</h5>
          <p className='black-10'>KES {product.price}</p>
          {showStock(product.quantity)}
          <br />
          {showViewButton(showViewProductButton)}
          {showAddToCart(showAddToCartButton)}
          {showCartUpdateOptions(cartUpdate)}
          {showRemoveButton(showRemoveProductButton)}
        </div>
      </div>
    </div>
  );
};

export default Card;
