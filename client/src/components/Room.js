import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate, available }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row mt-5 bs align-items-center position-relative">
      
      {/* Not Available Badge - Top Right */}
      {fromdate && todate && !available && (
        <span
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#f8d7da',
            color: '#D0312D',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            zIndex: 1000
          }}
        >
          Not Available
        </span>
      )}

      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallImg" alt="room" />
      </div>

      <div className="col-md-8 text-left">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone: {room.phonenumber}</p>
          <p>Category: {room.type}</p>
        </b>

        <div style={{ float: 'right' }}>
          {fromdate && todate ? (
            available ? (
              <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                <button className="btn btn-gold mx-4">Book Now</button>
              </Link>
            ) : null
          ) : (
            <span
              style={{
                color: '#6c757d',
                fontSize: '0.8rem',
                padding: '4px 10px',
                borderRadius: '50px',
                marginRight: '10px',
                fontWeight: 500
              }}
            >
              Select date range
            </span>
          )}
          <button className="btn" onClick={handleShow}>View Details</button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} animation={false} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel fade>
            {room.imageurls.map((url, i) => (
              <Carousel.Item key={i}>
                <img className='d-block w-100 bigimg' src={url} alt={`slide-${i}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
