import React from "react";
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

function Profitability(props) {

    const [beginningYear, setBeginningYear] = useState(null)
    const [endYear, setEndYear] = useState(null)
    const [validYears, setValidYears] = useState(null)
    const [validEndYears, setValidEndYears] = useState(null)
    const [oracleData, setOracleData] = useState(null)
    const [originABV, setOriginABV] = useState(null)
    const [destABV, setDestABV] = useState(null)
    const [title, setTitle] = useState('')




    return (
        <React.Fragment>
            <div>
                <h3>Profitability</h3>
            </div>
            <div>
                TODO Content here
            </div>
            <div>
                <input onChange={event => setOriginABV(event.target.value)} />
                <input onChange={event => setDestABV(event.target.value)} />
            </div>

            <div>
                <select>
                    <option>Select Beginning Year</option>
                </select>
                <select>
                    <option>Select Ending Year</option>
                </select>
            </div>
            <div>
                <button>Calculate Flight Profitability</button>
            </div>
        </React.Fragment>


    );
}

export default Profitability