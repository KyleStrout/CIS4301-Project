import React from "react";
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

function EnviromentalImpact(props) {
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
                <h3>Enviromental Impact</h3>
            </div>
            <div>
                <select>
                    <option>Select Beginning Year</option>
                </select>
                <select style={{ marginLeft: '5%' }}>
                    <option>Select Ending Year</option>
                </select>
            </div>
            <div>
                <button>Calculate C02 Emmisions</button>
            </div>

        </div>


    );
}

export default EnviromentalImpact