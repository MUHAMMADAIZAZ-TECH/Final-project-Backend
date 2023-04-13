const axios = require("axios");
exports.loginsuccess = async (req, res) => {
  if (req.user) {
    const { Password,accessToken,...remaining} = req.user;
    res.cookie("session", accessToken)
      .status(200)
      .json({
        success: true,
        user: remaining,
        message: "Successfully Login",
      });
  }
};
exports.loginfailed = async (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
};
exports.logout = async (req, res, next) => {
  try {
    await axios.post('https://oauth2.googleapis.com/revoke', null, {
      params: {
        token: req.cookies.session
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log("User logged out successfully")
    res.redirect(process.env.BASE_URL);
  } catch (error) {
    res.status(500).send({message:error.message});
  }
};

