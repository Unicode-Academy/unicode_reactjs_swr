export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem("user_token");
  };
  return logout;
};
