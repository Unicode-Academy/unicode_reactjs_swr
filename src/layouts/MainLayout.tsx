import { Outlet } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
type User = {
  id: number;
  name: string;
  email: string;
  statusCode?: number;
};
interface ResponseError extends Error {
  status?: number;
}
export const authFetcher = async ({
  path,
  method = "GET",
}: {
  path: string;
  method?: string;
}) => {
  try {
    const url = `${import.meta.env.VITE_SERVER_API}${path}`;
    const token = JSON.parse(localStorage.getItem("user_token") ?? "{}");
    const response: User = await fetcher<User>(url, method, null, {
      Authorization: `Bearer ${token.access_token}`,
    });
    if (response.statusCode === 401) {
      const error: ResponseError = new Error("Unauthorized");
      error.status = response.statusCode;
      throw error;
    }
    return response;
  } catch (error) {
    const handleError = () => {
      throw error;
    };
    handleError();
  }
};
export default function MainLayout() {
  const { data, isLoading, error } = useSWR(
    {
      path: "/auth/profile",
    },
    authFetcher,
    {
      fallbackData: {} as User,
    }
  );

  //   if (error?.status === 401 && pathname !== "/login") {
  //     localStorage.removeItem("user_token");
  //     return <Navigate to="/login" />;
  //   }
  return (
    <>
      <header className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h2>Logo</h2>
            </div>
            <div className="col-9">
              <ul className="d-flex justify-content-end list-unstyled gap-2">
                {isLoading ? (
                  <span>Loading...</span>
                ) : !error ? (
                  <>
                    <li>Chào bạn: {data?.name}</li>
                    <li>
                      <a href="#">Đăng xuất</a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a href="#">Đăng nhập</a>
                    </li>
                    <li>
                      <a href="#">Đăng ký</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="py-3">
        <p className="text-center">Copyright &copy; by Unicode Academy</p>
      </footer>
    </>
  );
}
