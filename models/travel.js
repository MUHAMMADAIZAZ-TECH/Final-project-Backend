const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var BookingSchema = new Schema({
  BookingId: {type: mongoose.Schema.Types.ObjectId,index: true,required: true,auto: true},
  CustomerId: {type: String,required: true },
  CustomerName: {type: String,required: true },
  CustomerAddress: {type: String,required: true },
  CustomerPhoneNo: {type: String,required:true },
  Destination: { type: String, required: true },
  StartDate: { type: String, required: true },
  EndDate: { type: String, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = { Booking };

