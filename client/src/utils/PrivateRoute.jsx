import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const authed = Boolean(localStorage.getItem("token"));
  return authed ? children : <Navigate to="/login" />;
}
