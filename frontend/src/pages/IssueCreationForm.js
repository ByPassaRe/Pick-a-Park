import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const OutsetDiv = styled.div`
    border-style: outset;
    margin: 50px;
`;
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
 (issue.text) ?  handleCorrectData() : handleBadData();


  return (
    
    <div>
      <h2>Create an issue:</h2>
      <OutsetDiv>
        <br/>
      Description:
      <input type="text" name="text" placeholder= "insert the issue" onChange={(e) => setIssue({ ...issue, text: e.target.value })} />
      <br />
      Parking Spot:
      <select id="dropdown" name="parkingSlot" onChange={(e) => setIssue({ ...issue, parkingSpot: e.target.value })} >
      <option default>None</option>
        {slot.map(item =>
          <option value={item} key={item} >
            {item}
          </option>
        )}
      </select>
      <br/>
      <button onClick={handleSubmit}>Create Issue</button>
      <br />
      </OutsetDiv>
    </div>
    
  );

}
export default IssueCreationForm;