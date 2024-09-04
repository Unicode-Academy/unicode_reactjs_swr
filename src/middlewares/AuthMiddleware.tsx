import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  const isAuth: boolean = false;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
