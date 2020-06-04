import React, { useState } from 'react';
import { partialRight } from 'ramda';
import axios from "../services/axiosService";
import { Form, Button, Input } from 'antd';
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
    isLocationValidPosition(location) ? handleCorrectData() : handleBadData();

  return (
    <div className="container-registration">
      <h2 >Create a Parking Spot</h2>
      <br/>
      <Form
        name="ParkingSpot"
        className="spot-form"
      >
        <Form.Item
          name="latitude"
          label="Latitude:"
        >
          <Input style={{ verticalAlign: 'middle', width: 255 }} type="number" name="latitude" onChange={(e) => setLocation({ ...location, latitude: e.target.value })} />
        </Form.Item>
        <Form.Item
          name="longitude"
          label="Longitude:"
        >
          <Input  style={{ verticalAlign: 'middle', width: 244 }} type="number" name="longitude" onChange={(e) => setLocation({ ...location, longitude: e.target.value })} />
        </Form.Item>
        <Form.Item>
          <Button className="button" type="primary" onClick={handleSubmit}>Create Parking Spot</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ParkingSpotCreationForm;