import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from './Components/loginPage';
import homePage from './Components/userPage/homePage';
class App extends Component {
  render() {
    return (
      <div>
       <Router>
       <div>
         <Route exact path='/' component={LoginPage}/>
         <Route exact path='/home' component={homePage}/>
         </div>
       </Router>
      </div>
    );
  }
}

export default App;
