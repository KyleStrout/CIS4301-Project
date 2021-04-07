import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from "./components/Home"

function App() {
  return (
    <div className="App">
      <h1>Multi-Faceted Impacts of Domestic Air Travel</h1>
      <h2>Group 25- Chason, Kaj, Peter, Kyle</h2>
      <div>
        <h1>Home Page</h1>
        <p>yo what up</p>
      </div>

      <nav class="navbar navbar-expand-sm bg-light navbar-light">
        <ul class="navbar-nav ml auto">
          Visualizations:
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

      <div>
        <select>
          <option>Select Beginning Year</option>
        </select>
        <select style={{ marginLeft: '5%' }}>
          <option>Select Ending Year</option>
        </select>
      </div>

      <div>
        <div style={{ float: 'left' }}>graph</div>
        <div style={{ float: 'right' }}>table</div>
      </div>
      <div>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='profitability'>
            <span>profitability</span>
          </Route>
          <Route path='/population'>
            <div id="wrapper">
              <div id="first">
                <h2>
                  Graph
        </h2>
                <div>
                  graph here
        </div>
              </div>
              <div id="second">
                <h2>
                  Table
      </h2>
                <div>
                  Table thing
      </div>
              </div>
            </div>
            <span>population</span>
          </Route>
          <Route path='/tourism'>
            <span>tourism</span>
          </Route>
          <Route path='/fuel-consumption'>
            <span>fuel-consumption</span>
          </Route>
          <Route path='/environmental-impact'>
            <span>environmental-impact</span>
          </Route>

        </Switch>
      </div>



    </div>
  );
}


export default App;
