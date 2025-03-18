import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
<<<<<<< HEAD
import ChatRoom from "../pages/Room";
import ErrorPage from "../pages/Error";
=======
import { AuthProvider } from "../context/authContext";
>>>>>>> update_user

export const Routes = () => {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <RouteComponent>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Chat" element={<ChatRoom />} />
        <Route path="*" element={<ErrorPage />} />
      </RouteComponent>
=======
      <AuthProvider>
        <RouteComponent>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </RouteComponent>
      </AuthProvider>
>>>>>>> update_user
    </BrowserRouter>
  );
};
