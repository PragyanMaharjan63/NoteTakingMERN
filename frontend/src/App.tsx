import { useEffect } from "react";
import { BackendProvider, UseBackend } from "./contexts/context";
import Router from "./routes/routes";

function App() {
  const { checkAuth } = UseBackend();

  useEffect(() => {
    checkAuth(); // Check if user is authenticated on app load
  }, []);
  return (
    <BackendProvider>
      <div className="grid h-screen justify-items-center ">
        <div className="w-full md:w-[80vw] flex flex-col items-center">
          <Router />
        </div>
      </div>
    </BackendProvider>
  );
}

export default App;
