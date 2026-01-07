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
  checkAuth: () => Promise<void>;
  logout: () => void;
  login: (token: string, userName: string) => void;
}

const backendContext = createContext<BackendType>({
  backendURL: import.meta.env.VITE_BACKEND_URL,
  loggedIn: false,
  setLogin: () => {},
  UserName: "",
  setUserName: () => {},
  checkAuth: async () => {},
  logout: () => {},
  login: () => {},
});

export function BackendProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLogin] = useState(false);
  const [UserName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const login = (token: string, userName: string) => {
    localStorage.setItem("token", token);
    setLogin(true);
    setUserName(userName);
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLogin(false);
        setUserName("");
        setIsLoading(false);
        return;
      }

      let req = await axios.get(`${backendURL}api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (req.data.success) {
        setLogin(true);
        setUserName(req.data.user.UserName || "");
      } else {
        // Token is invalid
        localStorage.removeItem("token");
        setLogin(false);
        setUserName("");
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      setLogin(false);
      setUserName("");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    setUserName("");
  };

  // Check auth when provider mounts
  useEffect(() => {
    checkAuth();
  }, []);

  const value: BackendType = {
    backendURL,
    loggedIn,
    setLogin,
    UserName,
    setUserName,
    checkAuth,
    logout,
    login,
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <backendContext.Provider value={value}>{children}</backendContext.Provider>
  );
}

export function UseBackend() {
  return useContext(backendContext);
}
