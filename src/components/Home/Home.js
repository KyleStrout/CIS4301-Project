import React from "react";
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

function Home(props) {
    return (
        <div>
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
                                    tourism
                                    </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/fuel-consumption" className="nav-link">
                                    Fuel consumption
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
                <h3>Home Page</h3>
            </div>
            <div>
                <h4>Application Overview</h4>
                <p>
                    In order to visually demonstrate trends pertaining to domestic air travel in the United States, we have created a web application that makes use of an integrated database of past information regarding flights and the airports they travel between. Such tracked trends include the profitability of flights, changes in city population, tourism, fuel consumption, and the general environmental impact of selected flights based on inputted values. Since our data spans a large period of time and includes information from many major airports from across the United States, users of the application can select specific time periods and locations to view results that best suit their goals or interests. For example, those interested in visualizing trends in flight path length changes over a specific period of years can enter the origin and destination airport abbreviations as well as the starting and ending years of the period of interest to generate a trend visualization.

                    Go ahead and give it a try! Click one of the links in the navigation bar to get started.
                </p>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="disclaimer">
                        <p><br></br>This data was provided courtesy of <a href="https://openflights.org/help/database.html">OpenFlights</a> and compiled by <a href="Kaggle.com">Kaggle.com</a> user <a href="https://www.kaggle.com/flashgordon/">flashgordon</a>. It can be found at the following <a href="https://www.kaggle.com/flashgordon/usa-airport-dataset">link</a></p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home