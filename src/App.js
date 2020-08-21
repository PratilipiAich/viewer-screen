import React from 'react';
import './App.css';
import LiveScore from './component/LiveScore'
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from './component/Header'
import Navbar from './component/Navbar';
import Teams from './component/Teams'
import TeamWisePlayer from './component/TeamWisePlayers'

import PlayerDisplay from './component/PlayerDisplay';
import ScoreCard from './component/ScoreCard';


function App() {
  return (     
      <Router>
      <Header aria-labelledby="cricket association for the blind in india" />
      <Navbar style={{position:"absolute",marginTop:"10px"}}/>
          <Route path="/viewer/LiveScore" component={LiveScore} />
          <Route path="/viewer/Teams" component={Teams} />
          <Route path="/viewer/TeamWisePlayers/:id" component={TeamWisePlayer} />
          <Route path="/viewer/Player/:id" component={PlayerDisplay} />
          <Route path="/viewer/ScoreCard/:id" component={ScoreCard} />
        </Router>
        
   
  );
}

export default App;