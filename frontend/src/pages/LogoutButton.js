import React from 'react';
import { useHistory } from "react-router";
import localStorageService from "../services/LocalStorage";

function LogoutButton(prop) {

  let history = useHistory();

  const handleSubmit = () => {
    if(localStorageService.getAccessToken()){
      localStorageService.clearToken();
      alert("You are logged off!");
      prop.logout();
      history.push("/login");
    }
    else
      alert("You are not logged!");
  }



  return (localStorageService.getAccessToken() === undefined)? 
  ( <span>You are not logged in.</span>)
  :
  (
    <button onClick ={handleSubmit}>Logout</button>
  );
}

export default LogoutButton;