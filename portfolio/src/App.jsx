import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
