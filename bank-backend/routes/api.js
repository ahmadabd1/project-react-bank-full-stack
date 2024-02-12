//mport required module
const express = require('express')
const router = express.Router()
const Transaction = require('../models/transactionSchema')
const Balance = require('../models/balanceSchema')

// cRud operation - Retrieve data
router.get('/transaction', function (req, res) {
    Transaction.find({}).then( function (transaction) {
        res.send(transaction)
    })
})

// Crud operation - Create new data
router.post('/transaction', function (req, res) {
    console.log(req.body.amount)
    const newTransaction = new Transaction({amount:req.body.amount, category:req.body.category, vendor:req.body.vendor})
    newTransaction.save()
    // console.log(newTransaction)
    res.send(newTransaction)
})
// crUd Operation - Update existing data get sum by category
router.get('/transaction/breakdown', async function (req, res) {
    console.log("Updating request")
    const totalTransactions = await Transaction.aggregate([
        { "$group": {
            _id: "$category",
            event_count: { "$sum": "$amount" },
        }}
     ])
    res.send(totalTransactions)
})
// cruD Operation - Delete existing data
router.delete('/transaction/:id', async function (req, res) {
    console.log("Deleting request")
    let transactionId = req.params.id
    const deleteTransaction = await Transaction.findOneAndDelete({ _id: transactionId })
    res.status(201).send(deleteTransaction)
   
})


router.get('/balance', function (req, res) {
    Balance.find({}).then( function (balance) {
        res.send(balance)
    })
})

router.put("/balance/:id", async (req, res) => {
    const data = req.body;
    const paramsId = req.params.id;
    const filter = { _id: paramsId };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        balance: data.balance,
      },
    };
    const result = await Balance.updateOne(filter, updateDoc, options);
    res.send(data);
  
  });

module.exports = router