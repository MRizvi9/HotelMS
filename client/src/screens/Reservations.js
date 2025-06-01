import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Reservations() {
  const [bookings, setBookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    async function fetchBookings() {
      try {
        setloading(true);
        const res = await axios.post('/api/bookings/getuserbookings', {
          userid: currentUser._id
        });
        setBookings(res.data);
        setloading(false);
      } catch (err) {
        console.error('Error loading bookings:', err);
        seterror(true);
        setloading(false);
      }
    }

    fetchBookings();
  }, []);

  const confirmCancel = (bookingid, roomid) => {
    setBookingToCancel({ bookingid, roomid });
    setShowModal(true);
  };

  const handleCancelBooking = async () => {
    const { bookingid, roomid } = bookingToCancel;
    try {
      setloading(true);
      await axios.post('/api/bookings/cancelbooking', { bookingid, roomid });
      setBookings(prev => prev.filter(b => b._id !== bookingid));
      setSuccessMsg('Booking cancelled successfully.');
      setloading(false);
      setShowModal(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      seterror(true);
      setloading(false);
      console.error('Error cancelling booking:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2 className="text-center mb-4">
          {currentUser?.name || 'My'}'s Reservations
        </h2>

        {loading && <Loader />}
        {error && <Error />}

        <div className={`alert alert-success text-center fade ${successMsg ? 'show' : 'd-none'}`} role="alert">
          {successMsg}
        </div>

        {bookings.length === 0 && !loading && !error && (
          <p className="text-center text-muted">No bookings found.</p>
        )}

        <div className="row justify-content-center">
          {bookings.map((booking) => (
            <div className="col-lg-5 col-md-6 col-sm-10 mb-4" key={booking._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body p-3">
                  <h5 className="card-title">{booking.room}</h5>
                  <p className="card-text small">
                    <strong>Booking ID:</strong> {booking._id}<br />
                    <strong>Transaction ID:</strong> {booking.transactionId}<br />
                    <strong>Check-in:</strong> {booking.fromdate}<br />
                    <strong>Check-out:</strong> {booking.todate}<br />
                    <strong>Total Amount:</strong> ${booking.totalamount}<br />
                    <strong>Status:</strong>{' '}
                    <span className={booking.status === 'booked' ? 'text-success' : 'text-danger'}>
                      {booking.status}
                    </span>
                  </p>
                  {booking.status === 'booked' && (
                    <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-danger btn-sm border-0"
                        style={{ outline: 'none' }}
                        onClick={() => confirmCancel(booking._id, booking.roomid)}
                    >
                        Cancel Booking
                    </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
  <h5 className="modal-title">Cancel Booking</h5>
<button className="btn btn-sm" onClick={() => setShowModal(false)}>X</button>

</div>

<div className="modal-body">
  Are you sure you want to cancel this booking?
</div>

<div className="modal-footer">
  <button className="btn btn-danger" onClick={handleCancelBooking}>
    Yes, Cancel
  </button>
</div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reservations;
