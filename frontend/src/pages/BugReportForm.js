import React, { useState } from 'react';
import axios from 'axios';

function BugReportForm() {
  const [bug, setBug] = useState({});

  const handleCorrectData = async () => {

    try {
      const response = await axios.post('http://localhost:5000/bugReports', {
        text: bug.text
      })
      response.status === 200 ? alert('BugReport Created succesfully') : alert(response);
    } catch (err) {
        alert(err.response.data.message);
    }
  };

 const handleBadData = () => {
  alert('Fill it!');
}

const handleSubmit = () => 
 (bug.text) ?  handleCorrectData() : handleBadData();


  return (
    
    <div>
      <h2>Create a Bug Report</h2>
        <br/>
      Description of the Bug:
      <input type="text" name="text" placeholder= "explain the problem" onChange={(e) => setBug({ ...bug, text: e.target.value })} />
      <br />
      <button onClick={handleSubmit}>Create Bug</button>
      <br />
    </div>
    
  );

}
export default BugReportForm;