// Import required modules
const express = require('express')
const bodyParser = require('body-parser')
const transactionApi = require('./routes/api')
const app = express()

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/transactionDB", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))



// Parse JSON && URL
// We use these middleware when processing POST requests (to extract data from the request body)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Using the custom API route
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})
app.use('/', transactionApi)
const port = 8080
// Server is listening - the Server ready to accept requests
app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})