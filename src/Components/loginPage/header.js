import React, { Component } from 'react'
import '../../styles/Login.css'
import { Button } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { Input, InputGroup } from 'reactstrap'

class header extends Component {
  constructor(props){
    super(props);
    this.state={
      userName: "",
      pass: "",
      signined: false,
    }
  }
  handleUser=(event)=>{
    this.setState({
      userName: event.target.value
    })
  }
  handlePass=(event)=>{
    this.setState({
      pass: event.target.value
    })
  }
  fetchLogin=()=>{
    fetch("",{
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        pass: this.state.pass
      }
      )
    },
    ).then(response=>response.json)
    .then(response=>this.setState({}))
  }
  onClick=()=>{
    this.setState({signined: true})
    this.fetchLogin();
    localStorage.setItem("signined", this.state.signined);
    localStorage.setItem("userId", ""); 
    let path='/home';
    this.props.history.push(path)
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
            <Input placeholder="Your Email.." type="email" style={{marginRight: "15px"}}  />
            <Input placeholder="Enter your password" type="password"/>
            </InputGroup>
          </div>
          <div className="col-md-1" style={{top: "-9px"}}>
            <Button onClick={this.onClick}>
              Log in
            </Button>
            </div>
        </div>
      </div>
    )
  }
}
export default withRouter(header)