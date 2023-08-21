import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import MoonLinkPage from './pages/MoonLinkPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/moonlink/:username" element={<MoonLinkPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
