import { Routes, Route } from "react-router-dom";
import Home from "../components/home";
import Login from "../components/login";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
