const express = require("express")
const mongoose = require("mongoose")
const app = express()

const _ = require("lodash")

const p24 = n => _.padStart(n, 24, "0")

mongoose.connect(
      "mongodb+srv://maapeaw:maapeaw5500@cluster0-ix8xq.mongodb.net/test?retryWrites=true&w=majority"
)
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function callback() {
      console.log("h")
})

app.use(express.json())
// require('./Mockup')
app.get("/", (req, res) => {
      res.send("test")
})

app.use(require("./api/subject"))
app.use(require("./api/learner"))
app.use(require("./api/teacher"))
app.use(require("./api/chapter"))
app.use(require("./api/exercise"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
      console.log("server on port:", PORT)
})