import React, { useEffect } from 'react';
import '../style.css';

const Navbar = () => {
  useEffect(() => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      });
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Brand */}
          <a className="navbar-brand d-flex align-items-center" href="#!">
            <span style={{ color: '#5e9693' }}>Luxury</span>
            <span style={{ color: '#e4bd75' }}>Motel</span>
          </a>

          {/* Toggle button (mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Nav links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="/home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Portfolio</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Reference</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Team</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
            </ul>

            {/* Social icons */}
            <ul className="navbar-nav d-flex flex-row mr-auto ">
  <li className="nav-item me-3 me-lg-2">
    <a className="nav-link" href="/login">
      <i className="fas fa-sign-in-alt"></i> {/* Login Icon */}
    </a>
  </li>
  <li className="nav-item me-3 me-lg-0">
    <a className="nav-link" href="/resigter">
      <i className="fas fa-user-plus"></i> {/* Sign Up Icon */}
    </a>
  </li>
</ul>

          </div>

          {/* Avatar - always visible on the far right
          <div className="d-none d-lg-block ms-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              className="rounded-circle"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          </div> */}
        </div>
      </nav>

      {/* Background section */}
      {/* <section>
        <div
          id="intro"
          className="bg-image vh-100"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/new-templates/psychologist/img1.jpg')",
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: 'rgba(250, 182, 162, 0.15)' }}
          ></div>
        </div>
      </section> */}
    </header>
  );
};

export default Navbar;
 