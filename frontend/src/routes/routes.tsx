import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { UseBackend } from "../contexts/context";

import Login from "../components/login";
import Signin from "../components/signin";
import Navbar from "../components/navbar";
import HomeRouteWrapper from "../components/homewrapper";

// Protects routes that require authentication
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { loggedIn } = UseBackend();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Protects auth pages - redirects if already logged in
function RequireGuest({ children }: { children: React.ReactNode }) {
  const { loggedIn } = UseBackend();

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function Router() {
  return (
    <>
      <div className="w-full md:w-[80vw] fixed z-9">
        <Navbar />
      </div>

      <div className="absolute grid place-items-center w-full h-full">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomeRouteWrapper />
              </RequireAuth>
            }
          />

          <Route
            path="/login"
            element={
              <RequireGuest>
                <Login />
              </RequireGuest>
            }
          />

          <Route
            path="/signin"
            element={
              <RequireGuest>
                <Signin />
              </RequireGuest>
            }
          />

          <Route
            path="*"
            element={
              <div className="h-screen flex flex-col items-center justify-center">
                <div className="font-bold text-9xl text-[var(--heading-dark)]">
                  404
                </div>
                <p className="text-[var(--heading-mid)]">page not found</p>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}
