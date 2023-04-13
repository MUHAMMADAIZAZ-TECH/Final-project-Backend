const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var dashboardSchema = new Schema({
  Heading: { type: String, required: true },
  Title: { type: String, required: true },
  Text: { type: String, required: true },
});
const TravelManagement = mongoose.model("TravelManagement", dashboardSchema);
module.exports = { TravelManagement };
