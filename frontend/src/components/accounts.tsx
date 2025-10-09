import axios from "axios";

import { UseBackend } from "../contexts/context";
import { useEffect, useState } from "react";

export default function Account() {
  const { backendURL, loggedIn, setLogin } = UseBackend();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getAccount = async () => {
      try {
        let req = await axios.get(`${backendURL}api/auth/me`, {
          withCredentials: true,
        });
        console.log("the result is", req.data.user.UserName);
        setLogin(req.data.success);
        setUserName(req.data.user.UserName);
      } catch (err) {
        console.error(err);
      }
    };
    getAccount();
  }, []);
  return (
    <>
      {loggedIn && (
        <div className="flex gap-x-2 items-center ">
          <div className="bg-[var(--primary-blue)] p-2 rounded-full size-8 flex justify-center items-center">
            {userName[0].toUpperCase()}
          </div>
          <p className="hidden sm:block">{userName}</p>
        </div>
      )}
      {/* <button>Create</button> */}
    </>
  );
}
