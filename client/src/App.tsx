import { Outlet } from "react-router";

import "./App.css";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
