import { Routes, Route } from "react-router-dom";

import Login from "../components/login";
import Signin from "../components/signin";
import Navbar from "../components/navbar";
import HomeRouteWrapper from "../components/homewrapper";

export default function Router() {
  return (
    <>
      <div className="w-full md:w-[80vw] fixed z-9">
        <Navbar />
      </div>

      <div className="absolute grid place-items-center w-full h-full">
        <Routes>
          <Route path="/" element={<HomeRouteWrapper />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

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
