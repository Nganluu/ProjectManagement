import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import LoginPage from './Components/loginPage';
import homePage from './Components/homePage';
import projectPage from './Components/projectPage';
import contactPage from './Components/contactPage';
import userInfo from './Components/userInfo';
import detailPage from './Components/detailPage';


const PrivateRoute = ({component: Component, ...rest})=>(
<Route {...rest}
 render={props=> localStorage.getItem("signined") ? 
 <Component {...props} /> : <Redirect to="/"/>} 
 />
)
class App extends Component {
  render() {
    return (
      <div>
       <Router>
       <div>
       <Switch>
         <Route exact path='/' component={LoginPage}/>
         <PrivateRoute exact path='/home' component={homePage}/>
         <PrivateRoute exact path='/project/:id' component={projectPage}/>
         <Route exact path='/contact' component={contactPage}/>
         <PrivateRoute exact path='/user' component={userInfo}/>
         <PrivateRoute exact path='/detailpage' component={detailPage}/>
         </Switch>
         </div>
       </Router>
      </div>
    );
  }
}

export default (App);
