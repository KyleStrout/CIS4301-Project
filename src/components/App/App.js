import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import Home from "../Home"
import Profitability from '../Profitability';
import Population from '../Population';
import Tourism from '../Tourism';
import FuelConsumption from '../FuelConsumption';
import EnviromentalImpact from '../EnviromentalImpact';
import LoadingIcon from '../LoadingIcon';
import './App.css';

function App() {
  const [cities, setCities] = useState(null)
  const [destinationsAbvs, setDestinationsAbvs] = useState(null)
  const [originAbvs, setOriginAbvs] = useState(null)

  // Fetch cities
  useEffect(async () => {
    let citiesUrl = `http://localhost:3001/cities`
    let originUrl = `http://localhost:3001/airports/origin`
    let destinationUrl = `http://localhost:3001/airports/destination`

    await fetch(citiesUrl).then(requestResponse => {
      requestResponse.json().then(json => {
        setCities(json)
      })
        .catch(err => console.error(err))
    })
    await fetch(originUrl).then(requestResponse => {
      requestResponse.json().then(json => {
        setOriginAbvs(json)
      })
        .catch(err => console.error(err))

    })

    await fetch(destinationUrl).then(requestResponse => {
      requestResponse.json().then(json => {
        setDestinationsAbvs(json)
      })
        .catch(err => console.error(err))
    })
  }, [])


  const location = useLocation()
  const [pages] = useState([
    { To: '/', Content: 'Home' },
    { To: '/profitability', Content: 'Profitability' },
    { To: '/population', Content: 'Population' },
    { To: '/tourism', Content: 'Tourism' },
    { To: '/fuel-consumption', Content: 'Fuel Consumption' },
    { To: '/environmental-impact', Content: 'Environmental Impact' },
  ])

  return (
    <React.Fragment>
      <div className="App">
        <div>
          <h1>Multi-Faceted Impacts of Domestic Air Travel</h1>
          <h4>Group 25: Chason Pratt, Kaj Weigerink, Peter Huang, and Kyle Strout</h4>
        </div>

        <div>
          <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <ul className="navbar-nav ml auto">
            </ul>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mx-auto">
                {pages && pages.map(page => {
                  let isCurrentPage = location.pathname == page.To
                  return <li className="nav-item">
                    <Link to={page.To} className={`nav-link${isCurrentPage ? ' active' : ''}`}>{page.Content}</Link>
                  </li>
                })}
              </ul>
            </div>

          </nav>
        </div>
        <div>

          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            {!cities || !originAbvs || !destinationsAbvs && <LoadingIcon />}
            {cities !== null && originAbvs !== null && destinationsAbvs !== null &&
              <React.Fragment>
                <Route path='/profitability'>
                  {cities && originAbvs && destinationsAbvs && <Profitability airports={cities} originAbvs={originAbvs} destinationsAbvs={destinationsAbvs} />}
                </Route>
                <Route path='/population'>
                  {cities && originAbvs && destinationsAbvs && <Population airports={cities} originAbvs={originAbvs} destinationsAbvs={destinationsAbvs} />}
                </Route>
                <Route path='/tourism'>
                  {cities && originAbvs && destinationsAbvs && <Tourism airports={cities} originAbvs={originAbvs} destinationsAbvs={destinationsAbvs} />}
                </Route>
                <Route path='/fuel-consumption'>
                  {cities && originAbvs && destinationsAbvs && <FuelConsumption airports={cities} originAbvs={originAbvs} destinationsAbvs={destinationsAbvs} />}
                </Route>
                <Route path='/environmental-impact'>
                  {cities && originAbvs && destinationsAbvs && <EnviromentalImpact airports={cities} originAbvs={originAbvs} destinationsAbvs={destinationsAbvs} />}
                </Route>

              </React.Fragment>
            }

          </Switch>
        </div>


      </div>
      <footer className="site-footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="disclaimer">
              <p><br></br>This data was provided courtesy of <a href="https://openflights.org/help/database.html">OpenFlights</a> and compiled by <a href="Kaggle.com">Kaggle.com</a> user <a href="https://www.kaggle.com/flashgordon/">flashgordon</a>. It can be found at the following <a href="https://www.kaggle.com/flashgordon/usa-airport-dataset">link</a></p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment >
  );
}


export default App;
