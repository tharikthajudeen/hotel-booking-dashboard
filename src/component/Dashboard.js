import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import hotelImage1 from '../images/hotel-image.jpg'; // Importing sample hotel images
import hotelImage2 from '../images/hotel-image.jpg';
import hotelImage3 from '../images/hotel-image.jpg';

// Custom hook for data fetching
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

const HotelBookingForm = () => {
  // Fetch hotel names, room types, and board types from the API
  const { data: hotelNames, loading: hotelNamesLoading, error: hotelNamesError } = useFetch('http://localhost:8080/api/hotels/names');
  const { data: roomTypes, loading: roomTypesLoading, error: roomTypesError } = useFetch('http://localhost:8080/api/hotels/room-types');
  const { data: boardTypes, loading: boardTypesLoading, error: boardTypesError } = useFetch('http://localhost:8080/api/hotels/board-types');

  // Form state management
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [boardType, setBoardType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Form validation: Ensure all fields are filled
    if (!name || !roomType || !boardType) {
      toast.error('Please fill out all fields.');
      return;
    }

    setSubmitting(true);

    try {
      // Submit form data to the API
      await axios.post('http://localhost:8080/api/hotels', { name, roomType, boardType });
      toast.success('Hotel booking successfully submitted!');
      // Reset the form after successful submission
      setName('');
      setRoomType('');
      setBoardType('');
    } catch (error) {
      toast.error('Error submitting the booking.');
    } finally {
      setSubmitting(false);
    }
  };

  // Slider settings
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true, // Ensuring adaptive height for responsiveness
  };

  // Images for the slider
  const images = [hotelImage1, hotelImage2, hotelImage3];

  return (
    <div className="relative min-h-screen h-full flex items-center justify-center">
      {/* Image Slider Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Slider {...settings} className="w-full h-full">
          {images.map((image, index) => (
            <div key={index} className="w-full h-full">
              <img src={image} alt={`hotel-${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </Slider>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      </div>

      {/* Toast Notification Container */}
      <div className="absolute top-0 left-0 z-50">
        <ToastContainer />
      </div>

      {/* Main Content */}
      <div className="md:relative absolute top-1 left-0 md:z-50 z-10 flex ml-4 md:ml-0 md:flex-col items-center justify-center text-center text-gray-100 px-4">
        <div className="container mx-auto py-4 md:py-6">
          <h1 className="text-md md:text-3xl font-bold mb-2">Book your place</h1>
          <h1 className="text-4xl md:text-8xl font-extrabold mb-2">Visit Saudi Arabia</h1>
          <h1 className="text-sm md:text-xl font-semibold mb-2">Search exclusive stays for your vacation in Saudi Arabia</h1>
        </div>

        {/* Form Container */}
        <div className="w-full md:max-w-3xl p-4 md:p-6 bg-white bg-opacity-20 rounded-2xl shadow-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="flex flex-wrap justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Hotel Name Dropdown */}
              <div className="w-full md:w-auto">
                <span className="sr-only">Hotel Name:</span>
                {hotelNamesLoading ? (
                  <p>Loading hotel names...</p>
                ) : hotelNamesError ? (
                  <p>Error loading hotel names</p>
                ) : (
                  <select
                    id="hotelName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 bg-white bg-opacity-70 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent transition duration-100 ease-in-out hover:shadow-md"
                  >
                    <option value="">Select Hotel Name</option>
                    {hotelNames.map((hotelName, index) => (
                      <option key={index} value={hotelName}>{hotelName}</option>
                    ))}
                  </select>
                )}
              </div>
    
              {/* Room Type Dropdown */}
              <div className="w-full md:w-auto">
                <span className="sr-only">Room Type:</span>
                {roomTypesLoading ? (
                  <p>Loading room types...</p>
                ) : roomTypesError ? (
                  <p>Error loading room types</p>
                ) : (
                  <select
                    id="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 bg-white bg-opacity-70 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent transition duration-100 ease-in-out hover:shadow-md"
                  >
                    <option value="">Select Room Type</option>
                    {roomTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                )}
              </div>
    
              {/* Board Type Dropdown */}
              <div className="w-full md:w-auto">
                <span className="sr-only">Board Type:</span>
                {boardTypesLoading ? (
                  <p>Loading board types...</p>
                ) : boardTypesError ? (
                  <p>Error loading board types</p>
                ) : (
                  <select
                    id="boardType"
                    value={boardType}
                    onChange={(e) => setBoardType(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 bg-white bg-opacity-70 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent transition duration-100 ease-in-out hover:shadow-md"
                  >
                    <option value="">Select Board Type</option>
                    {boardTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                )}
              </div>
    
              {/* Submit Button */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-6 h-12 text-white font-bold inline-flex justify-center items-center rounded-lg bg-blue-500 hover:bg-blue-700 focus:ring-offset-gray-100 transition duration-100 ease-in-out"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <FaCheck className="mr-2 animate-spin" />
                      <span>Booking...</span>
                    </span>
                  ) : (
                    <span>Book</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingForm;
