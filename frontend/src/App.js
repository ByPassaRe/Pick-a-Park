import React from 'react';

import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import ParkingSpotCreationForm from './pages/ParkingSpotCreationForm';
function App() {
  return (
    /*
    <p>Hello world!</p>
    */
   
   <React.Fragment>
     <UserCreationForm />
     <p>
       ---------------------------
     </p>
     <LoginForm/>
   </React.Fragment>
   
    //<ParkingSpotCreationForm/>
  );
}

export default App;
