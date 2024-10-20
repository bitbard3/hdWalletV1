import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./constants/router";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
