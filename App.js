import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from "./components/Home"
import Profitability from './components/Profitability';
import Population from './components/Population';
import Tourism from './components/Tourism';
import FuelConsumption from './components/Fuel Consumption';
import EnviromentalImpact from './components/Enviromental Impact';

function App() {
  return (
    <div className="App">
      <div>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/profitability'>
            <Profitability />
          </Route>
          <Route path='/population'>
            <Population />
          </Route>
          <Route path='/tourism'>
            <Tourism />
          </Route>
          <Route path='/fuel-consumption'>
            <FuelConsumption />
          </Route>
          <Route path='/environmental-impact'>
            <EnviromentalImpact />
          </Route>

        </Switch>
      </div>



    </div>
  );
}


export default App;
