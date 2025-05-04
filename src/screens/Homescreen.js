import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from '../components/Room'

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  useEffect(() => {
    // Safe async function inside useEffect
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

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>loading...</h1>
        ) : error ? (
          <h1>Error </h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2" key={room._id}>
                <Room room={room} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen;
