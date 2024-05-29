// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from './Dropdown';

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [boardTypes, setBoardTypes] = useState([]);

  const [hotelName, setHotelName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [boardType, setBoardType] = useState('');

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const hotelResponse = await axios.get('http://localhost:8080/bookings/hotels');
        setHotels(hotelResponse.data);

        const roomTypeResponse = await axios.get('http://localhost:8080/bookings/roomTypes');
        setRoomTypes(roomTypeResponse.data);

        const boardTypeResponse = await axios.get('http://localhost:8080/bookings/boardTypes');
        setBoardTypes(boardTypeResponse.data);
      } catch (error) {
        console.error('Error fetching dropdown data', error);
        toast.error('Error fetching dropdown data');
      }
    };

    fetchDropdownData();
  }, []);

  const handleSubmit = () => {
    const data = { hotelName, roomType, boardType };
    axios.post('http://localhost:8080/bookings', data)
      .then(response => {
        toast.success('Booking saved successfully!');
      })
      .catch(error => {
        toast.error('Failed to save booking!');
      });
  };

  return (
    <div className="dashboard">
      <h1>Hotel Booking Dashboard</h1>
      <Dropdown label="Hotel Name" options={hotels} onChange={e => setHotelName(e.target.value)} />
      <Dropdown label="Room Type" options={roomTypes} onChange={e => setRoomType(e.target.value)} />
      <Dropdown label="Board Type" options={boardTypes} onChange={e => setBoardType(e.target.value)} />
      <button onClick={handleSubmit}>Save Booking</button>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
