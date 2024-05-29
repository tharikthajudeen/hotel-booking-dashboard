// src/Dropdown.js
import React from 'react';

const Dropdown = ({ label, options, onChange }) => (
  <div className="dropdown">
    <label>{label}</label>
    <select onChange={onChange}>
      <option value="">Select an option</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
