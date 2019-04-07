import React, { Component } from 'react'
import '../../styles/Login.css'
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogin } from '../../Actions/accountActions'

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passError: "",
      emailError: "",
      modalErr: false,
      checkAccount: false
    }
  }
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value }, () => { this.validateEmail() })
  }
  validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError:
        email.length > 0 ? null : true
    });
  }
  onChangePassword = (event) => {
    this.setState({ password: event.target.value }, () => { this.validatePassword() })
  }
  validatePassword = () => {
    const { password } = this.state;
    this.setState({
      passError:
        password.length > 0 ? null : true
    });
  }

  componentDidUpdate() {
    localStorage.setItem("signined", this.props.account.loginSuccess);
    localStorage.setItem("userId", this.props.account.id);
    localStorage.setItem("name", this.props.account.name)
    localStorage.setItem("email", this.props.account.email)
    localStorage.setItem("token", this.props.account.token)
    console.log(this.props.account.error)
    
    if(this.props.account.error&&this.state.checkAccount){
      this.setState({
        modalErr: true,
        checkAccount: false
      })
    }
    if (localStorage.getItem("signined")) {
      this.props.history.push('/home');
    }
  }
  toggle = () => {
    this.setState({
      modalErr: !this.state.modalErr,
    })
  }
  onLogin = () => {
    if (!this.state.email) {
      this.setState({
        emailError: true
      })
    }
    if (!this.state.password) {
      this.setState({
        passError: true
      })
    }
    if (this.state.email && this.state.password) {
      this.props.userLogin(this.state.email, this.state.password);
     this.setState({
       checkAccount: true,
       email: "",
       password: ""
     })
    }
  }

  render() {
    
    return (
      <div className="container-fluid" id="header">
        <div className="row">
          <div className="col-md-7">
            <i className="fas fa-tasks" style={{ marginRight: "10px" }}></i>
            <Link to='/' style={{ textDecoration: "none", color: "#4267b2" }}><b> PROMAN </b></Link>
          </div>
          <div className="col-md-2">
            <Input type="text" onBlur={this.validateEmail} onChange={this.onChangeEmail} value={this.state.email} placeholder="Your Email.." type="email" style={{ marginRight: "15px" }} />
            {this.state.emailError ?
              <div style={{ color: "red", fontSize: "15px" }}>* Cannot be blank</div> : null
            }
          </div>
          <div className="col-md-2">
            <Input onBlur={this.validatePassword} onChange={this.onChangePassword} value={this.state.password} type="password" />
            {this.state.passError ?
              <div style={{ color: "red", fontSize: "15px" }}>* Cannot be blank</div> : null
            }
          </div>
          <div className="col-md-1" style={{ top: "-9px" }}>
            <Button onClick={this.onLogin}>
              Log in
            </Button>
          </div>
          <Modal isOpen={this.state.modalErr}>
            <ModalHeader>Register Error</ModalHeader>
            <ModalBody style={{ color: "red" }}>
                <div>
                  <i className="fas fa-exclamation-triangle"></i>
                  Check your email or password again!
            </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggle}>OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}
const mapStatetoProps = state => ({
  account: state.account
})
export default connect(mapStatetoProps, { userLogin })(withRouter(header))