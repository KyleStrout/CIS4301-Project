import React from "react";
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react'
import { getNumbersInRange } from '../../helpers'

function FuelConsumption(props) {
    const MAX_END_YEAR = 2009
    const MIN_BEGINNING_YEAR = 1990

    // Form Fields
    const [beginningYear, setBeginningYear] = useState(null)
    const [endYear, setEndYear] = useState(null)

    const [chart, setChart] = useState(null)
    // Form data
    const [validYears, setValidYears] = useState(null)
    const [validEndYears, setValidEndYears] = useState(null)

    // Query data
    const [fuelConsumptionData, setFuelConsumptionData] = useState(null)

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
        if (fuelConsumptionData !== null) {
            // Get our chart element
            let ctx = document.getElementById('myChart')

            // Create Labels 
            let chartYears = []
            for (let index = beginningYear; index <= endYear; index++) {
                chartYears.push(index)
            }
            let fuelData = []

            if (fuelConsumptionData) {
                for (let index = 0; index < fuelConsumptionData.length; index++) {
                    fuelData.push(fuelConsumptionData[index].FUEL_USED)
                }
            }

            // Initialize our chart
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartYears,
                    datasets: [{
                        label: 'Litres Of Fuel Used Per Year',
                        data: fuelData,
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
    }, [fuelConsumptionData])// Listens for fuelConsumptionData to update before creating chart

    // clears chart 
    function resetChart() {
        if (chart) {
            chart.destroy()
            setChart(null)
        }
    }

    async function getFuelConsumption() {
        let url = `http://localhost:3001/fuel-consumption?beginningYear=${beginningYear}&endYear=${endYear}`
        await fetch(url).then(requestResponse => {
            requestResponse.json().then(json => {
                setFuelConsumptionData(json)
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
                <h3>Fuel Consumption</h3>
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
                <button disabled={beginningYear && endYear ? false : true} onClick={() => { getFuelConsumption() }}>Calculate Fuel Consumption</button>
            </div>
            <div>
                {fuelConsumptionData &&
                    <canvas id="myChart" width="80%" height="20%"></canvas>
                }
            </div>
        </React.Fragment >
    );
}

export default FuelConsumption