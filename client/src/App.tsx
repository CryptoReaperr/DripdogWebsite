import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Team } from './components/Team';
import { Community } from './components/Community';
import { Roadmap } from './components/Roadmap';
import { Home } from './components/Home';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/community" element={<Community />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;