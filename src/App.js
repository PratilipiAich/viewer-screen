import React from 'react';
import './App.css';
import LiveScore from './component/LiveScore'
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from './component/Header'



function App() {
  return (     
      <Router>
      <Header />
          <Route path="/scorer/LiveScore" component={LiveScore} />
        </Router>
        
   
  );
}

export default App;
