import { createContext, useContext, useState, type ReactNode } from "react";
interface BackendType {
  backendURL: string;
  loggedIn: boolean;
  setLogin: (value: boolean) => void;
}

const backendContext = createContext<BackendType>({
  backendURL: import.meta.env.VITE_BACKEND_URL,
  loggedIn: false,
  setLogin: () => {},
});

export function BackendProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLogin] = useState(false);

  const value: BackendType = {
    backendURL: import.meta.env.VITE_BACKEND_URL,
    loggedIn,
    setLogin,
  };
  return (
    <backendContext.Provider value={value}>{children}</backendContext.Provider>
  );
}

export function UseBackend() {
  return useContext(backendContext);
}
