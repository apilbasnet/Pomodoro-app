
import Timer from "./components/Timer";
import { DialogProvider } from "./context/DialogContext";

// import { DialogProvider, useMyContext } from "./context/DialogContext";

function App() {
  return (
    <>
    <DialogProvider>
      <Timer />
    </DialogProvider>
    
    </>
  );
}

export {};

export default App;
