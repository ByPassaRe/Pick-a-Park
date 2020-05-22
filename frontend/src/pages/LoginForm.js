import React, {useState} from 'react';

import axios from 'axios';
import { useHistory } from "react-router";
import { jwtDecode } from 'jwt-js-decode';
import localStorageService from "../services/LocalStorage";
import { PageHeader, Button, Input, Alert } from 'antd';
import '../App.css';




function LoginForm(prop) {
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
        localStorageService.setToken(response.data.token);
        let jwtDecoded = jwtDecode(response.data.token);
        localStorage.setItem('role',jwtDecoded.payload.role);
        localStorage.setItem('username',jwtDecoded.payload.username);
        prop.login();
        history.push("/");
        
      }
    } catch (error) {
      alert(error.response.data.message)
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
        
        <PageHeader
              className="site-page-header"
              title="Login"
            />
        Username:
        <Input type="text"  name="username" onChange={(e) => setCredential({...credential, username: e.target.value})}/>
        <br />
        Password:
        <Input  type="password" name="password" onChange={(e) => setCredential({...credential, password: e.target.value})}/>
        <br />      
        <Button onClick ={handleSubmit}>Sign In</Button>
      </div>
    
  );
}

export default LoginForm;