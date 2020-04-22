import React, { useState, useEffect } from 'react';
import axios from 'axios';
function IssueCreationForm() {
  const [issue, setIssue] = useState({});
  var arr = [0, 1, 2, 3, 4];


  useEffect(() => {
    async function fetchData() {
      const park = await axios.get('http://localhost:5000/parkingSpots');
      console.log(park.data.parkingSpots.map(function (item) { return item._id; }));
    }
    fetchData();

  }, []);

  const handleCorrectData = async () => {

    try {
      const response = await axios.post('http://localhost:5000/issues', { text: issue.text, parkingSpot: issue.parkingSpot })
      response.status === 200 ? alert('Issue Created succesfully') : alert(response);
    } catch (err) {
      alert(err);
    }
  };


  const handleSubmit = () => {
    handleCorrectData();
  }

  return (
    <div>
      Text:
      <input type="text" name="text" onChange={(e) => setIssue({ ...issue, text: e.target.value })} />
      <br />
      Parking Spot:
        <select id="dropdown" onChange={(e) => setIssue({ ...issue, parkingSpot: e.target.value })}>
        {arr.map(item => (

          <option value={item.index} key={item} >
            {item}</option>
        ))}
      </select>

      <button onClick={handleSubmit}>Create Issue</button>
    </div>
  );

}
export default IssueCreationForm;