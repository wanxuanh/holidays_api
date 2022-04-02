require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const Holiday = require("./models/holidays")
const HolidayController = require("./controllers/holidaysController")

const app = express();
const PORT = process.env.PORT ?? 2000

// Error / Disconnection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

//...farther down the page

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

app.use("/api/holidays", HolidayController)


app.get("/", (req, res) => {
    res.send('Hi 2');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})