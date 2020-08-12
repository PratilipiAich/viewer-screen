import React from 'react';
import './App.css';
import LiveScore from './component/LiveScore'
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from './component/Header'
import Navbar from './component/Navbar'
import Teams from './component/Teams'
import TeamWisePlayer from './component/TeamWisePlayer'



function App() {
  return (     
      <Router>
      <Header aria-labelledby="cricket association for the blind in india" />
      <Navbar style={{padding : 0 }}/>
          <Route path="/viewer/LiveScore" component={LiveScore} />
          <Route path="/viewer/Teams" component={Teams} />
          <Route path="/viewer/TeamWisePlayer" component={TeamWisePlayer} />
        </Router>
        
   
  );
}

export default App;
