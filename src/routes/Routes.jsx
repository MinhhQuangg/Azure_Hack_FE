import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Error />} />
      </RouteComponent>
    </BrowserRouter>
  );
};
