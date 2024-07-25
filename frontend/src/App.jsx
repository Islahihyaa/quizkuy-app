import React from "react";
import styles from "./style";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";

const App = () => (
  <div className="w-full overflow-hidden">
    <div className={``}>
      <div className={``}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-secondary pt-[84px] ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
  </div>
);

export default App;
