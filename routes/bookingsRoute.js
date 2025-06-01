const express = require('express');
const router = express.Router();  
const Booking = require('../models/booking');
const Room = require('../models/room');

// Book a room
router.post('/bookroom', async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionId: '12345',
    });

    const booking = await newBooking.save();

    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate,
      todate,
      userid,
      status: booking.status,
    });

    await roomtemp.save();

    res.send('Booking successful');
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

// ✅ Get bookings by user ID
router.post('/getuserbookings', async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid });
    res.send(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Cancel booking and update room's currentbookings array
router.post('/cancelbooking', async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    // Delete booking from bookings collection
    await Booking.findOneAndDelete({ _id: bookingid });

    // Remove that booking from the room's currentbookings array
    const room = await Room.findOne({ _id: roomid });

    if (room) {
      // Fix: Convert both IDs to strings for a reliable comparison
      room.currentbookings = room.currentbookings.filter(
        booking => booking.bookingid.toString() !== bookingid.toString()
      );

      await room.save();
    }

    res.send('Booking cancelled successfully');
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
});

module.exports = router;
