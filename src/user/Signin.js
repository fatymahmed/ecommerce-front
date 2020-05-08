import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "tester@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, loading, error, redirectToReferer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      console.log("data is ", data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          redirectToReferer: false,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferer: true,
          });
        });
      }
    });
  };

  const signinForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange("email")}
          className='form-control'
          value={email}
        ></input>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange("password")}
          type='password'
          className='form-control'
          value={password}
        ></input>
      </div>

      <button onClick={clickSubmit} className='btn btn-primary'>
        Submit
      </button>
    </form>
  );

  const showError = () => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
  };

  return (
    <Layout
      title='Signin'
      description='Node React Ecommerce'
      className='container col-md-8 offset-md-2'
    >
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
