const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

const _ = require("lodash")

const p24 = n => _.padStart(n, 24, "0")

app.use(bodyParser.json())
const jwt = require("jwt-simple");
const passport = require("passport");


mongoose.connect(
      "mongodb+srv://maapeaw:maapeaw5500@cluster0-ix8xq.mongodb.net/test?retryWrites=true&w=majority"
)
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function callback() {
      console.log("connect database success")
})

app.use(express.json())
// require('./Mockup')
app.get("/", (req, res) => {
      res.send("test")
})

app.use(require("./api/learner"))
app.use(require("./api/teacher"))

//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "MY_SECRET_KEY";
//สร้าง Strategy
const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
      done(null, true);
});
//เสียบ Strategy เข้า Passport
passport.use(jwtAuth);
//ทำ Passport Middleware
const requireJWTAuth = passport.authenticate("jwt", { session: false });
app.use("/", requireJWTAuth)
app.use(require("./api/subject"))
app.use(require("./api/chapter"))
app.use(require("./api/exercise"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
      console.log("server on port:", PORT)
})
