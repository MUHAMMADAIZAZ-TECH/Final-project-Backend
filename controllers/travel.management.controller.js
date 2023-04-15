const { Booking } = require("../models/travel");
exports.NewBooking = async (req, res) => {
  try {
   const NewBooking = new Booking(req.body.state)
    console.log(NewBooking)
    await NewBooking.save();
    res.status(200).json({ message: "Successfully Booked" });
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getBookings = async (req, res) => {
  try {
    const Bookings = await Booking.find();
    if(Bookings){
      res.status(200).json({ message: "Bookings", Bookings });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteBooking = async (req, res) => {
  try {
    const { BookingId } = req.body;
    const Selected = await Booking.findOne({ BookingId: BookingId });
    const deleted = await Selected.deleteOne();
    const UpdatedList = await Booking.find();
    if(deleted){
      res.status(200).json({ message: "Successfully Deleted",UpdatedList:UpdatedList });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateBooking = async (req, res) => {
  try {
    const { _id,CustomerId,CustomerName ,CustomerAddress,Destination,CustomerPhoneNo,StartDate,EndDate} = req.body.state;
    const object = { CustomerId: CustomerId ,
      CustomerName: CustomerName,
      CustomerAddress: CustomerAddress,
      CustomerPhoneNo: CustomerPhoneNo,
      Destination: Destination,
      StartDate: StartDate,
      EndDate: EndDate,
    }
    const Updated = await Booking.findByIdAndUpdate(_id, { $set: object}, { new: true });
    const UpdatedList = await Booking.find();
    if(Updated){
      res.status(200).json({ message: "Successfully Updated",UpdatedList:UpdatedList });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};