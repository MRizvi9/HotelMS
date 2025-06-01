import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdLocationOn, MdWifi, MdLocalParking, MdRoomService,
  MdPool, MdSpa, MdFitnessCenter, MdTheaters,
  MdPhone, MdGroups, MdCurrencyRupee
} from "react-icons/md";
import { FaEye } from "react-icons/fa";
import './RoomFlipCard.css';

function Room({ room, fromdate, todate, available }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = window.innerWidth < 768;

  const handleMobileFlip = () => {
    if (isMobile) setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.imageurls.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.imageurls.length) % room.imageurls.length);
  };

  const renderPerks = (category) => {
    const activePerks = {
      Economy: [{ icon: <MdWifi />, label: "WiFi" }],
      Business: [
        { icon: <MdWifi />, label: "WiFi" },
        { icon: <MdLocalParking />, label: "Parking" },
        { icon: <MdRoomService />, label: "Room Service" }
      ],
      Luxury: [
        { icon: <MdWifi />, label: "WiFi" },
        { icon: <MdLocalParking />, label: "Parking" },
        { icon: <MdRoomService />, label: "Room Service" },
        { icon: <MdPool />, label: "Pool" },
        { icon: <MdSpa />, label: "Spa" },
        { icon: <MdFitnessCenter />, label: "Gym" },
        { icon: <MdTheaters />, label: "Theatre" }
      ]
    };

    return (
      <div className="perks-icons">
        {activePerks[category]?.map((perk, idx) => (
          <div key={idx}>{perk.icon}<span>{perk.label}</span></div>
        ))}
      </div>
    );
  };

  return (

    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleMobileFlip}>
      <div className="flip-card-inner ">
        {/* FRONT */}
        <div className="flip-card-front">
          <img src={room.imageurls[0]} alt={room.name} />
          <div className="gradient-overlay"></div>
          <div className={`front-category ${room.category.toLowerCase()}`}>{room.category}</div>
          <div className="front-content">
            <h5>{room.name}</h5>
            <p><MdLocationOn /> {room.location}</p>
          </div>
          <div className="front-actions">
            <div className={`front-availability ${!available ? 'unavailable' : ''}`}>
              {fromdate && todate ? (available ? 'Available' : 'Not Available') : 'Select dates'}
            </div>
            <button className="view-btn" onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}>
              <FaEye /> View More
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back">
          <div className="back-left">
            <img src={room.imageurls[currentImageIndex]} alt="slider" />
            <div className="slider-btns">
              <button onClick={(e) => { e.stopPropagation(); handlePrev(); }}>‹</button>
              <button onClick={(e) => { e.stopPropagation(); handleNext(); }}>›</button>
            </div>
          </div>
          <div className="back-right">
            <div>
              <h6>{room.name}</h6>
              <p className="category-pill">{room.category}</p>
              {renderPerks(room.category)}
              <div className="info-line"><MdLocationOn color="#5e9693" /><span>{room.location}</span></div>
<div className="info-line"><MdGroups color="#5e9693" /><span>Max Count: {room.maxcount}</span></div>
<div className="info-line"><MdPhone color="#5e9693" /><span>{room.phonenumber}</span></div>
<div className="info-line"><MdCurrencyRupee color="#5e9693" /><span>Rent: ₹{room.rentperday}/day</span></div>

            </div>
            <div className="room-buttons">
              {fromdate && todate && available && (
                <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                  <button className="btn btn-gold btn-sm">Book Now</button>
                </Link>
              )}
              <button className="btn btn-outline-dark btn-sm" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                Back
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Room;
