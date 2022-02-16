import React from "react";
import MainBody from "./Components/MainBody";
import Navbar from "./Components/Navbar";
import SkillState from "./Context/SkillState";

function App() {
  return (
    <>
      <SkillState>
        <Navbar />

        <MainBody />
      </SkillState>
    </>
  );
}

export default App;
