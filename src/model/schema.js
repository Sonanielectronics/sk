var mongoose = require("mongoose");

var firstSchema = new mongoose.Schema({
  Username: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Email: {
    type: String,
  },
  UpiId: {
    type: String,
  },
  Coin: {
    type: String,
  },
});

var Todo = mongoose.model("TeenPattiGoldLuckyClubCollection", firstSchema);

const blogSchema = new mongoose.Schema({
  RemainingTime: {
    type: String,
  },
  WinningNumber: {
    type: String,
  },
  TotleGameTime: {
    type: String,
  },
  GameArray: {
    type: Array,
  },
});

const Todo2 = new mongoose.model("GamePlayCollection", blogSchema);

const blogSchema3 = new mongoose.Schema({
  Id: {
    type: String,
  },
  Transaction: {
    type: [],
  },
});

const Todo3 = new mongoose.model("TransactionCollection", blogSchema3);

const blogSchema4 = new mongoose.Schema({
  Email: {
    type: String,
  },
  Rupees: {
    type: String,
  },
});

const Todo4 = new mongoose.model("withdrawCollection", blogSchema4);

module.exports = { Todo2, Todo3, Todo4, Todo };
