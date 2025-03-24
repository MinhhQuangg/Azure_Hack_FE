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
import Error from "../pages/Error";
import RequestJoin from "../components/chatroom/RequestJoin";
import WaitingApproval from "../components/chatroom/WaitingApproval";
import { AuthProvider } from "../context/authContext";
import Help from "../pages/Help";

export const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteComponent>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Chat" element={<ChatRoom />} />
          <Route path="/Help" element={<Help />} />
          <Route path="*" element={<Error />} />
        </RouteComponent>
      </AuthProvider>
    </BrowserRouter>
  );
};
