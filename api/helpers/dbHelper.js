const oracledb = require('oracledb');
const config = require('dotenv').config()

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function executeSQL(query) {
    return new Promise(async (resolve, reject) => {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: config.parsed.DB_USERNAME,
                password: config.parsed.DB_PASSWORD,
                connectString: '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA = (SID = orcl)))'
            });

            const result = await connection.execute(query);
            resolve(result.rows)

        } catch (err) {
            console.error(err)
            reject(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    reject(err);
                }
            }
        }
    })
}

async function getBorders() {
    return new Promise(async (resolve, reject) => {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: config.parsed.DB_USERNAME,
                password: config.parsed.DB_PASSWORD,
                connectString: '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA = (SID = orcl)))'
            });

            const result = await connection.execute(
                `SELECT * FROM borders`,
            );
            resolve(result.rows)

        } catch (err) {
            console.error(err)
            reject(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    reject(err);
                }
            }
        }
    })
}

async function getFuelConsumption(beginningYear, endYear) {
    // promise is async/await
    // The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    return new Promise(async (resolve, reject) => {
        // Create  query
        let query = `SELECT SUM((distance * 1.61 / 100) * 4.8 * passenger_num) AS fuel_used FROM huhuang.flights 
        WHERE EXTRACT(YEAR From fly_date) >= ${beginningYear} AND 
        EXTRACT(YEAR FROM fly_date) <= ${endYear}
        GROUP BY EXTRACT(YEAR FROM fly_date)
        ORDER BY EXTRACT(YEAR FROM fly_date) ASC`

        // Call to oracle
        executeSQL(query)
            .then(dbresult => { resolve(dbresult) })
            .catch(error => { reject(error) })
    })
}

async function getProfitabilityData(beginningYear, endYear, originABV, destABV) {
    // promise is async/await
    // The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    return new Promise(async (resolve, reject) => {
        let query = `SELECT avg(passenger_num / seat_num) as ratio
        FROM huhuang.flights 
        WHERE EXTRACT(YEAR FROM fly_date) >= ${beginningYear} AND
        EXTRACT(YEAR FROM fly_date) <= ${endYear} AND
        original_airport = '${originABV}' AND
        destination_airport = '${destABV}' AND seat_num != 0
        GROUP BY EXTRACT(YEAR FROM fly_date)
        ORDER BY EXTRACT(YEAR FROM fly_date) ASC`

        executeSQL(query)
            .then(dbresult => { resolve(dbresult) })
            .catch(error => { reject(error) })


    })
}

async function getCO2Emissions(beginningYear, endYear) {
    return new Promise(async (resolve, reject) => {

        let query = `SELECT extract(year from fly_date), (SUM((distance * 1.61 / 100) * 4.8 * passenger_num) * .79 * 3.16) / 1000 AS CO2_Kilos FROM huhuang.flights 
        WHERE EXTRACT(YEAR From fly_date) >= ${beginningYear} AND 
        EXTRACT(YEAR FROM fly_date) <= ${endYear}
        GROUP BY EXTRACT(YEAR FROM fly_date)
        ORDER BY EXTRACT(YEAR FROM fly_date) ASC`

        executeSQL(query)
            .then(dbresult => { resolve(dbresult) })
            .catch(error => { reject(error) })
    })
}

async function getTourismData(beginningYear, endYear, city) {
    // promise is async/await
    // The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    return new Promise(async (resolve, reject) => {
        let query = `WITH t AS(
            SELECT DISTINCT huhuang.airport.abbreviation AS air 
            FROM huhuang.airport 
            WHERE city = '${city}'
            ),
            s AS(
            SELECT  huhuang.flights.passenger_num, fly_date FROM t, huhuang.flights 
            WHERE huhuang.flights.destination_airport = t.air AND 
            EXTRACT(YEAR From fly_date) >= ${beginningYear} 
            AND EXTRACT(YEAR FROM fly_date) <= ${endYear}
            )
            SELECT SUM(passenger_num) AS Total_Travelers
            FROM s  
            GROUP BY EXTRACT(YEAR FROM fly_date) ORDER BY EXTRACT(YEAR FROM fly_date) ASC`

        executeSQL(query)
            .then(dbresult => { resolve(dbresult) })
            .catch(error => { reject(error) })

    })
}

async function getAverageMonthlyTourismData(beginningYear, endYear, city) {
    return new Promise(async (resolve, reject) => {
        let query = `WITH t AS(
            SELECT DISTINCT huhuang.airport.abbreviation AS air 
            FROM huhuang.airport 
            WHERE city = '${city}'
            ),
            s AS(
            SELECT  huhuang.flights.passenger_num, fly_date FROM t, huhuang.flights 
            WHERE huhuang.flights.destination_airport = t.air AND 
            EXTRACT(YEAR From fly_date) >= ${beginningYear} 
            AND EXTRACT(YEAR FROM fly_date) <= ${endYear}
            ),
            r AS(
            SELECT SUM(passenger_num) AS Total_Travlers, fly_date
            FROM s  
            GROUP BY fly_date ORDER BY fly_date ASC
            )
            SELECT AVG(Total_Travlers) AS AVG_Per_Month, EXTRACT(MONTH From fly_date)
            FROM R 
            GROUP BY EXTRACT(MONTH From fly_date) ORDER BY EXTRACT(MONTH From fly_date) ASC`

        executeSQL(query)
            .then(dbresult => { resolve(dbresult) })
            .catch(error => { reject(error) })

    })
}

module.exports = {
    getBorders: getBorders,
    getFuelConsumption: getFuelConsumption,
    getProfitabilityData: getProfitabilityData,
    getCO2Emissions: getCO2Emissions,
    getTourismData: getTourismData,
    getAverageMonthlyTourismData: getAverageMonthlyTourismData

}