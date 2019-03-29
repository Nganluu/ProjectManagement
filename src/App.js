import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from './Components/loginPage';
import userPage from './Components/userPage';
import contactPage from './Components/contactPage';
import userInfo from './Components/userInfo';
import detailPage from './Components/detailPage';
class App extends Component {
  render() {
    return (
      <div>
       <Router>
       <div>
         <Route exact path='/' component={LoginPage}/>
         <Route exact path='/home' component={userPage}/>
         <Route exact path='/contact' component={contactPage}/>
         <Route exact path='/user' component={userInfo}/>
         <Route exact path='/detailpage' component={detailPage}/>
         </div>
       </Router>
      </div>
    );
  }
}

export default App;
