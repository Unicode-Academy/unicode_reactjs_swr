import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import GuestMiddleware from "./middlewares/GuestMiddleware";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<GuestMiddleware />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthMiddleware />}>
          <Route path="/account" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}
