import Body from "./components/Body.js";
import { Toaster } from "react-hot-toast";
import MovieDialog from "./components/MovieDialog.js";

function App() {
  return (
    <>
      <div>
        <Body></Body>
        <Toaster></Toaster>
        <MovieDialog />
      </div>
    </>
  );
}

export default App;
