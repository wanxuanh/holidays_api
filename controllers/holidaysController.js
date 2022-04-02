
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

//* Index Route
router.get('/', (req, res) => {
  Holiday.find()
    .then(holidays => {
      res.json(holidays)
    })
    .catch(err => {
      res.json(err)
    })
})

//* Create Route

router.post("/", async (req, res) => {
  console.log("body", req.body)
  try {
    const createdHoliday = await Holiday.create(req.body);
    res.status(200).send(createdHoliday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };  req.body = { name: "My birthday", likes:888 }
  //* save the data using moongoose into database

  Holiday.save(req.body);

  res.send();

});

//* DELETE ROUTE
router.delete("/:id", async (req, res) => {
  await Holiday.findByIdAndRemove(req.params.id);
  res.json({ message: "Holiday Deleted" });
});

module.exports = router;