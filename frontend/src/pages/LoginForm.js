import React, {useState} from 'react';

function LoginForm() {
  const [credential, setCredential] = useState({});
  // eslint-disable-next-line
  const usernameRegex = /^[a-z0-9_-]{3,30}$/;

  //Check methods
  const isValidUsername = user => user.username.match(usernameRegex);
  const isValidPassword = user => user.password.length >= 8

  
  const handleCorrectData = async () => {
    try {
      alert('User Created succesfully');
    } catch (err) {
      alert(err);
    }
  };

  const handleBadData = (err) => {
    alert(err);
  }

  const handleSubmit = () => {
    if(!isValidUsername(credential))
      handleBadData("Username not valid");
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