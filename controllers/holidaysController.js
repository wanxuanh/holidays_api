
const express = require('express');
const Holiday = require("../models/holidays")
const router = express.Router();

router.get("/seed", async (req, res) => {

  const holidays = [
    {
      name: "New Year's Day",
    },
    {
      name: "Good Friday",
    }
  ]
  await Holiday.deleteMany({});
  await Holiday.insertMany(holidays)
  res.json(holidays)
})

router.get('/', (req, res) => {
  res.send('holidays');
})

module.exports = router;