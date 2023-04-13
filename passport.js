const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("./models/user");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const name = profile?.displayName?.split(" ");
        let user = new User({
          FirstName: name[0],
          LastName: name[1],
          Email: profile.emails[0].value,
          Password: "google",
          AvatarUrl: profile.photos[0].value,
          Provider: profile.provider,
          Verified: true,
          accessToken:accessToken
        });
        const userexist = await User.findOne({
          Email: profile.emails[0].value,
        });
        if (!userexist) {
          await user.save();
          return done(null, user);
        } else {
          return done(null, user);
        }
      } catch (err) {
        console.log(err);
        return done(null, null);
      }
      // done(null, {user:profile,accessToken:accessToken});
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  let userexist = await User.findOne({ Email: user.Email });
  if (userexist) {
    done(null, user);
  }
});
