import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from './Components/loginPage';
import userPage from './Components/userPage';
class App extends Component {
  render() {
    return (
      <div>
       <Router>
       <div>
         <Route exact path='/' component={LoginPage}/>
         <Route exact path='/home' component={userPage}/>
         </div>
       </Router>
      </div>
    );
  }
}

export default App;
