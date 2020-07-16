
const express = require('express')
const app = express()
const expressError = require('./expressError')

app.use(express.json())

// set a route for the mean
app.get('/mean', (req, res, next) => {
    try {
        if (req.query.nums == undefined) {
           makeError()

        }

            let numsList = req.query.nums.split(',')
                    // return res.send
            let mean = calculate(numsList, 'mean')
            const response = {
                "response": {
                    "operation": 'mean',
                    "value": mean
                }
            }
            return res.json(response)

    } catch (e) {
        next(e)
    }



})
// set a route for the median
app.get('/median', (req, res, next) => {
    try {
        if (req.query.nums == undefined) {
            makeError()

        }
    let numsList = req.query.nums.split(',')
        numsList = numsList.map(Number)

    let median = calculate(numsList, 'median')
    const response = {
        "response": {
            "operation": 'median',
            "value": median
        }
    }
        return res.json(response)

    } catch (e) {
        next(e)
    }

})
// set a route for the mode
app.get('/mode', (req, res, next) => {
    try {
        if (req.query.nums == undefined) {
            makeError()

        }
    let numList = req.query.nums.split(',')
    let mode = calculate(numList, 'mode')
    const response = {
        "response": {
            "operation": 'mode',
            "value": mode

        }
    }
    return res.json(response)
    } catch (e) {
        next(e)
    }


})

//======================================================================
 // create a 404 middlare
app.use((req, res, next) => {
    const e = new expressError('Page not found!', 404)
    next(e)
 })
// //======================================================================
// create an error middlewere
app.use((err, req, res, next) => {
    let status = err.status || 500
    let msg = err.msg
    data = { "status": status, "msg": msg }
    console.log(data)
    res.json(data)
})

// listen to the app
app.listen(3000, () => {
    console.log('App is starting on port 3000....')
})

function calculate(nums, operation) {
    if (operation == 'mean') {
        const reducer = (accumulator, item) => {
            return accumulator + Number(item);
          };
        return nums.reduce(reducer, 0) /nums.length
    }

    if (operation == 'median') {
        nums = nums.sort((a, b) => a - b)
        if (nums.length % 2 == 0) {
            index = nums.length / 2
            return ((nums[index -1] + nums[index ]) / 2)
        }
        else {
            return Math.round(nums.length / 2 )
        }
    }

    if (operation == 'mode') {
        let freq = {}
        for (let i = 0; i < nums.length; i++){
            let val = nums[i]
            freq[val]? freq[val] ++ : freq[val] = 1
        }
        return Math.max(...Object.values(freq))
    }
}
function makeError() {
    throw new expressError('Query parameter must be called nums', 403)
}