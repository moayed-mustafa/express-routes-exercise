//  I need to create three routes for
// mean (average)
// median (midpoint)
// mode (most frequent)

const express = require('express')
const app = express()
app.use(express.json())

// console.log(app)


// set a route for the mean
app.get('/mean', (req, res) => {
    let numsList = req.query.nums.split(',')

    let mean = calculate(numsList, 'mean')
    console.log(numsList, mean)
    const response = {
        "response": {
            "operation": 'mean',
            "value": mean

        }
    }
    res.json(response)
})
// set a route for the median
app.get('/median', (req, res) => {
    let numsList = req.query.nums.split(',')
    numsList = numsList.map(Number)
    let median = calculate(numsList, 'median')
    console.log(numsList, median)
    const response = {
        "response": {
            "operation": 'median',
            "value": median

        }
    }
    // res.send(response)
    res.json(response)
})
// set a route for the mode
app.get('/mode', (req, res) => {
    let numList = req.query.nums.split(',')
    let mode = calculate(numList, 'mode')
    console.log(numList, mode)
    const response = {
        "response": {
            "operation": 'mode',
            "value": mode

        }
    }
    res.json(response)
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