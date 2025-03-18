import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";

import React from "react";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Home2 from "../pages/Home2";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ErrorPage2 from "../pages/Error2";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Home2 />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home2" element={<Home2 />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        {/* <Route path="*" element={<Error />} /> */}
        <Route path="*" element={<ErrorPage2 />} />
      </RouteComponent>
    </BrowserRouter>
  );
};
