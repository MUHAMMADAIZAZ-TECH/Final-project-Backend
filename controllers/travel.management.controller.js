const { TravelManagement } = require("../models/travel");
exports.getDashboardContent = async (req, res) => {
  try {
    const dashboardDetails = await TravelManagement.find();
    if(dashboardDetails){
      res.status(200).json({ message: "Dashboard Details", dashboardDetails });
    }
    else{
      res.status(200).json({ message: "Dashboard Details", dashboardDetails });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
