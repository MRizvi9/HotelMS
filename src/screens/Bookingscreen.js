import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader'


function Bookingscreen() {
  const { roomid } = useParams();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [room, setroom] = useState(null);

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

  return (
    <div className='m-5'>
  {loading ? (
    <h1><Loader/></h1>
  ) : error ? (
    <h1>Error...</h1>
  ) : (
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
            <p>Name : </p>
            <p>From Date : </p>
            <p>To Date : </p>
            <p>Max Count : {room?.maxcount}</p>
          </b>
            </div>
            <div className='text-bold'>
              <h1>Amount:</h1>
              <hr/>
              <p>Total Days:</p>
              <p>Rent per Days: ${room?.rentperday}</p>
              <p>Total Amount:</p>
            </div>  
            <div style={{float:'right'}}>
              <button className='btn btn-primary'>Pay Now</button>
              </div>
        </div>
      </div>
    </div>
  )}
</div>

  );
}

export default Bookingscreen;
