const routes = require("express").Router();
const passport = require("passport");
const { authenticate } = require("../middlewares/jwt.middleware");
const userController = require("../controllers/user.controller");
const passwordresetController = require("../controllers/passwordReset");
const passportController = require("../controllers/passport.controller");
const travelManagement = require("../controllers/travel.management.controller");
routes.post("/signup", userController.signup);
routes.post("/signin", userController.signin);
routes.get("/:id/verify/:token/", userController.emailverification);
//password reset
routes.post("/password-reset", passwordresetController.sendpasswordlink);
routes.get("/password-reset/:id/:token", passwordresetController.verifyurl);
routes.post("/password-reset/:id/:token", passwordresetController.newpassword);
routes.get("/auth/login/success", passportController.loginsuccess);
routes.get("/auth/login/failed", passportController.loginfailed);
routes.get("/auth/logout", passportController.logout);

routes.get("/auth/google",passport.authenticate("google", { scope: ["profile","email"] }));
routes.get("/auth/google/callback",passport.authenticate("google", {
    successRedirect: `${process.env.BASE_URL}`,
    failureRedirect: "/login/failed",
  })
);
//app routes
routes.post("/travelManagement/newbooking",authenticate,travelManagement.NewBooking);
routes.post("/travelManagement/getbookings",authenticate,travelManagement.getBookings);
routes.post("/travelManagement/deletebooking",authenticate,travelManagement.deleteBooking);
routes.post("/travelManagement/updatebooking",authenticate,travelManagement.updateBooking);
module.exports = routes;
