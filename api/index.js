var express = require('express')
var app = express()
var cors = require('cors')
const dbHelper = require('./helpers/dbHelper')

app.use(cors())// allow all origins

// endpoints, somewhere you can request data

app.get('/fuel-consumption', async function (req, res, next) {
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

app.get('/borders', async function (req, res, next) {
    await dbHelper.getBorders().then(dbResult => {
        res.send(dbResult)
    }).catch(err => {
        res.send(err)
    })
})

app.get('/profitability', async function (req, res, next) {

    let originABV = req.query.originABV
    let destABV = req.query.destABV
    let beginningYear = req.query.beginningYear// Get web query param
    let endYear = req.query.endYear

    dbHelper.getProfitabilityData(beginningYear, endYear, originABV, destABV)
        .then(result => {
            res.send(result)
        })//return result
        .catch(async function (error) {
            next(error)
        })
})

app.get(`/enviromental-impact`, async function (req, res, next) {
    let beginningYear = req.query.beginningYear// Get web query param
    let endYear = req.query.endYear

    // call db function
    dbHelper.getCO2Emissions(beginningYear, endYear)
        .then(result => {
            res.send(result)
        })
        .catch(async function (error) {
            next(error)
        })
})

app.get('/tourism', async function (req, res, next) {
    let beginningYear = req.query.beginningYear
    let endYear = req.query.endYear
    let city = req.query.city

    dbHelper.getTourismData(beginningYear, endYear, city)
        .then(result => {
            res.send(result)
        })
        .catch(async function (error) {
            next(error)
        })
})

app.get('/tourism-monthly', async function (req, res, next) {
    let beginningYear = req.query.beginningYear
    let endYear = req.query.endYear
    let city = req.query.city

    dbHelper.getAverageMonthlyTourismData(beginningYear, endYear, city)
        .then(result => {
            res.send(result)
        })
        .catch(async function (error) {
            next(error)
        })
})

app.get('/cities', async function (req, res, next) {
    dbHelper.getCities()
        .then(result => {
            res.send(result)
        })
        .catch(async function (error) {
            next(error)
        })
})

app.get('/airports/origin', async function (req, res, next) {
    dbHelper.getOriginABV()
        .then(result => {
            res.send(result)
        })
        .catch(async function (error) {
            next(error)
        })
})

app.get('/airports/destination', async function (req, res, next) {
    dbHelper.getDestABV()
        .then(result => {
            res.send(result)
        })
        .catch(async function (error) {
            next(error)
        })
})



app.listen(3001)