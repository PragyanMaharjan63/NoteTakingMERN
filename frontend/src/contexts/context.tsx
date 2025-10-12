import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
interface BackendType {
  backendURL: string;
  loggedIn: boolean;
  setLogin: (value: boolean) => void;
  UserName: string;
  setUserName: (value: string) => void;
  authLoading: boolean;
  setAuthLoading: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const backendContext = createContext<BackendType>({
  backendURL: import.meta.env.VITE_BACKEND_URL,
  loggedIn: false,
  setLogin: () => {},
  UserName: "",
  setUserName: () => {},
  authLoading: true,
  setAuthLoading: () => {},
  checkAuth: async () => {},
  logout: async () => {},
});

export function BackendProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLogin] = useState(false);
  const [UserName, setUserName] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const checkAuth = async () => {
    setAuthLoading(true);
    try {
      let req = await axios.get(`${backendURL}api/auth/me`, {
        withCredentials: true,
      });

      setLogin(req.data.success);
      setUserName(req.data.user.UserName || "");
    } catch (err) {
      console.error(err);
      setLogin(false);
      setUserName("");
    }
    setAuthLoading(false);
  };

  useEffect(() => {
    checkAuth(); // call it on mount
  }, []);

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
    authLoading,
    setAuthLoading,
  };
  return (
    <backendContext.Provider value={value}>{children}</backendContext.Provider>
  );
}

export function UseBackend() {
  return useContext(backendContext);
}
