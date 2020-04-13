import React, {useState} from 'react';
import axios from 'axios';

function ChangePasswordForm() {
  const [data, setData] = useState({});


  const handleSubmit = () => {
    
    console.log(data);
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