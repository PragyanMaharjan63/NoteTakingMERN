import { createContext, useContext } from "react";

export const BackendURL = createContext<string>(
  import.meta.env.VITE_BACKEND_URL
);
export function useBackendURL() {
  return useContext(BackendURL);
}
