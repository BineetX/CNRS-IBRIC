import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./components/inputPage";
import OutputPage from "./components/outputPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/output" element={<OutputPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
