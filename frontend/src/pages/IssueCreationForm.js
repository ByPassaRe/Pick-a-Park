import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Form, Button } from 'antd';

import '../App.css';

function IssueCreationForm() {
  const [issue, setIssue] = useState({});
  const [slot, setSlot] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const park = await axios.get('http://localhost:5000/parkingSpots');
      //console.log(park.data.parkingSpots.map(function (item) { return item._id; }));
      const idArray = park.data.parkingSpots.map(function (item) { return item._id; });
      setSlot(idArray);
    }

    fetchData();
  }, []);

  const handleCorrectData = async () => {

    try {
      const response = await axios.post('http://localhost:5000/issues', {
        text: issue.text,
        parkingSpot: issue.parkingSpot
      })
      response.status === 200 ? alert('Issue Created succesfully') : alert(response);
    } catch (err) {
      alert(err);
    }
  };
  /** 
    const handleBadData = (err) => {
      alert(err); 
    }
     const handleSubmit = () => {
      if(!issue.text)
        handleBadData('Insert a description of the issue');
      else
      handleCorrectData();
    }
    */
  const handleBadData = () => {
    alert('Insert a description of the issue');
  }

  const handleSubmit = () =>
    (issue.text) ? handleCorrectData() : handleBadData();

  const { TextArea } = Input;



  return (

    <div className="container-registration">
      <h2>Create an issue</h2>
      <br />
      <Form.Item
        label="Description:"
        name="description">
      </Form.Item>
      <Form.Item>
        <TextArea rows={4} maxLength={5000} autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Insert a Description of the Issue" onChange={(e) => setIssue({ ...issue, text: e.target.value })} ></TextArea>
      </Form.Item>
      <Form.Item
        label="Parking Spot:"
        name="parkingSpot">
        <Select style={{ verticalAlign: 'middle', width: 300 }} placeholder="Select a Parking Spot"  onChange={(e) => setIssue({ ...issue, parkingSpot: e.target.value })}>
          <Select.Option default>None</Select.Option>
          {slot.map(item =>
            <Select.Option key={item}>{item}</Select.Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button className="button" type="default" onClick={handleSubmit}>Create Issue</Button>
      </Form.Item>
      <br />
    </div>

  );

}
export default IssueCreationForm;