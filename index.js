const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const axios = require("axios")
const cors = require("cors")

const _ = require("lodash")

const requireJWTAuth = require("./config/jwt")

const p24 = (n) => _.padStart(n, 24, "0")

app.use(bodyParser.json())
app.use(cors())

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

app.use("/api", requireJWTAuth)
//url ที่ขึ้นต้นด้วย /api จะต้องใช้ token

app.use(require("./api/subject"))
app.use(require("./api/chapter"))
app.use(require("./api/exercise"))
app.use(require("./api/notification"))

app.get("/auth/facebook/callback", async (req, res) => {
    let a = await axios.get(
        `http://localhost:80/auth/facebook/callback1?code=${req.query.code}`
    )
    console.log(a.data)
    res.send("ok")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server on port:", PORT)
})
//
//
//
