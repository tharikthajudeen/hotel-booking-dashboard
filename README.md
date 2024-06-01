# Hotel Booking Application

This React application allows users to book hotels by selecting the hotel name, room type, and board type. The application fetches data from an API and displays a booking form with a background image slider. Users can submit the form, and a toast notification will indicate the result.

## Features

- Fetches hotel names, room types, and board types from an API.
- Displays a booking form with dropdowns for hotel name, room type, and board type.
- Image slider with sample hotel images as background.
- Toast notifications for form submission status.
- Form validation to ensure all fields are filled out before submission.
- Responsive design suitable for different screen sizes.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tharikthajudeen/hotel-booking-dashboard.git
   cd hotel-booking-dashboard
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Dependencies

- **React**: Frontend library for building user interfaces.
- **Axios**: For making HTTP requests to the API.
- **React Toastify**: For displaying toast notifications.
- **React Icons**: For using FontAwesome icons.
- **React Slick**: For creating the image slider.
- **Slick Carousel**: CSS for React Slick.

## Custom Hook: `useFetch`

A custom hook for fetching data from an API.

### Usage:

```javascript
const { data, loading, error } = useFetch('http://localhost:8080/api/endpoint');
```

## Components

### HotelBookingForm

The main component that renders the booking form and background image slider.

#### State Management:

- `name`: Hotel name selected by the user.
- `roomType`: Room type selected by the user.
- `boardType`: Board type selected by the user.
- `submitting`: Boolean to indicate form submission status.

#### Form Submission:

- Validates that all fields are filled.
- Submits the form data to the API.
- Displays success or error toast notifications.

### Slider Settings

Settings for the background image slider.

```javascript
const settings = {
  infinite: true,
  speed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  adaptiveHeight: true,
};
```

### Sample Images

Three sample images (`hotelImage1`, `hotelImage2`, `hotelImage3`) are used in the image slider.

## API Endpoints

- **GET** `http://localhost:8080/api/hotels/names`: Fetch hotel names.
- **GET** `http://localhost:8080/api/hotels/room-types`: Fetch room types.
- **GET** `http://localhost:8080/api/hotels/board-types`: Fetch board types.
- **POST** `http://localhost:8080/api/hotels`: Submit booking form data.

## Development

### Folder Structure

```
hotel-booking-app/
├── public/
├── src/
│   ├── components/
│   │   └── HotelBookingForm.js
│   ├── images/
│   │   └── hotel-image.jpg
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

### Adding More Images

Add more images to the `src/images/` directory and import them in `HotelBookingForm.js`. Update the `images` array to include the new images.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

