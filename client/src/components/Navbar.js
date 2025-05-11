// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import '../style.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarCollapse = document.getElementById('navbarSupportedContent');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
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

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
                <div className="container d-flex align-items-center">
                    {/* Brand */}
                    <a className="navbar-brand d-flex align-items-center" href="/home">
                        <span style={{ color: '#5e9693' }}>Luxury</span>
                        <span style={{ color: '#e4bd75' }}>Motel</span>
                    </a>

                    {/* Nav links */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link" href="/home">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">Features</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">Portfolio</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">Reference</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">Team</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
                        </ul>
                    </div>

                    {/* Profile / Login */}
                    <div className="ms-auto d-flex align-items-center">
                        {user ? (
                            <div className="dropdown profile-dropdown">
                                <a
                                    className="nav-link dropdown-toggle profile-link"
                                    href="#"
                                    id="profileDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                  <i className='mr-2' style={{color:"grey"}}><FaUser /></i>  {user.name}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                    <li><a className="dropdown-item" href="#">Reserving</a></li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <ul className="navbar-nav d-flex flex-row">
                                <li className="nav-item me-3 me-lg-2">
                                    <a className="nav-link" href="/login"><i className="fas fa-sign-in-alt"></i></a>
                                </li>
                                <li className="nav-item me-3 me-lg-0">
                                    <a className="nav-link" href="/register"><i className="fas fa-user-plus"></i></a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
