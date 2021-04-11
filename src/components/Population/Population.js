import React from "react";
import { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Switch, Route, Link } from 'react-router-dom'
<style type="text/css"></style>

function Population(props) {
    const MAX_END_YEAR = 2009
    const MIN_BEGINNING_YEAR = 1990

    const [beginningYear, setBeginningYear] = useState(null)
    const [endYear, setEndYear] = useState(null)
    const [chart, setChart] = useState(null)
    const [validYears, setValidYears] = useState(null)
    const [validEndYears, setValidEndYears] = useState(null)
    const [oracleData, setOracleData] = useState(null)
    const [originABV, setOriginABV] = useState(null)
    const [destABV, setDestABV] = useState(null)
    const [populationPercentage, setPopulationPercentage] = useState(null)

    // Call on render, create a list of valid years
    // useEffect takes an inline function and list of variables it should listen to
    useEffect(function () {
        let newListOfYears = []
        // iterate through some time
        for (let index = MIN_BEGINNING_YEAR; index < MAX_END_YEAR; index++) {
            newListOfYears.push(index)
        }
        // Set the 'validYears' state to the new list of valid years
        setValidYears(newListOfYears)
    }, [])

    // if variables are updated, calls the inline function 
    useEffect(function () {
        let newEndYears = []
        for (let index = beginningYear; index < MAX_END_YEAR; index++) {
            newEndYears.push(index)
        }

        setValidEndYears(newEndYears)
    }, [beginningYear])

    useEffect(function () {
        setOriginABV()
    }, [])

    useEffect(function () {
        setDestABV()
    }, [])

    useEffect(function () {
        setPopulationPercentage()
    }, [])

    // Create Chart
    useEffect(function () {
        // Get our chart element
        let ctx = document.getElementById('myChart')

        // Create Labels 
        let chartYears = []
        for (let index = beginningYear; index <= endYear; index++) {
            chartYears.push(index)
        }
        // Initialize our chart
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartYears,
                datasets: [{
                    label: originABV + ' to ' + destABV,
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return () => {
            myChart.destroy()
        }
        setChart(myChart)
    }, [oracleData])// Listens for oracle data to update before creating chart

    // clears chart 
    function resetChart() {
        if (chart) {
            chart.destroy()
            setChart(null)
        }
    }

    // TODO: Create file to work with database and implement this here
    function callToOracle() {
        if (beginningYear && endYear) {
            let query = 'SELECT * FROM TABLE WHERE START_YEAR = ' + beginningYear + ' AND END_YEAR = ' + endYear
            setOracleData(query)
        }
    }

    function handleBeginYearChange(value) {
        resetChart()
        setBeginningYear(value)
    }
    // Handle change for the 'end year' dropdown
    function handleEndYearChange(value) {
        resetChart()
        setEndYear(value)// set state
    }

    return (
        <React.Fragment>
            <div>
                <h3>Population</h3>
            </div>
            <div>
                <h6>Origin Abbreviation</h6>
                <input onChange={event => setOriginABV(event.target.value)} />

            </div>
            <div>
                <h6>Destination Abbreviation</h6>
                <input onChange={event => setDestABV(event.target.value)} />
            </div>
            <div>
                {/* Pass a handleChange to the dropdown to handle when a value is selected */}
                {/* We have to do 'e.target.value' as the variable that gets passed to on change is an event */}
                <select onChange={(e) => { handleBeginYearChange(e.target.value) }}>
                    <option value="">Select Beginning Year</option>
                    {
                        // Loop over list of valid years, output options for the dropdown
                        validYears && validYears.map(function (year, index) {
                            return <option key={'start-' + index} value={year}>{year}</option>
                        })
                    }
                </select>
                {/* Disable this based on if we selected a 'beginningYear' with an inline if statement */}
                <select style={{ marginLeft: '5%' }} onChange={(e) => { handleEndYearChange(e.target.value) }} disabled={beginningYear ? false : true}>
                    <option value="">Select Ending Year</option>
                    {
                        validEndYears && validEndYears.map(function (year, index) {
                            return <option key={'end-' + index} value={year}>{year}</option>
                        })
                    }
                </select>
            </div>
            <div>
                {/* Disable the button if we dont have a beginning and end year selected */}
                <button disabled={beginningYear && endYear ? false : true} onClick={() => { callToOracle() }}>Calculate Flight Profitability</button>
            </div>
            <div>
                {oracleData &&
                    <canvas id="myChart" width="80%" height="20%"></canvas>
                }
            </div>
            <div>

                <p>Population Percentage Change: </p>
            </div>
        </React.Fragment>
    );
}

export default Population