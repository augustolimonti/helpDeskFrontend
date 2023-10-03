import React from 'react';
import './App.css';
import Nav from './Pages/Nav';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-light">
    <Router>
      <Nav/>
    </Router>
    </div>
  );
};

export default App;
