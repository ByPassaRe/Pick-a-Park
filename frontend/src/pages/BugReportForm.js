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



  return (
    
    <div>
      <PageHeader
              className="site-page-header"
              title="Create a Bug Report"
            />
        <br/>
      Description of the Bug:
      <Input type="text" name="text" placeholder= "explain the problem" onChange={(e) => setbugReport({ ...bugReport, text: e.target.value })} />
      <br />
      <Button onClick={handleSubmit}>Create Bug</Button>
      <br />
    </div>
    
  );

}
export default BugReportForm;