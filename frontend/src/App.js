import React, { Component } from 'react';
import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import LogoutButton from './pages/LogoutButton';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProfilePage from './pages/ProfilePage';
import { PrivateRoute } from './services/PrivateRoute';
import localStorageService from "./services/LocalStorage";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isLogged: false };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if(localStorageService.getAccessToken())
      this.setState({ isLogged: true });
    else
      this.setState({ isLogged: false }); 
  }

 
  logout() {
    this.setState({ isLogged: false }); 
  }

  login() {
    this.setState({ isLogged: true }); 
  }

  render(){

    const { isLogged } = this.state;

    return(

        <BrowserRouter>
            <nav>
                {(isLogged)? 
                  (<LogoutButton logout={this.logout}/>) 
                  :
                  (<span>This is Pick-A-Park</span>)
                }
            </nav>

            <Switch>
              <Route exact path={"/login"}>
                <div>
                  <LoginForm login={this.login}/>
                  <hr/>
                  <UserCreationForm/>
                </div>
                
              </Route>

              <PrivateRoute path="/">
                <ProfilePage/>
              </PrivateRoute>
              <Route>
                <div>404 Not Found</div>
              </Route>
            </Switch>
        </BrowserRouter>
        
    );
  }
}
export default App;
