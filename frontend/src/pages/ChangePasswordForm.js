import React, {useState} from 'react';
import axios from "../services/axiosService";
import { Form, Button, Input } from 'antd';
import '../App.css';

function ChangePasswordForm() {
  const [data, setData] = useState({});
 

  
  const handleCorrectData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/change-password', { 
        actualPassword: data.actualPassword,
        newPassword: data.newPassword
      });
      if(response.status === 200)
        alert('Password changed!')
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleBadData = (err) => {
    alert(err);
  }

  const handleSubmit = () => {
       if(data.newPassword !== data.confirmNewPassword)
      handleBadData("The two passwords are different");
    else if(data.newPassword.length < 8)
      handleBadData("The new password must have at least 8 characters");
    else
      handleCorrectData();
  }



  return (
    <div className="container-registration">
      <h2 >Change Password</h2>
      <Form
      name="changePassword"
      className="changePass-form"
    >
     <Form.Item
        label="Actual Password"
        name="password"
      >
      <Input type="password" name="actualPassword" onChange={(e) => setData({...data, actualPassword: e.target.value})}/>
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
      >
      <Input type="password" name="newPassword" onChange={(e) => setData({...data, newPassword: e.target.value})}/>
      </Form.Item>
      <Form.Item
        label="Confirm New Password"
        name="ConfirmNewPassword"
        dependencies={['newPassword']}

      >
      <Input type="password" name="confirmNewPassword" onChange={(e) => setData({...data, confirmNewPassword: e.target.value})}/>
      </Form.Item>     
      <Form.Item>  
        <Button className="button" type="default" onClick ={handleSubmit}>Change Password</Button>
        </Form.Item> 
        </Form>
    </div>
  );
}

export default ChangePasswordForm;