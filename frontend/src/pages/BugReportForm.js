import React, { useState } from 'react';
import axios from "../services/axiosService";
import { Button, Input, Form } from 'antd';
import Swal from 'sweetalert2'

import '../App.css';

function BugReportForm() {
  const [bugReport, setbugReport] = useState({});

  const handleCorrectData = async () => {

    try {
      const response = await axios.post('http://localhost:5000/bugReports', {
        text: bugReport.text
      })
      response.status === 200 ? Swal.fire('BugReport succesfully Sent') : Swal.fire(response);
    } catch (err) {
      Swal.fire(err.response.data.message);
    }
  };

  const handleBadData = () => {
    Swal.fire('Fill it!');
  }

  const handleSubmit = () =>
    (bugReport.text) ? handleCorrectData() : handleBadData();


  const { TextArea } = Input;

  return (
    <div className="container-registration">
      <h2>Bug Report</h2>
      <Form
        name="bug-form"
        className="bug-form"
      >
        <Form.Item
          label="Description of the Bug:"
          name="description"
        >
      <TextArea rows={4} type="text" name="text" maxLength={5000} autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Explain the problem" onChange={(e) => setbugReport({ ...bugReport, text: e.target.value })} />
      </Form.Item>
        <Form.Item>
          <Button className="button" type="primary" onClick={handleSubmit}>Create Bug</Button>
        </Form.Item>
      </Form>
    </div>

  );

}
export default BugReportForm;