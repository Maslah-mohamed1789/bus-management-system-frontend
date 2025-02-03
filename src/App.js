import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Buses from './components/Buses';
import Passengers from './components/Passengers';
import Routelines from './components/Routelines';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/passengers" element={<Passengers />} />
        <Route path="/routelines" element={<Routelines />} />
      </Routes>
    </Router>
  );
}

export default App;