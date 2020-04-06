import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router";


function LoginForm() {
  let history = useHistory();
  const [credential, setCredential] = useState({username: "", password: ""});
  // eslint-disable-next-line
  const usernameRegex = /^[a-z0-9_-]{3,30}$/;

  //Check methods
  const isValidUsername = user => user.username.match(usernameRegex);
  const isValidPassword = user => user.password.length >= 8

  
  const handleCorrectData = async () => {
    
    try {
      const response = await axios.post('http://localhost:5000/auth', { 
        username: credential.username,
        password: credential.password
      });
      

      if(response.status === 200){
        //All right!
        alert(response.data.message)
        history.push("/users");

      }
      else {
        //Error password/username
        alert(response.data.message)
      }
  
    } catch (error) {
      alert(error)
    }
  };

  const handleBadData = (err) => {
    alert(err); 
  }

  const handleSubmit = () => {
    if(!isValidUsername(credential))
      handleBadData("Username not valid ( length or chars not valid )");
    else if(!isValidPassword(credential))
      handleBadData("Password must have at least 8 characters");
    else
    handleCorrectData();
  }



  return (
      <div>
      Username:
      <input type="text"  name="username" onChange={(e) => setCredential({...credential, username: e.target.value})}/>
      <br />

      Password:
      <input type="password" name="password" onChange={(e) => setCredential({...credential, password: e.target.value})}/>
      <br />

      <button onClick ={handleSubmit}>Sign In</button>
    </div>
   
  );
}

export default LoginForm;