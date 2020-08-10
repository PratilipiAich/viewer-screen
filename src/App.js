import React from 'react';
import logo from './logo.svg';
import './App.css';
import LiveScore from './component/LiveScore'
import {BrowserRouter as Router,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
          
          <Route path="/scorer/LiveScore" component={LiveScore} />
        </Router>
    </div>
  );
}

export default App;
