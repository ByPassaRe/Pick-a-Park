import React, {useState} from 'react';
import axios from "../services/axiosService";

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
    <div>
      <h2>Change Password</h2>
      Actual Password:
      <input type="password" name="actualPassword" onChange={(e) => setData({...data, actualPassword: e.target.value})}/>
      <br />

      New Password:
      <input type="password" name="newPassword" onChange={(e) => setData({...data, newPassword: e.target.value})}/>
      <br />

      Confirm new password:
      <input type="password" name="confirmNewPassword" onChange={(e) => setData({...data, confirmNewPassword: e.target.value})}/>
      <br />


      <button onClick ={handleSubmit}>Change Password</button>
    </div>
  );
}

export default ChangePasswordForm;