import React, { useState } from 'react';
import {partialRight} from 'ramda';

function ParkingSpotCreationForm() {
  const [location, setLocation] = useState({});

  const checkRange = (value, min, max) => (value >= min && value <= max);
  const checkLatitudeRange = partialRight(checkRange, [-90, 90]);
  const checkLongitudeRange = partialRight(checkRange, [-180, 180]);
  const isLocationValidPosition = location => checkLatitudeRange(location.latitude) && checkLongitudeRange(location.longitude);

  const handleSubmit = (event) => 
    isLocationValidPosition(location) ? alert('Valid coordinates') : alert('Invalid coordinates');

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