import React from 'react';

function UserCreationForm() {

  return (
    <div>
      Username:
      <input type="text"  name="username"/>
      <br />

      Password:
      <input type="password" name="password"/>
      <br />

      Confirm Password:
      <input type="password" name="password"/>
      <br />

      Email:
      <input type="text" name="email"/>
      <br />

      <button>Sign In</button>
    </div>
  );
}

export default UserCreationForm;