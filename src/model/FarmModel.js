const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const FarmModel = Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  address: {
    city: { type: Schema.Types.ObjectId, ref: "City" },
    number: Number
  },
})

module.exports = model('Farm', FarmModel);