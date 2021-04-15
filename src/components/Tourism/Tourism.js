import React from "react";
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Chart from 'chart.js/auto';
import { getNumbersInRange } from '../../helpers'

function Tourism(props) {
    const MAX_END_YEAR = 2009
    const MIN_BEGINNING_YEAR = 1990
    const [cityList] = useState(props.airports.map(airport => airport.CITY))

    // Form Fields
    const [beginningYear, setBeginningYear] = useState(null)
    const [endYear, setEndYear] = useState(null)
    const [city, setCity] = useState(null)

    // Form data
    const [validYears, setValidYears] = useState(null)
    const [validEndYears, setValidEndYears] = useState(null)
    const [chart, setChart] = useState(null)
    const [chart2, setChart2] = useState(null)

    // Query results
    const [tourismData, setTourismData] = useState(null)
    const [monthlyData, setMonthlyData] = useState(null)

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
        if (tourismData !== null) {
            // Get our chart element
            let ctx = document.getElementById('myChart')

            // Create Labels 
            let chartYears = []
            for (let index = beginningYear; index <= endYear; index++) {
                chartYears.push(index)
            }

            let tourismFormattedData = []
            for (let index = 0; index < tourismData.length; index++) {
                tourismFormattedData.push(tourismData[index].TOTAL_TRAVELERS)
            }

            // Initialize our chart
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartYears,
                    datasets: [{
                        label: `Total Travelers Into ${city} Per Year`,
                        data: tourismFormattedData,
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
                            beginAtZero: true,

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


    }, [tourismData])// Listens for oracle data to update before creating chart

    function resetChart() {
        if (chart) {
            chart.destroy()
            setChart(null)
        }
    }

    useEffect(function () {
        if (monthlyData !== null) {
            // Get our chart element
            let ctx2 = document.getElementById('myChart2')

            // Create Labels 
            let chartYears = []
            for (let index = beginningYear; index <= endYear; index++) {
                chartYears.push(index)
            }

            let mData = []
            if (monthlyData) {
                for (let index = 0; index < monthlyData.length; index++) {
                    mData.push(monthlyData[index].AVG_PER_MONTH)
                }
            }

            mData.forEach(member => {
                console.log(member)
            });


            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
            // Initialize our chart
            let myChart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: months,
                    datasets: [{
                        label: `Most Popular Months To Travel To ${city} For All The Years`,
                        data: mData,
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
                            beginAtZero: true,

                        }
                    }
                }
            });
            setChart2(myChart2)
        }

        return () => {
            if (chart2) {
                chart2.destroy()
            }
        }

    }, [monthlyData])

    function resetChart2() {
        if (chart2) {
            chart2.destroy()
            setChart2(null)
        }
    }

    async function getTourismData() {
        let url = `http://localhost:3001/tourism?beginningYear=${beginningYear}&endYear=${endYear}&city=${city}`
        await fetch(url).then(requestResponse => {
            requestResponse.json().then(json => {
                setTourismData(json)
            })
        })
    }

    async function getAverageMonthlyTourismData() {
        let url = `http://localhost:3001/tourism-monthly?beginningYear=${beginningYear}&endYear=${endYear}&city=${city}`
        await fetch(url).then(requestResponse => {
            requestResponse.json().then(json => {
                setMonthlyData(json)
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
        setEndYear(value)
        // set state
    }

    function handleCityChange(value) {
        resetChart()
        resetChart2()
        setCity(value)
    }

    return (
        <React.Fragment>
            <div>
                <h3>Tourism</h3>
            </div>
            <div>
                <p>Based on your desired city and specified time frame, the graphs below show you the total number of travelers to this city via a flight per year <br></br>over the given period and the average number of travelers via flight per month based on the monthly data of each year of the time period.</p>
                <p>You are able to see which years attracted more people to this city and what months tend to be busier when traveling to the desired city.</p>
            </div>
            <div>
                <select onChange={(e) => { handleCityChange(e.target.value) }}>
                    <option value="">Select City</option>
                    {
                        cityList.map(function (c, index) {
                            return <option key={'start' + index} value={c}>{c}</option>
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
                <button disabled={beginningYear && endYear ? false : true} onClick={() => { getTourismData(); getAverageMonthlyTourismData() }}>Calculate Total Travelers</button>
            </div>

            <div>
                {tourismData &&
                    <canvas id="myChart" width="80%" height="20%"></canvas>
                }

            </div>
            <div>
                <p>The above line graph shows the influx of travelers to the seleted city over a range of years</p>
            </div>
            <div>
                {tourismData &&
                    <canvas id="myChart2" width="80%" height="20%"></canvas>
                }
            </div>
            <div>
                <p>The above bar graph shows the most popular months for travel based on average inbound passenger amount over the selected range of years.</p>
            </div>
        </React.Fragment>

    );
}

export default Tourism