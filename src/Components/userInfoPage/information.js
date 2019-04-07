import React, { Component } from 'react'
import { Button } from 'reactstrap'
import '../../styles/changePass.css'
import {connect} from 'react-redux'
import {updatePassword} from '../../Actions/accountActions'
class Information extends Component {
    constructor(props){
        super(props);
        this.state = {
            password : "",
            newPassword: "",
            rewritePassword: ""
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
    handleUpdatePassword = ()=>{
        const flag = this.state.password.localeCompare(this.state.rewritePassword)
        console.log(flag)
        if(this.state.password&&this.state.newPassword&&this.state.rewritePassword) {
            if(flag){
                this.props.updatePassword(this.state.password, this.state.rewritePassword)
            }
        }
    }
    render() {
        return (
            <div style={{ marginTop: "10%", marginLeft: "25%" }}>
                <div style={{fontSize: "25px", marginBottom: "50px"}}>
                    <b><u>Information</u></b>
                </div>
                <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                    <div className="row" style={{ marginLeft: "10px"}} >
                        <div class="col-sm-3 col-md-2 col-5">
                            <b>Full Name</b>
                        </div>
                        <div class="col-md-8 col-6">
                            <i>{localStorage.getItem("name")}</i>
                        </div>
                    </div>
                    <hr />

                    <div className="row" style={{ marginLeft: "10px"}} >
                        <div class="col-sm-3 col-md-2 col-5">
                            <b>Email</b>
                        </div>
                        <div class="col-md-8 col-6">
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
                    <div class="row">
                        <div class="col-sm-8">
                            <form role="form">
                                <div class="form-group float-label-control">
                                    <label for="">Password</label>
                                    <input type="password" 
                                    value={this.state.password}
                                     onChange={this.onChangePassword} 
                                     class="form-control" placeholder="Username" />
                                </div>
                                <div class="form-group float-label-control">
                                    <label for="">New password</label>
                                    <input type="password"
                                    value={this.state.newPassword}
                                     onChange={this.onChangeNewPassword}
                                      class="form-control" placeholder="Password" />
                                </div>
                                <div class="form-group float-label-control">
                                    <label for="">Confirm password</label>
                                    <input type="password"
                                    value={this.state.rewritePassword}
                                     onChange={this.onChangeRewritePassword}
                                      class="form-control" placeholder="Password" />
                                </div>
                                <center>
                                    <Button color="primary" onClick={this.handleUpdatePassword}>Save</Button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {updatePassword} )(Information)