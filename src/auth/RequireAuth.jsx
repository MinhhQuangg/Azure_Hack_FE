import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/Unauthorized" />;
};
