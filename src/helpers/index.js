/**
 * Get list of numbers between a range
 */
const getNumbersInRange = (start, end) => {
    let numbers = []
    // iterate through some time
    for (let index = start; index <= end; index++) {
        numbers.push(index)
    }
    return numbers
}

module.exports = {
    getNumbersInRange: getNumbersInRange
}