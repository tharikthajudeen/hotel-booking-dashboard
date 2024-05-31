import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        boardType,
      });
      console.log('Hotel details saved:', response.data);
      toast.success('Hotel booking successfully submitted!');
      // Reset the form after successful submission
      setName('');
      setRoomType('');
      setBoardType('');
    } catch (error) {
      console.error('Error saving hotel details:', error);
      toast.error('Error submitting the booking.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-custom-gradient min-h-screen py-10 px-4">
      <ToastContainer />
      <div className="w-full md:max-w-2xl md:p-10 p-6 bg-white bg-opacity-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center text-gray-100">Hotel Booking Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-left text-lg md:text-xl font-medium text-gray-100 mb-2">Hotel Name:</label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-3 border border-gray-300 bg-white bg-opacity-5 text-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent transition duration-100 ease-in-out transform hover:scale-105"
            >
              <option value="" className="bg-white bg-opacity-5 text-black">Select Hotel Name</option>
              {hotelNames.map((hotelName, index) => (
                <option key={index} value={hotelName} className="bg-white bg-opacity-5 text-black">{hotelName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-left text-lg md:text-xl font-medium text-gray-100 mb-2">Room Type:</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
              className="block w-full px-4 py-3 border border-gray-300 bg-white bg-opacity-5 text-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent transition duration-100 ease-in-out transform hover:scale-105"
            >
              <option value="" className="bg-white bg-opacity-5 text-black">Select Room Type</option>
              {roomTypes.map((type, index) => (
                <option key={index} value={type} className="bg-white bg-opacity-5 text-black">{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-left text-lg md:text-xl font-medium text-gray-100 mb-2">Board Type:</label>
            <select
              value={boardType}
              onChange={(e) => setBoardType(e.target.value)}
              required
              className="block w-full px-4 py-3 border border-gray-200 bg-white bg-opacity-5 text-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent transition duration-100 ease-in-out transform hover:scale-105"
            >
              <option value="" className="bg-white bg-opacity-5 text-black">Select Board Type</option>
              {boardTypes.map((type, index) => (
                <option key={index} value={type} className="bg-white bg-opacity-5 text-black">{type}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-custom-gradient px-3 py-1 text-sm md:text-lg font-medium text-white backdrop-blur-3xl">
              Submit
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelBookingForm;
