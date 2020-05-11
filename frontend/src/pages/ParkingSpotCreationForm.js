import React, { useState } from 'react';
import {partialRight} from 'ramda';
import axios from "../services/axiosService";
import { PageHeader, Button, Input } from 'antd';
import '../App.css';

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
    <>
    <PageHeader
              className="site-page-header"
              title="Create a Parking Spot"
            />
        <br/>
      Latitude:
      <Input type="text"  name="latitude" onChange={(e) => setLocation({...location, latitude: e.target.value})} />
      <br />

      Longitude:
      <Input type="text" name="longitude" onChange={(e) => setLocation({...location, longitude: e.target.value})} />
      <br />

      <Button onClick={handleSubmit}>Create Parking Spot</Button>
    </>
  );
}

export default ParkingSpotCreationForm;