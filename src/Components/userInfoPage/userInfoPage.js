import React, { Component } from 'react'
import UserAvatar from 'react-users-avatar'

export default class userInfoPage extends Component {
    render() {
        return (
            <div>
                <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                    <div>
                        <div className="row">
                            <div className="col-md-3 menu" style={{ marginTop: "5%" }}>
                             <center>   <UserAvatar
                                    avatharBgColor="#858aa0"
                                    avatharTextColor="#fff"
                                    name="Ngan"
                                    border="5px solid #474d56"
                                    ifBorder={true}
                                    imgHeight="150px"
                                    imgWidth="150px" />
                                    </center>
                               <span style={{fontSize: "25px"}}>
                               <center>User Name</center>
                               </span>
                               <span style={{color: "#858aa0"}}>
                               <center>usermail@gmail.com</center>
                               </span>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
