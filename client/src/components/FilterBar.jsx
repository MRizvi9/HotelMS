import React, { useState } from "react";
import { DatePicker } from "antd";
import { FaFilter, FaTimes } from "react-icons/fa";
import "./FilterBar.css";

const { RangePicker } = DatePicker;

const FilterBar = ({ onSearch, onFilterChange, activeFilters, onReset, onDateChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleAddFilter = () => {
    if (filterType && filterValue) {
      onFilterChange(filterType, filterValue);
      setFilterType("");
      setFilterValue("");
      setShowDropdown(false);
    }
  };

  return (
    <div className="filter-bar-wrapper py-3 px-3 ml-5 ">
      <div className="row gx-2 gy-2 ml-1 pt-2">
        {/* Search */}
        <div className="col-12 col-md-4">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Search rooms..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Date Picker */}
        <div className="col-12 col-md-5">
          <RangePicker
            className="w-100 shadow-none"
            format="DD-MM-YYYY"
            onChange={onDateChange}
            disabledDate={(current) => current && current < new Date()}
          />
        </div>

        {/* Custom Filter Dropdown */}
        <div className="col-12 col-md-3 text-md-end">
          <button className="btn btn-sm px-3" onClick={() => setShowDropdown(!showDropdown)}>
            <span className="d-inline-flex align-items-center gap-2">
              <FaFilter /> Add Filter
            </span>
          </button>

          {showDropdown && (
            <div className="dropdown-card shadow">
              <select
                className="form-select mb-2"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="category">Category</option>
                <option value="city">City</option>
                <option value="maxcount">Min Person</option>
                <option value="rentperday">Max Price</option>
              </select>

              <input
                className="form-control mb-2"
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Enter value"
              />

              <button className="btn btn-gold w-100 btn-sm" onClick={handleAddFilter}>
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      <div className="d-flex flex-wrap justify-content-between mt-3">
        <div className="d-flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, val]) => (
            <span className="filter-chip" key={key}>
              {key}: {val}
              <FaTimes className="ms-2 remove-icon" onClick={() => onFilterChange(key, "")} />
            </span>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default FilterBar;
