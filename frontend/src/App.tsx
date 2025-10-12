import { BackendProvider } from "./contexts/context";
import Router from "./routes/routes";

function App() {
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
