import { Outlet } from "react-router-dom";

export default function MainLayout() {
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
                <li>
                  <a href="#">Đăng nhập</a>
                </li>
                <li>
                  <a href="#">Đăng ký</a>
                </li>
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
