import React, {useState} from 'react';

import axios from 'axios';
import { useHistory } from "react-router";
import { jwtDecode } from 'jwt-js-decode';
import localStorageService from "../services/LocalStorage";
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

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
    <div className="container-login">
    <h2 >Login</h2>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
    >
    <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input type="text"  name="username"  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => setCredential({...credential, username: e.target.value})}/>
        </Form.Item>
        <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input type="password" name="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" onChange={(e) => setCredential({...credential, password: e.target.value})}/>
        </Form.Item>
        <Form.Item>  
        <Button className="button" type="default" onClick ={handleSubmit}>Sign In</Button>
        </Form.Item>
    </Form>
    </div>
    
  );
}

export default LoginForm;