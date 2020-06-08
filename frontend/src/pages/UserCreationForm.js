import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router";
import { Form, PageHeader, Button, Input} from 'antd';
import { UserOutlined, LockOutlined, FileOutlined } from '@ant-design/icons';

import '../App.css';

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
      if (response.status === 200) {
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
    if (!isValidUsername(user))
      handleBadData("Username not valid");
    else if (!isValidPassword(user))
      handleBadData("Password must have at least 8 characters");
    else if (!isConfirmEquals(user))
      handleBadData("Password and Confirm Password are different");
    else if (!isValidEmail(user))
      handleBadData("Email not valid");
    else
      handleCorrectData();
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 8,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 8,
        offset: 0,
      },
      sm: {
        span: 8,
        offset: 4,
      },
    },
  };


  return (
    <div className="container-registration">
      <PageHeader
        className="site-page-header"
        title
        onBack={() => history.goBack()}
      />
      <Form
        {...formItemLayout}
        name="register"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{
            required: true,
            message: 'Please input a Username!',
          }
          ]}

        >
          <Input type="text" name="username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input a Password!',
            },
          ]}
        >
          <Input type="password" name="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </Form.Item>
        <Form.Item
          name="conf-password"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm the Password!',
            },
          ]}
        >
          <Input type="password" name="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input an E-mail!',
            },
          ]}
        >
          <Input type="text" name="email" prefix={<FileOutlined className="site-form-item-icon" />} placeholder="E-mail" onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button className="button" type="default" onClick={handleSubmit}>Sign Up</Button>
        </Form.Item>
      </Form>
    </div>

  );
}

export default UserCreationForm;