import Navbar from "./components/navbar";
import { BackendProvider } from "./contexts/context";
import Router from "./routes/routes";

function App() {
  return (
    <BackendProvider>
      <div className="grid h-screen justify-items-center bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-peach)] ">
        <div className="w-full md:w-[80vw] flex flex-col items-center">
          <div className="w-full md:w-[80vw] fixed">
            <Navbar />
          </div>
          <Router />
        </div>
      </div>
    </BackendProvider>
  );
}

export default App;
