import React from "react";
import styles from "./style";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => (
  <div className="w-full overflow-hidden">
    <Navbar />

    <div className="bg-secondary pt-[84px] min-h-screen flex justify-center">
      <div className={`${styles.boxWidth}`}>
        <Outlet/>
      </div>
    </div>
  </div>
);

export default App;
