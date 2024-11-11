import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "../features/userSlice";

function ProtectedRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const { isLoggedin, loading } = useSelector((state) => state.users);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedin || localStorage.getItem("isLoggedin") === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoutes;
