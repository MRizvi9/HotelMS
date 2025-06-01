import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import FilterBar from "../components/FilterBar";

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [duplicaterooms, setDuplicaterooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setFromdate] = useState('');
  const [todate, setTodate] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/rooms/getallrooms");
        setRooms(data);
        setDuplicaterooms(data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDateChange = (dates) => {
    if (!dates || dates.length === 0) {
      setFromdate('');
      setTodate('');
      setRooms(duplicaterooms);
      return;
    }

    const from = dates[0].format("DD-MM-YYYY");
    const to = dates[1].format("DD-MM-YYYY");
    setFromdate(from);
    setTodate(to);

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

      return { ...room, available };
    });

    setRooms(updatedRooms);
  };

  const handleSearch = (text) => {
    const filtered = duplicaterooms.filter(room =>
      room.name.toLowerCase().includes(text.toLowerCase())
    );
    setRooms(filtered);
  };

  const handleFilterChange = (key, value) => {
  const updatedFilters = { ...activeFilters };
  if (!value) delete updatedFilters[key];
  else updatedFilters[key] = value;

  setActiveFilters(updatedFilters);
  let filteredRooms = [...duplicaterooms];

  for (let filterKey in updatedFilters) {
    const val = updatedFilters[filterKey];
    if (filterKey === "city") filteredRooms = filteredRooms.filter(room => room.city?.toLowerCase().includes(val.toLowerCase()));
    if (filterKey === "maxcount") filteredRooms = filteredRooms.filter(room => room.maxcount >= parseInt(val));
    if (filterKey === "rentperday") filteredRooms = filteredRooms.filter(room => room.rentperday <= parseInt(val));
  }

  // Apply availability logic if date range is selected
  if (fromdate && todate) {
    filteredRooms = filteredRooms.map(room => {
      let available = true;
      for (const booking of room.currentbookings) {
        const selectedFrom = moment(fromdate, "DD-MM-YYYY");
        const selectedTo = moment(todate, "DD-MM-YYYY");
        const bookingFrom = moment(booking.fromdate, "DD-MM-YYYY");
        const bookingTo = moment(booking.todate, "DD-MM-YYYY");

        const isOverlap = selectedFrom.isSameOrBefore(bookingTo) && selectedTo.isSameOrAfter(bookingFrom);
        if (isOverlap) {
          available = false;
          break;
        }
      }
      return { ...room, available };
    });
  }

  setRooms(filteredRooms);
};

  const resetFilters = () => {
    setActiveFilters({});
    setRooms(duplicaterooms);
  };

  return (
    <div className="container">
      <FilterBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onReset={resetFilters}
        onDateChange={handleDateChange}
      />

      <div className="mobo-wrap row justify-content-center mt-1 mt-md-4 ">
        {loading ? (
          <Loader />
        ) : rooms.length ? (
          rooms.map(room => (
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
