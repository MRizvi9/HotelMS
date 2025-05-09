// routes/roomsRoute.js
const express = require('express');
const router = express.Router();

const Room = require('../models/room'); // Make sure the path is correct

router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms)
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/getroombyid', async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    console.error("Error in /getroombyid:", error); // Add this
    return res.status(500).json({ message: error.message }); // Changed to 500 for consistency
  }
});

module.exports = router; // <--- THIS IS CRITICAL
