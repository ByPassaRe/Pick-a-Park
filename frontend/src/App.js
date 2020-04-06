import React from 'react';

import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      </div>
    </Router>
  );
}

export default App;
