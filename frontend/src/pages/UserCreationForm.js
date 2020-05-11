import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router";

function UserCreationForm() {
  let history = useHistory();
  const [user, setUser] = useState({});
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  // eslint-disable-next-line
  const usernameRegex = /^[a-z0-9_-]{3,30}$/;

  //Check methods
  const isValidUsername = user => user.username.match(usernameRegex);
  const isValidEmail = user => user.email.match(emailRegex);
  const isConfirmEquals = user => user.password === user.confirmPassword
  const isValidPassword = user => user.password.length >= 8

  
  const handleCorrectData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', { 
        username: user.username,
        email: user.email,
        password: user.password
      });
      if(response.status === 200){
        alert('User Created succesfully') 
        history.push("/public");
      }
      else
        alert(response);
    } catch (err) {
      alert(err);
    }
  };

  const handleBadData = (err) => {
    alert(err);
  }

  const handleSubmit = () => {
    if(!user.username || !user.email || !user.password)
      handleBadData("Missing data");
    else if(!isValidUsername(user))
      handleBadData("Username not valid");
    else if(!isValidPassword(user))
      handleBadData("Password must have at least 8 characters");
    else if(!isConfirmEquals(user))
      handleBadData("Password and Confirm Password are different");
    else if(!isValidEmail(user))
      handleBadData("Email not valid");
    else
    handleCorrectData();
  }



  return (
    <div>  
      <h3>Create user</h3>
      Username:
      <input type="text"  name="username" onChange={(e) => setUser({...user, username: e.target.value})}/>
      <br />

      Password:
      <input type="password" name="password" onChange={(e) => setUser({...user, password: e.target.value})}/>
      <br />

      Confirm Password:
      <input type="password" name="password" onChange={(e) => setUser({...user, confirmPassword: e.target.value})}/>
      <br />

      Email:
      <input type="text" name="email" onChange={(e) => setUser({...user, email: e.target.value})}/>
      <br />

      <button onClick ={handleSubmit}>Sign Up</button>
    </div>
  );
}

export default UserCreationForm;