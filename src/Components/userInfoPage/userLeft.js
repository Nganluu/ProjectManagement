import React, { Component } from 'react'
import UserAvatar from 'react-users-avatar'

export default class userInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('name')
        }
    }
    
    render() {
        return (
            <div>
                <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                    <div>
                        <div className="row">
                            <div className="col-md-3 menu" style={{ marginTop: "5%" }}>
                             <center style={{ marginTop: "10%" }}>   
                                <UserAvatar
                                        avatharBgColor="#858aa0"
                                        avatharTextColor="#fff"
                                        name={this.props.name}
                                        border="5px solid #474d56"
                                        ifBorder={true}
                                        imgHeight="150px"
                                        imgWidth="150px" />
                                </center>
                               <span style={{fontSize: "25px"}}>
                               <center>{this.props.name}</center>
                               </span>
                               <span style={{color: "#858aa0"}}>
                               <center><a href="">Change your image</a></center>
                               </span>
                               <br />
                               <br />
                               <br />
                               
                               <div style={{ marginBottom: "5%", marginLeft: "70px", color: "#4267b2" }}>
                                    <i className="fas fa-user-circle" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                    <b style={{ fontSize: "18px" }}>Information</b>
                               </div>

                               <div style={{ marginBottom: "5%", marginLeft: "70px", color: "#4267b2" }}>
                                    <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                    <b style={{ fontSize: "18px" }}>My Project</b>
                               </div>

                               <div style={{ marginLeft: "70px", color: "#4267b2" }}>
                                <i className="far fa-check-circle" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                <b style={{ fontSize: "18px" }}>Personal</b>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
