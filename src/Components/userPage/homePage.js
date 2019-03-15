import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress, Button, CardGroup } from 'reactstrap'
import '../../styles/Login.css'
import '../../styles/homePage.css'

export default class homePage extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                <div id="header">
                    <div className="row">
                        <div className="col-md-7">
                            <i className="fas fa-tasks" style={{ marginRight: "10px" }}></i>
                            <Link to='/home' style={{ textDecoration: "none", color: "#4267b2" }}><b> PROMAN </b></Link>
                        </div>
                        <div className="col-md-3">
                        </div>
                        <div className='col-md-2' style={{ textAlign: "right" }}>
                            <Button color="link">
                                <i className="fas fa-plus-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                            </Button>
                            <Button color="link">
                                <i className="fas fa-info-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                            </Button>
                            <Button color="link">
                                <i className="fas fa-user-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-2 menu" style={{ marginTop: "5%", paddingLeft: "3%" }}>
                            <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                                <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                <b style={{ fontSize: "23px" }}>MY PROJECT</b>
                            </div>
                            <div style={{ marginBottom: "5%" }}>
                                <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                    <b>CNW</b>
                                </Button>
                                <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                    <b>BTT </b>
                                </Button>
                                <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                    <b>CNW</b>
                                </Button>
                                <div style={{ color: "#989999" }}>+ Create new</div>

                            </div>
                            <div style={{ color: "#4267b2" }}>
                                <i className="far fa-check-circle" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                <b style={{ fontSize: "25px" }}>PERSONAL</b>
                                <div style={{ color: "#989999" }}>+ Create new</div>
                            </div>
                        </div>
                        <div className="col-md-8" style={{ marginTop: "7%", paddingLeft: "1%", marginLeft: "18%" }}>
                            <div style={{ fontSize: "20px" }}>
                                <b>CÔNG NGHỆ WEB</b>
                            </div>
                            
                            <CardGroup className="card" style={{ height: "100%", width: "20%" }}>
                                <article  >
                                    <div>
                                        <center style={{ marginBottom: "-20px" }}>25%</center>
                                        <Progress value="25" style={{ width: "100%", marginBottom: "10px" }} />
                                    </div>
                                    <div >
                                        Write 3D table in js
                                   </div>
                                </article>
                                
                            </CardGroup>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
