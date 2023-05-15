import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/searchPage.js';
import ShowPage from './components/showPage';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" Component={SearchPage}/>
            <Route path="/show/:id" Component={ShowPage}/>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
