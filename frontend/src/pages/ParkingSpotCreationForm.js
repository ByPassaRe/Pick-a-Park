import React, { useState } from 'react';
import {partialRight} from 'ramda';
import axios from 'axios';

function ParkingSpotCreationForm() {
  const [location, setLocation] = useState({});

  const checkRange = (value, min, max) => (value >= min && value <= max);
  const checkLatitudeRange = partialRight(checkRange, [-90, 90]);
  const checkLongitudeRange = partialRight(checkRange, [-180, 180]);
  const isLocationValidPosition = location => checkLatitudeRange(location.latitude) && checkLongitudeRange(location.longitude);

  const handleCorrectData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/parkingSpots', { location });
      response.status === 200 ? alert('Parking Spot Created succesfully') : alert(response);
    } catch (err) {
      alert(err);
    }
  };

  const handleBadData = () => {
    alert('Invalid coordinates');
  }

  const handleSubmit = () => 
    isLocationValidPosition(location) ?  handleCorrectData() : handleBadData();

  return (
    <div>
      Latitude:
      <input type="text"  name="latitude" onChange={(e) => setLocation({...location, latitude: e.target.value})} />
      <br />

      Longitude:
      <input type="text" name="longitude" onChange={(e) => setLocation({...location, longitude: e.target.value})} />
      <br />

      <button onClick={handleSubmit}>Create Parking Spot</button>
    </div>
  );
}

export default ParkingSpotCreationForm;