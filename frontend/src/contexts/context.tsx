import axios from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";
interface BackendType {
  backendURL: string;
  loggedIn: boolean;
  setLogin: (value: boolean) => void;
  UserName: string;
  setUserName: (value: string) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const backendContext = createContext<BackendType>({
  backendURL: import.meta.env.VITE_BACKEND_URL,
  loggedIn: false,
  setLogin: () => {},
  UserName: "",
  setUserName: () => {},
  checkAuth: async () => {},
  logout: async () => {},
});

export function BackendProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLogin] = useState(false);
  const [UserName, setUserName] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const checkAuth = async () => {
    try {
      let req = await axios.get(`${backendURL}api/auth/me`, {
        withCredentials: true,
      });
      console.log("the result is", req.data.user.UserName);
      setLogin(req.data.success);
      setUserName(req.data.user.UserName);
    } catch (err) {
      console.error(err);
      setLogin(false);
      setUserName("");
    }
  };
  const logout = async () => {
    try {
      let req = await axios.post(
        `${backendURL}api/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log(req);
      setLogin(false);
      setUserName("");
    } catch (err) {
      console.error(err);
    }
  };

  const value: BackendType = {
    backendURL,
    loggedIn,
    setLogin,
    UserName,
    setUserName,
    checkAuth,
    logout,
  };
  return (
    <backendContext.Provider value={value}>{children}</backendContext.Provider>
  );
}

export function UseBackend() {
  return useContext(backendContext);
}
