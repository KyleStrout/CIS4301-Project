import './App.css';
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from "../Home"
import Profitability from '../Profitability';
import Population from '../Population';
import Tourism from '../Tourism';
import FuelConsumption from '../FuelConsumption';
import EnviromentalImpact from '../EnviromentalImpact';

function App() {

  return (
    <div className="App">
      <div>
        <h1>Multi-Faceted Impacts of Domestic Air Travel</h1>
        <h4>Group 25: Chason Pratt, Kaj Weigerink, Peter Huang, and Kyle Strout</h4>
      </div>

      <div>
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
          <ul class="navbar-nav ml auto">
          </ul>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <Link to='/' className="nav-link">
                  Home
              </Link>
              </li>
              <li class="nav-item">

                <Link to="/profitability" className="nav-link">
                  Profitability
              </Link>
              </li>
              <li class="nav-item">
                <Link to="/population" className="nav-link">
                  Population
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/tourism" className="nav-link">
                  Tourism
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/fuel-consumption" className="nav-link">
                  Fuel Consumption
              </Link>
              </li>
              <li class="nav-item">
                <Link to="/environmental-impact" className="nav-link">
                  Enviromental Impact
              </Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>
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
