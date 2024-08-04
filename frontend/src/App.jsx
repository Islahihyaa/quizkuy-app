import React from "react";
import styles from "./style";
import Navbar from "./components/layout/Navbar";
import { Outlet } from "react-router-dom";

const App = () => (
  <div className="w-full overflow-hidden">
    <Navbar />
    <div className="flex justify-center bg-secondary pt-24 min-h-screen">
      <div className={`${styles.boxWidth}`}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default App;
