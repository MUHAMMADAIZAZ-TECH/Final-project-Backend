const jwt = require("jsonwebtoken");
const axios = require("axios");
const { User } = require("../models/user");
exports.authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
  } else if (req.cookies.session) {
    token = req.cookies.session;
  }
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  if(req.body && req.body.Provider==="google"){
    axios({
      method: 'GET',
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        const data = response.data;
        req.user = data;
        next()
      }
      else{
        req.user = undefined;
        res.status(401).send("Unauthorized access");
      }
    })
    .catch(error => {
      console.log(error)
      return error;
    });
   }
  else{
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const userexist = await User.findOne({ Email: decoded.Email}).select('-Password');
    if (userexist) {
      req.user = userexist;
      next();
    } else {
      req.user = undefined;
      return res.status(401).send("Unauthorized access");
    }
  }
   
};
