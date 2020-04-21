import React from 'react';
import { useHistory } from "react-router";

function LogoutButton() {

  let history = useHistory();

  const handleSubmit = () => {
    if(localStorage.getItem('jwt')){
      localStorage.removeItem('jwt');
      alert("You are logged off!");
      history.push("/");
    }
    else
      alert("You are not logged!");
  }



  return (localStorage.jwt === undefined)? 
  ( <span>You are not logged in.</span>)
  :
  (
    <button onClick ={handleSubmit}>Logout</button>
  );
}

export default LogoutButton;