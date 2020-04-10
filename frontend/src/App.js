import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogoutButton from './pages/LogoutButton';
import LoginForm from './pages/LoginForm';

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

      <LogoutButton />
        <nav>
          <ul>
            <li>
              <Link to="/auth">Login</Link>
            </li>
            
          </ul>
        </nav>

        <Route path="/auth" component={LoginForm} />
      </div>
    </Router>
  );
}

export default App;
