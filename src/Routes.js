import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import DashBoard from "./user/UserDashboard";
import AdminDashBoard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <PrivateRoute path='/user/dashboard' exact component={DashBoard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashBoard} />
        <AdminRoute path='/create/category' exact component={AddCategory} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
