import { LogOut, User } from "lucide-react";
import { UseBackend } from "../contexts/context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { checkAuth, UserName, loggedIn, logout } = UseBackend();
  const [showdropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      {loggedIn && (
        <div
          className="flex gap-x-2 items-center cursor-pointer"
          onClick={() => setDropdown((prev) => !prev)}
        >
          <div className="bg-[var(--primary-blue)] p-2 rounded-full size-8 flex justify-center items-center">
            {UserName[0].toUpperCase()}
          </div>
          <p className="hidden sm:block select-none">{UserName}</p>
        </div>
      )}
      <div
        className={`flex justify-center transition-all ${
          showdropdown ? "block" : "hidden"
        }`}
      >
        <ul>
          <li
            className="flex gap-3 bg-neutral-200 py-1 px-4 rounded-lg cursor-pointer"
            onClick={() => {
              logout();
              setDropdown(false);
            }}
          >
            Logout
            <LogOut />
          </li>
        </ul>
      </div>
      {!loggedIn && (
        <div
          className="flex gap-3 items-center"
          onClick={() => navigate("/signin")}
        >
          <div className="bg-[var(--primary-lavendar)] p-2 rounded-full size-8 flex justify-center items-center">
            <User />
          </div>
          <p>Sign in</p>
        </div>
      )}
    </>
  );
}
