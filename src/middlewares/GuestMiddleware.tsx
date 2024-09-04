import { Navigate, Outlet } from "react-router-dom";
import useSWR from "swr";
import { authFetcher } from "../layouts/MainLayout";

export default function GuestMiddleware() {
  const { isLoading, error } = useSWR({ path: "/auth/profile" }, authFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return error ? <Outlet /> : <Navigate to="/account" />;
}
