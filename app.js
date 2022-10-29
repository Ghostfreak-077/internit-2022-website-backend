const express = require('express');
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))

const match = require("./routes/matchRoute.js");
const team = require("./routes/teamRoute.js");
const admin = require("./routes/adminRoute.js");

app.use("/api/admin", match);
app.use("/api/admin", team);
app.use("/api/admin", admin);

module.exports = app;