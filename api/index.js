var express = require('express')
var app = express()
var cors = require('cors')
const dbHelper = require('./helpers/dbHelper')

app.use(cors())// allow all origins

// endpoints, somewhere you can request data

app.get('/fuel-consumption', async function (req, res) {
    //http://localhost:3001/?beginningYear=1950&endYear=2012
    //http://localhost:3001/fuel-consumption?beginni1950&endYear=2012ngYear=

    let beginningYear = req.query.beginningYear// Get web query param
    let endYear = req.query.endYear

    // call db function
    dbHelper.getFuelConsumption(beginningYear, endYear)
        .then(result => {
            res.send(result)
        })//return result
})

app.get('/borders', async function (req, res) {
    await getBorders().then(dbResult => {
        res.send(dbResult)
    }).catch(err => {
        res.send(err)
    })
})

app.get('/profitability', async function (req, res) {

    let originABV = req.query.originABV
    let destABV = req.query.destABV
    let beginningYear = req.query.beginningYear// Get web query param
    let endYear = req.query.endYear

    dbHelper.getProfitabilityData(beginningYear, endYear, originABV, destABV)
        .then(result => {
            let newJsonResult = { message: result }
            res.send(newJsonResult)
        })//return result
})

app.get('/tourism', function (req, res) {
    res.send('helloworld tour')
})

app.get(`/enviromental-impact`, async function (req, res) {
    let beginningYear = req.query.beginningYear// Get web query param
    let endYear = req.query.endYear

    // call db function
    dbHelper.getCO2Emissions(beginningYear, endYear)
        .then(result => {
            res.send(result)
        })
        .catch(async function (error) {
            res.status(500).send({ error: error })
        })
})

app.listen(3001)