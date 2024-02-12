const mongoose = require('mongoose')
const Schema = mongoose.Schema

const balanceSchema = new Schema({
    balance: Number
    
})

const balance = mongoose.model("blance", balanceSchema)
module.exports = balance