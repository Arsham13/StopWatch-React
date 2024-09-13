import { useRef } from "react";
import Timer from "./components/Timer";
import Timer2 from "./components/Timer2";
import DarkMode from "./components/DarkMode";

function App() {

  return (
    <>
      <DarkMode />
      <div id="all">
        <Timer />
        <Timer2 />
      </div>
    </>
  );
}

export default App;
