import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';

const calculateTotalDays = (from, to) => {
  const start = moment(from, "DD-MM-YYYY");
  const end = moment(to, "DD-MM-YYYY");
  return end.diff(start, "days") + 1;
};

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [room, setroom] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();
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

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: currentUser._id,
      fromdate,
      todate,
      totalamount: totaldays * room.rentperday,
      totaldays
    };

    try {
      setloading(true);
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      setloading(false);
      setSuccessMsg('Booking Successful');

      setTimeout(() => {
        setSuccessMsg('');
        navigate('/reservations');
      }, 2000);
    } catch (error) {
      setloading(false);
      seterror(true);
      console.error('Error booking room:', error);
    }
  }

  return (
    <div className='m-5 mt-md-5 pt-md-3 pt-2 mt-4'>

     
      {successMsg && (
        <div className=" mt-5 pt-3 alert alert-success text-center fade show" role="alert">
          {successMsg}
        </div>
      )}

      {loading ? (
        <h1><Loader /></h1>
      ) : error ? (
        <div style={{ marginTop: "50px" }}><Error /></div>
      ) : room ? (
        <div>
          <div className="row mt-5 justify-content-center bs">
            <div className="col-md-5 mt-5">
              <h1>{room?.name}</h1>
              <img src={room?.imageurls[0]} className="bigimg" alt="room" />
            </div>

            <div className="col-md-5 mt-5">
              <div>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: {currentUser?.name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room?.maxcount}</p>
                </b>
              </div>
              <div className='text-bold'>
                <hr />
                <p>Total Days: {totaldays}</p>
                <p>Rent per Day: ${room?.rentperday}</p>
                <p>Total Amount: ${totaldays * room?.rentperday}</p>
              </div>
              <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Bookingscreen;
