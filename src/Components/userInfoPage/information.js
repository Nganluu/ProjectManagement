import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import '../../styles/changePass.css'
import {connect} from 'react-redux'
import {updatePassword} from '../../Actions/accountActions'
class Information extends Component {
    constructor(props){
        super(props);
        this.state = {
            password : "",
            newPassword: "",
            rewritePassword: "",
            isTypingName: "",
            isTypingEmail: "",
            stringMatching: true,
            changePassModal: false,
            flag: false,
            changePassMessage: ""
        }
    }
    onChangePassword = (event)=>{
        this.setState({
            password: event.target.value
        })
    }
    onChangeNewPassword = (event)=>{
        this.setState({
            newPassword: event.target.value
        })
    }
    onChangeRewritePassword = (event)=>{
        this.setState({
            rewritePassword: event.target.value
        })
    }
  componentDidUpdate = ()=>{
      if(this.state.flag&&this.props.account.callapidone){
          this.setState({
              flag: false,
              changePassModal: true
          })
      }
  }
    handleUpdatePassword = ()=>{
        const flag = this.state.newPassword.localeCompare(this.state.rewritePassword)
        if(this.state.password&&this.state.newPassword&&this.state.rewritePassword) {
            if(flag===0){
                this.props.updatePassword(this.state.password, this.state.newPassword)
                this.setState({
                  flag: true
                })
            }
            else{
                this.setState({
                    stringMatching: false
                })
            }
        }
    }
    changePassSuccess = ()=>{
    this.setState({
            changePassModal: !this.state.changePassModal
        })
        
    }
    
    render() {
        return (
            <div style={{ marginTop: "10%", marginLeft: "25%" }}>
                <div style={{fontSize: "25px", marginBottom: "50px"}}>
                    <b><u>Information</u></b>
                </div>
                <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                    <div className="row" style={{ marginLeft: "10px"}} >
                        <div className="col-sm-3 col-md-2 col-5">
                            <b>Full Name</b>
                        </div>
                        <div className="col-md-8 col-6">
                            <i>{localStorage.getItem("name")}</i>
                        </div>
                    </div>
                    <hr />

                    <div className="row" style={{ marginLeft: "10px"}} >
                        <div className="col-sm-3 col-md-2 col-5">
                            <b>Email</b>
                        </div>
                        <div className="col-md-8 col-6">
                            <i>{localStorage.getItem("email")}</i>
                        </div>
                    </div>
                    <hr />

                    <div>
                        <a href="">Change your information</a>
                    </div>
                </div>

                <div style={{fontSize: "25px", marginTop: "50px", marginBottom: "70px"}}>
                        <b><u>CHANGE YOUR PASSWORD</u></b>
                </div>
                <div style={{ marginLeft: "150px"}}>
                    <div className="row">
                        <div className="col-sm-8">
                            <form role="form">
                                <div className="form-group float-label-control">
                                    <label>Password</label>
                                    <input type="password" 
                                    value={this.state.password}
                                     onChange={this.onChangePassword} 
                                     className="form-control" placeholder="Username" />
                                </div>
                                <div className="form-group float-label-control">
                                    <label>New password</label>
                                    <input type="password"
                                    value={this.state.newPassword}
                                     onChange={this.onChangeNewPassword}
                                      className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group float-label-control">
                                    <label>Confirm password</label>
                                    <input type="password"
                                    value={this.state.rewritePassword}
                                     onChange={this.onChangeRewritePassword}
                                      className="form-control" placeholder="Password" />
                                </div>
                                {this.state.stringMatching?
                                    null : 
                                    <div style={{color: "red"}}>Confirm Password and New Password didn't match</div>
                                }
                                <center>
                                    <Button color="primary" onClick={this.handleUpdatePassword}>Save</Button>
                                </center>
                          
                                <Modal isOpen={this.state.changePassModal}>
                                    <ModalHeader>
                                        Change Password
                                    </ModalHeader>
                                    <ModalBody>
                                        {this.props.account.changePassSuccess?
                                        <div>Your password changed!</div>:
                                        <div style={{color: "red"}}>Error! Check your password again!</div>
                                        } 
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={this.changePassSuccess}>OK</Button>
                                    </ModalFooter>
                                </Modal>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps = state => ({
    account: state.account
})
export default connect(mapStatetoProps, {updatePassword} )(Information)