import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogoutButton from './pages/LogoutButton';
import LoginForm from './pages/LoginForm';
import UserCreationForm from './pages/UserCreationForm';

function App() {
  return (
    /*
    <p>Hello world!</p>
    */
   /*
   <React.Fragment>
     <UserCreationForm />
     <p>
       ---------------------------
     </p>
     <LoginForm/>
   </React.Fragment>
    */
    //<ParkingSpotCreationForm/>
    
    
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/auth">Login</Link>
            </li>
            <li>
              <Link to="/users">Create User</Link>
            </li>
          </ul>
        </nav>

        <Route path="/auth" component={LoginForm} />
        <Route path="/users" component={UserCreationForm} />
        <p>
          ----
        </p>
        <Route component={LogoutButton} />
      </div>
    </Router>
  );
}

export default App;
