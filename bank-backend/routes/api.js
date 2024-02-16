//mport required module
const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionSchema");
const Balance = require("../models/balanceSchema");

// cRud operation - Retrieve data
router.get("/transaction", function (req, res) {
  try {
    Transaction.find({}).then(function (transaction) {
      res.send(transaction);
    });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

// Crud operation - Create new data
router.post("/transaction", function (req, res) {
  try {
    const newTransaction = new Transaction({
      amount: req.body.amount,
      category: req.body.category,
      vendor: req.body.vendor,
      date: req.body.date.date,
    });
    newTransaction.save();
    res.send(newTransaction);
  } catch (error) {
    console.log("error inputs to the post!");
    res.status(404).send(error);
  }
});
// crUd Operation - Update existing data get sum by category
router.get("/transaction/breakdown", async function (req, res) {
  try {
    const totalTransactions = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          event_count: { $sum: "$amount" },
        },
      },
    ]);
    res.send(totalTransactions);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

// cruD Operation - Delete existing data
router.delete("/transaction/:id", async function (req, res) {
  try {
    
    let transactionId = req.params.id;
    const deleteTransaction = await Transaction.findOneAndDelete({
      _id: transactionId,
    });
    res.status(201).send(deleteTransaction);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

router.get("/transactions/:month/:year", async (req, res) => {
    const month = req.params.month;
    const year = req.params.year;
    try {
      // console.log(new Date(year + '-' + month + '-01'), new Date(year, month))
      const transactionsByMonthandYear = await Transaction.find({
        date: {
          $gte: new Date(year + "-" + month + "-01"),
          $lte: new Date(year, month),
        },
      });
      res.status(200).send(transactionsByMonthandYear);
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
  });
  router.get("/breakdown/:category",async (req, res) =>{
    const category = req.params.category
    try {
      Transaction.find({category}).then(function (transaction) {
        res.send(transaction);
      });
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
  });

router.get("/balance", function (req, res) {
  try {
    Balance.find({}).then(function (balance) {
      res.send(balance);
    });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

router.put("/balance/:id", async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = router;
