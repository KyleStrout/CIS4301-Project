import React from "react";
import { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { getNumbersInRange } from '../../helpers'

function Population(props) {
    const MAX_END_YEAR = 2009
    const MIN_BEGINNING_YEAR = 1990

    // Drop down data
    const [originABVList] = useState(props.originAbvs.map(abvs => abvs.ORIGINAL_AIRPORT))
    const [destABVList] = useState(props.destinationsAbvs.map(abvs => abvs.DESTINATION_AIRPORT))

    // Form Fields
    const [beginningYear, setBeginningYear] = useState(null)
    const [endYear, setEndYear] = useState(null)
    const [originABV, setOriginABV] = useState(null)
    const [destABV, setDestABV] = useState(null)

    // Form data
    const [validYears, setValidYears] = useState(null)
    const [validEndYears, setValidEndYears] = useState(null)
    const [chart, setChart] = useState(null)
    const [chart2, setChart2] = useState(null)

    // Query data
    const [populationData, setPopulationData] = useState(null)
    const [populationDataNum, setPopulationDataNum] = useState(null)

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
        if (populationData) {
            // Get our chart element
            let ctx = document.getElementById('myChart')

            // Create Labels
            let chartYears = []
            for (let index = beginningYear; index <= endYear; index++) {
                chartYears.push(index)
            }

            let popuData = []

            if (populationData) {
                for (let index = 0; index < populationData.length; index++) {
                    popuData.push(populationData[index].FLIGHTSSUM)
                }
            }

            // Initialize our chart
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartYears,
                    datasets: [{
                        label: originABV + ' to ' + destABV,
                        data: popuData,
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
                setChart(null)
            }
        }
    }, [populationData])// Listens for oracle data to update before creating chart

    function resetChart() {
        if (chart) {
            chart.destroy()
            setChart(null)
        }
    }

    useEffect(function () {
        if (populationDataNum) {
            // Get our chart element
            let ctx2 = document.getElementById('myChart2')

            // Create Labels
            let chartYears = []
            for (let index = beginningYear; index <= endYear; index++) {
                chartYears.push(index)
            }

            let popuNumData = []

            if (populationDataNum) {
                for (let index = 0; index < populationDataNum.length; index++) {
                    popuNumData.push(populationDataNum[index].POPULATION)
                }
            }

            // Initialize our chart
            let myChart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: chartYears,
                    datasets: [{
                        label: originABV + ' to ' + destABV,
                        data: popuNumData,
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
            setChart2(myChart2)
        }

        return () => {
            if (chart2) {
                chart2.destroy()
                setChart2(null)
            }
        }
    }, [populationDataNum])

    // clears chart

    function resetChart2() {
        if (chart2) {
            chart2.destroy()
            setChart2(null)
        }
    }

    async function getPopulation() {
        let url = `http://localhost:3001/population?beginningYear=${beginningYear}&endYear=${endYear}&originABV=${originABV}&destABV=${destABV}`
        await fetch(url).then(requestResponse => {
            requestResponse.json().then(json => {
                setPopulationData(json)
            })
        })
    }

    async function getPopulationNum() {
        let url = `http://localhost:3001/population-num?beginningYear=${beginningYear}&endYear=${endYear}&originABV=${originABV}&destABV=${destABV}`
        await fetch(url).then(requestResponse => {
            requestResponse.json().then(json => {
                setPopulationDataNum(json)
            })
        })
    }

    function handleBeginYearChange(value) {
        resetChart()
        resetChart2()
        setBeginningYear(value)
    }
    // Handle change for the 'end year' dropdown
    function handleEndYearChange(value) {
        resetChart()
        resetChart2()
        setEndYear(value)// set state
    }
    function handleOriginABVChange(value) {
        resetChart()
        resetChart2()
        setOriginABV(value)
    }
    function handleDestABVChange(value) {
        resetChart()
        resetChart2()
        setDestABV(value)
    }

    return (
        <React.Fragment>
            <div>
                <h3>Population</h3>
            </div>
            <div>
                <p>The local population trend visualization part would generate two broken line graphs according to the user inputs of original location,<br>
                </br>destination, start year, and end year.</p>
            </div>
            <div>
                <select onChange={(e) => { handleOriginABVChange(e.target.value) }}>
                    <option value="">Select Origin Abbreviation</option>
                    {
                        originABVList.map(function (airportAbv, index) {
                            return <option key={'start' + index} value={airportAbv}>{airportAbv}</option>
                        })
                    }
                </select>
                <select onChange={(e) => handleDestABVChange(e.target.value)}>
                    <option value="">Select Destination Abbreviation</option>
                    {
                        destABVList.map(function (airportAbv, index) {
                            return <option key={'start' + index} value={airportAbv}>{airportAbv}</option>
                        })
                    }
                </select>
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
                <button disabled={beginningYear && endYear ? false : true} onClick={() => { getPopulation(); getPopulationNum() }}>Show Flight Number and Population Trend</button>
            </div>
            <div>
                {populationData &&
                    <canvas id="myChart" width="80%" height="20%"></canvas>
                }
            </div>
                <br></br>
                <p>The first graph shows the total number of flights for each year from an origin airport to a destination.<br>
                </br>Through the line chart, we can see whether the number of routes is increasing or decreasing every year.</p>
            <div>
                {populationDataNum &&
                    <canvas id="myChart2" width="80%" height="20%"></canvas>}
            </div>
            <div>
                <p>The second chart demonstrates the trend in number of passengers between the given beginning and end year. </p>
            </div>
        </React.Fragment>
    );
}

export default Population