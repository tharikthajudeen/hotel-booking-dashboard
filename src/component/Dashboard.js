import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelBookingForm = () => {
  const [hotelNames, setHotelNames] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [boardTypes, setBoardTypes] = useState([]);
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [boardType, setBoardType] = useState('');

  useEffect(() => {
    const fetchHotelNames = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hotels/names');
        setHotelNames(response.data);
      } catch (error) {
        console.error('Error fetching hotel names:', error);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hotels/room-types');
        setRoomTypes(response.data);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    const fetchBoardTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hotels/board-types');
        setBoardTypes(response.data);
      } catch (error) {
        console.error('Error fetching board types:', error);
      }
    };

    fetchHotelNames();
    fetchRoomTypes();
    fetchBoardTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    try {
      const response = await axios.post('http://localhost:8080/api/hotels', {
        name,
        roomType,
        boardType
      });
      console.log('Hotel details saved:', response.data);
      // Reset the form after successful submission
      setName('');
      setRoomType('');
      setBoardType('');
    } catch (error) {
      console.error('Error saving hotel details:', error);
    }
  };

  return (
    <div>
      <h1>Hotel Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hotel Name:</label>
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          >
            <option value="">Select Hotel Name</option>
            {hotelNames.map((hotelName, index) => (
              <option key={index} value={hotelName}>{hotelName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Room Type:</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Board Type:</label>
          <select
            value={boardType}
            onChange={(e) => setBoardType(e.target.value)}
            required
          >
            <option value="">Select Board Type</option>
            {boardTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HotelBookingForm;
