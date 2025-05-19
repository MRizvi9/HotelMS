import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import "./Datepicker.css"; 
import "../App.css"
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response.data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error("Error fetching rooms:", error);
        setloading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    console.log(dates);
  }


  return (
    <div className="container mt-5">
      {/* Date Range Picker Centered */}
      <div
  className="d-flex justify-content-center  sticky-top  py-3 "
  style={{ zIndex: 1000 }}
>
        <RangePicker className="custom-datepicker mt-5 shadow-sm p-2"
         format='DD-MM-YYYY'
         onChange={filterByDate}  />
      </div>

      {/* Rooms Section */}
      <div className="row justify-content-center">
        {loading ? (
          <Loader />
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-9" key={room._id}>
              <Room room={room} />
            </div>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
};

export default Homescreen;
