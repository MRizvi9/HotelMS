import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import "./Datepicker.css";
import "../App.css";

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [duplicaterooms, setduplicaterooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response.data);
        setduplicaterooms(response.data);
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
    if (!dates || dates.length === 0) {
      setfromdate('');
      settodate('');
      setRooms(duplicaterooms); // Reset
      return;
    }

    const from = dates[0].format("DD-MM-YYYY");
    const to = dates[1].format("DD-MM-YYYY");
    setfromdate(from);
    settodate(to);

    const updatedRooms = duplicaterooms.map((room) => {
      let available = true;

      for (const booking of room.currentbookings) {
  const selectedFrom = moment(from, "DD-MM-YYYY");
  const selectedTo = moment(to, "DD-MM-YYYY");
  const bookingFrom = moment(booking.fromdate, "DD-MM-YYYY");
  const bookingTo = moment(booking.todate, "DD-MM-YYYY");

  const isOverlap = selectedFrom.isSameOrBefore(bookingTo) && selectedTo.isSameOrAfter(bookingFrom);

  if (isOverlap) {
    available = false;
    break;
  }
}


      return { ...room, available }; // Add availability flag
    });

    setRooms(updatedRooms);
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center sticky-top py-3" style={{ zIndex: 1000 }}>
        <RangePicker
          className="custom-datepicker mt-5 shadow-sm p-2"
          format="DD-MM-YYYY"
          onChange={filterByDate}
          disabledDate={(current) => current && current < moment().startOf("day")}
        />
      </div>

      <div className="row justify-content-center">
        {loading ? (
          <Loader />
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-9" key={room._id}>
              <Room room={room} fromdate={fromdate} todate={todate} available={room.available} />
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
