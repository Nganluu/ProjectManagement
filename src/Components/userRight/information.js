import React, { Component } from 'react'
import { Button } from 'reactstrap'
import '../../styles/changePass.css'
import { connect } from 'net';

export default class Information extends Component {
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
                            <i>Mung Nguyen</i>
                        </div>
                    </div>
                    <hr />

                    <div className="row" style={{ marginLeft: "10px"}} >
                        <div class="col-sm-3 col-md-2 col-5">
                            <b>Email</b>
                        </div>
                        <div class="col-md-8 col-6">
                            <i>mungyp98@gmail.com</i>
                        </div>
                    </div>
                    <hr />

                    <div>
                        <a href="">Change your information</a>
                    </div>
                </div>

                <div style={{fontSize: "25px", marginTop: "50px", marginBottom: "70px"}}>
                        <b><u>CHANGE YOUR PASSWORD</u></b>
                </div >
                <div style={{ marginLeft: "150px"}}>
                    <div class="row">
                        <div class="col-sm-8">
                            <form role="form">
                                <div class="form-group float-label-control">
                                    <label for="">Password</label>
                                    <input type="password" class="form-control" placeholder="Username" />
                                </div>
                                <div class="form-group float-label-control">
                                    <label for="">New password</label>
                                    <input type="password" class="form-control" placeholder="Password" />
                                </div>
                                <div class="form-group float-label-control">
                                    <label for="">Confirm password</label>
                                    <input type="password" class="form-control" placeholder="Password" />
                                </div>
                                <center>
                                    <Button type="submit" color="primary" onClick="">Save</Button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}