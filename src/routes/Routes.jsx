import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ChatRoom from "../pages/Room";
import ErrorPage from "../pages/Error";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Chat" element={<ChatRoom />} />
        <Route path="*" element={<ErrorPage />} />
      </RouteComponent>
    </BrowserRouter>
  );
};
