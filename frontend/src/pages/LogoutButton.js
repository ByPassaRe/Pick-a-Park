import React from 'react';
import { useHistory } from "react-router";
import localStorageService from "../services/LocalStorage";
import { Button } from 'antd';
import '../App.css';
import Swal from 'sweetalert2'

function LogoutButton(prop) {

  let history = useHistory();

  const handleSubmit = () => {
    if(localStorageService.getAccessToken()){
      localStorageService.clearToken();
      Swal.fire("You are logged off!");
      prop.logout();
      history.push("/login");
    }
    else
      Swal.fire("You are not logged!");
  }



  return (localStorageService.getAccessToken() === undefined)? 
  ( <span>You are not logged in.</span>)
  :
  (
    <Button onClick ={handleSubmit}>Logout </Button>
  );
}

export default LogoutButton;