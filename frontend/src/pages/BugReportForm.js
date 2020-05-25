import React, { useState } from 'react';
import axios from "../services/axiosService";
import { PageHeader, Button, Input } from 'antd';

import '../App.css';

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


 const { TextArea } = Input;

  return (
    
    <div className="container">
      <h2 >Bug Report</h2>
        <br/>
      Description of the Bug:
      <TextArea  rows={4} type="text" name="text" placeholder= "explain the problem" onChange={(e) => setbugReport({ ...bugReport, text: e.target.value })} />
      <br />
      <br/>
      <div class="center">
      <Button onClick={handleSubmit}>Create Bug</Button>
      </div>
      <br />
    </div>
    
  );

}
export default BugReportForm;