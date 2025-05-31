const express = require('express');
const router = express.Router();  
const Booking = require('../models/booking'); // Assuming you have a booking model defined
const Room = require('../models/room'); // Assuming you have a room model defined

router.post('/bookroom', async (req, res) => {
    const {   room,
    userid,
    fromdate,
    todate, 
    totalamount,
    totaldays}=req.body
    try{
        const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: '12345' // This should be replaced with actual transaction ID logic -
            
        });
 
         const booking = await newBooking.save()
         const roomtemp = await Room.findOne({ _id: room._id });
         roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: fromdate,
            todate: todate,
            userid: userid,
            status: booking.status
        })
        await roomtemp.save();
         res.send('Booking successful');
    }catch(error) {
        console.error('Error booking room:', error);
        res.status(500).json({ message: 'Booking failed', error: error.message });
    }

    
});

module.exports = router;