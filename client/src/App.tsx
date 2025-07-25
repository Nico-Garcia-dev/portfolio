import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router";

import "./App.css";
import Navbar from "./components/navbar/navbar";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </>
  );
}

export default App;
