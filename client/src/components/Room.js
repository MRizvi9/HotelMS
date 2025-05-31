import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom'

function Room({ room }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row mt-5 bs align-items-center">
      <div className="col-md-4 ">
        <img src={room.imageurls[0]} className="smallImg" alt="room" />
      </div>

      <div className="col-md-8 text-left">
        <h1>{room.name}</h1>
        <b>
        <p>Max Count: {room.maxcount}</p>
        <p>Phone: {room.phonenumber}</p>
        <p>Category: {room.type}</p>
        </b>
        <div style={{float:'right'}}>
        <Link to={`/book/${room._id}`}>
          <button className="btn btn-gold mx-4">Book Now</button>
          </Link>
            <button className='btn ' onClick={handleShow}>View Details</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false} size='lg'>
        <Modal.Header >
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel fade>
      {room.imageurls.map(url=>{
        return<Carousel.Item>
        <img
        className='d-block w-100 bigimg'
        src={url}
        />
      </Carousel.Item>
      })}
    </Carousel>
    <p>
      {room.description}
    </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room
