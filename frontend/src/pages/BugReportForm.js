import React, { useState } from 'react';
import axios from "../services/axiosService";

function BugReportForm() {
  const [bugReport, setbugReport] = useState({});

  const handleCorrectData = async () => {

    try {
      const response = await axios.post('http://localhost:5000/bugReports', {
        text: bugReport.text
      })
      response.status === 200 ? alert('BugReport succesfully Sent') : alert(response);
    } catch (err) {
        alert(err.response.data.message);
    }
  };

 const handleBadData = () => {
  alert('Fill it!');
}

const handleSubmit = () => 
 (bugReport.text) ?  handleCorrectData() : handleBadData();


  return (
    
    <div>
      <h2>Create a Bug Report</h2>
        <br/>
      Description of the Bug:
      <input type="text" name="text" placeholder= "explain the problem" onChange={(e) => setbugReport({ ...bugReport, text: e.target.value })} />
      <br />
      <button onClick={handleSubmit}>Create Bug</button>
      <br />
    </div>
    
  );

}
export default BugReportForm;