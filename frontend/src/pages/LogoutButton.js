import React from 'react';

function LogoutButton() {
  
  const handleSubmit = () => {
    if(localStorage.getItem('jwt'))
      localStorage.removeItem('jwt');
    else
      alert("You are not logged!");
  }



  return (
    <div>
      <button onClick ={handleSubmit}>Logout</button>
    </div>
  );
}

export default LogoutButton;