import React, { useState } from "react";
import "./App.css";
import RainGrid from "./components/RainGrid.jsx";

function App() {
  const [speed, setSpeed] = useState(40);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rain Pattern Grid</h1>
        <div className="spreed">
          <label>Rain Speed</label>
          <input
            type="range"
            onChange={(e) => setSpeed(e.target.value)}
            min={0}
            max={90}
            value={speed}
          />
          <button onClick={() => setSpeed(40)}>Default</button>
        </div>
        <RainGrid
          rows={20}
          columns={15}
          addColorChances={0.05} // 0.05% chances
          gridSpeed={100 - speed}
          colorChangeSpeed={500} // 500 ms
        />
      </header>
    </div>
  );
}

export default App;
