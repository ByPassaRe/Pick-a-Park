import React, {useState} from 'react';
import axios from 'axios';

function ChangePasswordForm() {
  const [data, setData] = useState({});
 
 
  
  const handleCorrectData = async () => {
    try {
      //I try to change the password
      //the checking of the actual password is moved to the server
      const response = await axios.post('http://localhost:5000/users/changePassword', { 
        actualPassword: data.actualPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword
      });
      response.status === 200 ? alert('Password changed!') : alert("Wrong actual password!");
    } catch (err) {
      alert(err);
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