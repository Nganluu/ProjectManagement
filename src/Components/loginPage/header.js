import React, { Component } from 'react'
import '../../styles/Login.css'
import { Button } from 'reactstrap'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Input, InputGroup } from 'reactstrap'
import {connect} from 'react-redux'
import {userLogin} from '../../Actions/accountActions'

class header extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      passError: "",
      emailError: "",
      signined: false,
    }
  }
  onChangeEmail = (event)=>{
    this.setState({email: event.target.value}, ()=>{this.validateEmail()})
}
validateEmail = () => {
  const { email } = this.state;
  this.setState({
    emailError:
      email.length > 0 ? null : true
  });
}
onChangePassword = (event)=>{
  this.setState({password: event.target.value}, ()=>{this.validatePassword()})
}
validatePassword = () => {
  const { password } = this.state;
  this.setState({
   passError:
      password.length > 0 ? null : true
  });
}
  componentDidUpdate(){
    if(!this.state.signined){
      if(this.props.account.loginSuccess){
        this.setState({
          signined: true
        })
      }
    }
    localStorage.setItem("signined", this.props.account.loginSuccess);
    localStorage.setItem("userId", this.props.account.id); 
    if(localStorage.getItem("signined")){
      this.props.history.push('/home');
    }
    
  }

  onLogin=()=>{
    this.setState({signined: true})
    this.props.userLogin(this.state.email, this.state.password);
    
  }

  render() {
    return (
      <div className="container-fluid" id="header">
        <div className="row">
          <div className="col-md-7">
            <i className="fas fa-tasks" style={{ marginRight: "10px" }}></i>
            <Link to='/' style={{ textDecoration: "none", color: "#4267b2" }}><b> PROMAN </b></Link>
          </div>
          <div className="col-md-4">
          <InputGroup>
            <Input type="text" onBlur={this.validateEmail} onChange={this.onChangeEmail} value={this.state.email} placeholder="Your Email.." type="email" style={{marginRight: "15px"}}  />
            <Input type="text" onBlur={this.validatePassword} onChange={this.onChangePassword} value={this.state.password} placeholder="Enter your password" type="password"/>
            </InputGroup>
          </div>
          <div className="col-md-1" style={{top: "-9px"}}>
            <Button onClick={this.onLogin}>
              Log in
            </Button>
            </div>
        </div>
      </div>
    )
  }
}
const mapStatetoProps = state => ({
  account: state.account
})
export default connect(mapStatetoProps, {userLogin})(withRouter(header))