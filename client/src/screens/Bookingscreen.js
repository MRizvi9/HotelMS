import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader'
import Error from '../components/Error'

const calculateTotalDays = (from, to) => {
  const start = moment(from, "DD-MM-YYYY");
  const end = moment(to, "DD-MM-YYYY");
  return end.diff(start, "days") + 1; // +1 to include both from and to date
};


function Bookingscreen() {
    const { roomid, fromdate, todate } = useParams();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [room, setroom] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const totaldays = calculateTotalDays(fromdate, todate); 



  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setloading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        setroom(response.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };

    fetchRoom();
  }, [roomid]);

  // Backend Function for BookingAdd commentMore actions

 async function bookRoom() {
  const bookingDetails = {
    room,
    userid:JSON.parse(localStorage.getItem('currentUser'))._id,
    fromdate,
    todate, 
    totalamount: totaldays * room.rentperday,
    totaldays
  };
  try {
    setloading(true);
    const result = await axios.post('/api/bookings/bookroom', bookingDetails);
    setloading(false);
    alert('Booking Successful');
  } catch (error) {
    setloading(false);
    alert('Booking Failed');
    console.error('Error booking room:', error);
  }


}




  return (
    <div className='m-5'>
  {loading ? (
        <h1><Loader/></h1>
      ) : room ? (
        <div>
          <div className="row mt-5 justify-content-center bs">
            <div className="col-md-5 mt-5">
              <h1>{room?.name}</h1>
              <img src={room?.imageurls[0]} className="bigimg" />
              </div>

       <div className="col-md-5 mt-5">
              <div>
                <h1>Booking Details</h1>
                <hr />
                <b>
                 <p>Name : {currentUser?.name}</p>
                  <p>From Date : {fromdate}</p>
                  <p>To Date : {todate}</p>
                  <p>Max Count : {room?.maxcount}</p>
                </b>
            </div>
            <div className='text-bold'>
                <hr/>
                <p>Total Days: {totaldays}</p>
                <p>Rent per Day: ${room?.rentperday}</p>
                <p>Total Amount: ${totaldays * room?.rentperday}</p>
              </div>  
              <div style={{float:'right'}}>
                <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
              </div>
            </div>
          </div>
    </div> ) : <div style={{marginTop:"50px"}}><Error/></div>}
</div>

  );
}

export default Bookingscreen;
