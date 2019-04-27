import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress, Button, CardGroup, Card } from 'reactstrap'
import { connect } from 'react-redux'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import ModalAddProject from '../homePage/modalAddProject'
import DetailTask from './detailTask'
class boardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddProject: false,
            modalAddTask: false,
            modalShowDetailTask: false,
            date: new Date()
        }
    }
    toggleAddProject = () => {
        this.setState({
            modalAddProject: !this.state.modalAddProject
        })

    }
    toggleShowDetailTask = () => {
        this.setState({
            modalShowDetailTask: !this.state.modalShowDetailTask
        })
    }
    toggleAddTask = () => {
        this.setState({
            modalAddTask: !this.state.modalAddTask
        })
    }
    render() {
        return (
            <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                <div>
                    <div className="row">
                        <div className="col-md-2 menu" style={{ marginTop: "5%", paddingLeft: "3%" }}>
                            <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                                <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                <b style={{ fontSize: "20px" }}>CÔNG NGHỆ111 WEB</b>
                            </div>
                            <div style={{ marginBottom: "5%" }}>
                                <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                    <b>Write 3D table in js</b>
                                </Button>
                                <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>
                                    + Create new
                                </div>
                            </div>
                            <ModalAddProject modal={this.state.modalAddProject} toggle={this.toggleAddProject} />
                        </div>
                        <div className="col-md-8" style={{ marginTop: "7%", paddingLeft: "1%", marginLeft: "18%" }}>
                            <div style={{ fontSize: "20px", marginBottom: "1%" }}>
                                <b>Write 3D table in js</b>
                            </div>
                            <div style={{ color: "#989999", cursor: "pointer" }}>
                                {/* <span onClick={this.toggleAddProject}>+ Create new</span>   */}
                                <span>
                                    <i className="fas fa-cog" style={{ paddingRight: "5px" }} />
                                    Setting
                            </span>
                            </div>

                            {/* công việc đang lên kế hoạch */}
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <b> Plan </b>
                                    <div>
                                        <Button onClick={this.toggleShowDetailTask}
                                            color="light" style={{ width: "98%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{ textAlign: "right" }}></i><br />
                                            <span style={{ backgroundColor: "orange", padding: "1px 5px", borderRadius: "5px" }}>
                                                <i className="far fa-clock"></i>17:30, May 25 2019
                                       </span>
                                        </Button>
                                        <DetailTask
                                            toggle={this.toggleShowDetailTask}
                                            modal={this.state.modalShowDetailTask} />
                                        <Button
                                            color="light" style={{ color: "#989999", width: "98%", textAlign: "left" }}>
                                            + Add more
                                      </Button>
                                    </div>
                                </div>
                            </CardGroup>
                            {/* công việc đang làm  */}
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%", left: "408px", top: "-281px" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <b> Doing </b>
                                    <div>
                                        <Button color="light" style={{ width: "98%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{ textAlign: "right" }}></i>
                                            <center style={{ marginBottom: "-20px" }}>25%</center>
                                            <Progress value="25" style={{ width: "100%", marginBottom: "10px" }} />
                                        </Button>
                                    </div>
                                </div>
                            </CardGroup>
                            {/* công việc đã làm xong */}
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%", left: "814px", top: "-564px" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <b> Done </b>
                                    <div>
                                        <Button color="light" style={{ width: "98%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{ textAlign: "right" }}></i>
                                        </Button>
                                    </div>
                                </div>
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return {
        project: state.project
    }
}
const mapActiontoProps = (dispatch) => ({
    
})
export default connect(mapStatetoProps, mapActiontoProps)(boardList)

