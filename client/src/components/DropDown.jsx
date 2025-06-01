
import React, { useState, useRef, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import './Dropdown.css';

const DropDown = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const [inputs, setInputs] = useState({
    rentperday: '',
    maxcount: '',
    city: ''
  });

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    onFilterChange(name, value);
  };

  return (
    <div className="custom-filter-wrapper" ref={dropdownRef}>
      <button className="btn d-flex align-items-center gap-2 filter-toggle" onClick={toggleDropdown}>
        <FaFilter /> Add Filter
      </button>

      {open && (
        <div className="filter-dropdown fade-in">
          <label>
            Price ≤ 
            <input type="number" name="rentperday" value={inputs.rentperday} onChange={handleChange} />
          </label>
          <label>
            Max Count ≥ 
            <input type="number" name="maxcount" value={inputs.maxcount} onChange={handleChange} />
          </label>
          <label>
            City 
            <input type="text" name="city" value={inputs.city} onChange={handleChange} />
          </label>
        </div>
      )}
    </div>
  );
};

export default DropDown;
