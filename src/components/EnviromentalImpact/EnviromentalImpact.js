import React from "react";
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react'
import { getNumbersInRange } from '../../helpers'

function EnviromentalImpact(props) {
    const MAX_END_YEAR = 2009
    const MIN_BEGINNING_YEAR = 1990

    // Form feilds
    const [beginningYear, setBeginningYear] = useState(null)
    const [endYear, setEndYear] = useState(null)

    // Form data
    const [validYears, setValidYears] = useState(null)
    const [validEndYears, setValidEndYears] = useState(null)
    const [chart, setChart] = useState(null)

    // Query data
    const [cO2EmissionData, setCO2EmissionData] = useState(null)

    // Get start Years
    useEffect(() => {
        let listOfvalidYears = getNumbersInRange(MIN_BEGINNING_YEAR, MAX_END_YEAR)
        setValidYears(listOfvalidYears)
    }, [])

    // Get End Years
    useEffect(function () {
        let listOfvalidYears = getNumbersInRange(beginningYear, MAX_END_YEAR)
        setValidEndYears(listOfvalidYears)
    }, [beginningYear])

    // Create Chart
    useEffect(function () {
        if (cO2EmissionData !== null) {
            // Get our chart element
            let ctx = document.getElementById('myChart')

            // Create Labels 
            let chartYears = []
            for (let index = beginningYear; index <= endYear; index++) {
                chartYears.push(index)
            }

            let cO2Data = []

            if (cO2EmissionData) {
                for (let index = 0; index < cO2EmissionData.length; index++) {
                    cO2Data.push(cO2EmissionData[index].CO2_KILOS)
                }
            }

            // Initialize our chart
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartYears,
                    datasets: [{
                        label: 'CO2 Emissions In Tonnes',
                        data: cO2Data,
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
            setChart(myChart)
        }
        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [cO2EmissionData])// Listens for oracle data to update before creating chart

    // clears chart 
    function resetChart() {
        if (chart) {
            chart.destroy()
            setChart(null)
        }
    }

    async function getCO2Emissions() {
        let url = `http://localhost:3001/enviromental-impact?beginningYear=${beginningYear}&endYear=${endYear}`
        await fetch(url).then(requestResponse => {
            requestResponse.json().then(json => {
                setCO2EmissionData(json)
            })
        })
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
                <h3>Enviromental Impact</h3>
            </div>
            <div>
                <p>By using a general formula to calculate the amount of emissions (metric tonnes CO2) produced by a group of flights,<br>
                </br>the environmental impact visualization illustrates any possible trends over a given range of years.</p>
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
                <button disabled={beginningYear && endYear ? false : true} onClick={() => { getCO2Emissions() }}>Calculate Enviromental Impact</button>
            </div>
            <div>
                {cO2EmissionData &&
                    <canvas id="myChart" width="80%" height="20%"></canvas>
                }
            </div>
            <br></br>
            <center><div class="col-sm-9">
                <div class="container">
	                <div class="card bg-light mb-3">
                        <h4 class="mb-0">
                            Formula Explanation:
			            </h4>
                        <div class="card-body">
                            <p>Initially, the calculations described on the fuel consumption query page are performed to estimate fuel consumed over a range of years.<br>
                            </br>Using the density of jet fuel, the weight of the consumed fuel may be derived. For every one kilogram of jet fuel burned, approximately<br>
                            </br>3.16 kg of carbon dioxide is released. This calculated amount of CO2 in kilograms is then divided by 1000 to deliver a result in metric tonnes.</p>
                        </div>
	                </div>
                </div>
            </div></center>
        </React.Fragment>
    );
}

export default EnviromentalImpact