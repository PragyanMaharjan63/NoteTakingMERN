import Navbar from "./components/navbar";
import { BackendURL } from "./contexts/context";

function App() {
  return (
    <BackendURL.Provider value={import.meta.env.VITE_BACKEND_URL}>
      <div className="grid h-screen justify-items-center bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-peach)] ">
        <div className="w-full md:w-[80vw] flex flex-col items-center">
          <div className="w-full">
            <Navbar />
          </div>
          <div>Hello world</div>
        </div>
      </div>
    </BackendURL.Provider>
  );
}

export default App;
