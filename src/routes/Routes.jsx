import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";

import React from "react";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import { AuthProvider } from "../context/authContext";

export const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteComponent>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </RouteComponent>
      </AuthProvider>
    </BrowserRouter>
  );
};
