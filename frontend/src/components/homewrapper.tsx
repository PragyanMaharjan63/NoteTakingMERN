import { Navigate } from "react-router-dom";
import Home from "./home";
import { UseBackend } from "../contexts/context";
import { useEffect, useState } from "react";

const HomeRouteWrapper = () => {
  const { loggedIn, checkAuth } = UseBackend();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return loggedIn ? <Home /> : <Navigate to="/login" replace />;
};
export default HomeRouteWrapper;
