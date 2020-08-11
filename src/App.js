import React from 'react';
import './App.css';
import Matches from './component/Matches'
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from './component/Header'



function App() {
  return (     
      <Router>
      <Header />
          <Route path="/scorer/Matches" component={Matches} />
        </Router>
        
   
  );
}

export default App;
