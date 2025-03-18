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
import Signin2 from "../pages/Signin2";
import Signup2 from "../pages/Signup2";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Home2 />} />
        {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/Home" element={<Home2 />} />
        {/* <Route path="/Signin" element={<Signin />} /> */}
        <Route path="/Signin" element={<Signin2 />} />
        {/* <Route path="/Signup" element={<Signup />} /> */}
        <Route path="/Signup" element={<Signup2 />} />
        {/* <Route path="*" element={<Error />} /> */}
        <Route path="*" element={<ErrorPage2 />} />
      </RouteComponent>
    </BrowserRouter>
  );
};
