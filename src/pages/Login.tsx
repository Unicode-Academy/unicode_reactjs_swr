import React, { useState } from "react";
type FormData = {
  email: string;
  password: string;
};
export default function Login() {
  const [form, setForm] = useState<FormData>({} as FormData);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await sendRequestLogin();

    if (response.statusCode === 401) {
      alert(`Email hoặc mật khẩu không chính xác`);
      return;
    }

    localStorage.setItem("user_token", JSON.stringify(response));
  };
  const sendRequestLogin = async () => {
    try {
      const response: Response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      return response.json();
    } catch (e) {
      return e;
    }
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email..."
            onChange={handleChangeValue}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mật khẩu..."
            onChange={handleChangeValue}
            required
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary">Đăng nhập</button>
        </div>
      </form>
    </div>
  );
}
