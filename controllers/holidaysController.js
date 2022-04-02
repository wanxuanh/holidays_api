
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

//? CREATE ROUTE

//? need to check, try catch is to check for "", send a success/failure
router.post("/", async (req,res) =>{
  //* extract the data from req.body
  console.log("body", req.body)
  try {
    const createdHoliday = await Holiday.create(req.body);
    res.status(200).send(createdHoliday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };  req.body = { name: "My birthday", likes:888 }
  //* save the data using moongoose into database

  Holiday.save(req.body);

  res.send(); /// ???? 

});


module.exports = router;