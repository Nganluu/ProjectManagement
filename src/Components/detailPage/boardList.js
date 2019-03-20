import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress, Button, CardGroup,Card } from 'reactstrap'
import { connect } from 'react-redux'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import ModalAddProject from '../userPage/modalAddProject'
import { addNewProject } from '../../Actions/createNew'

class boardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddProject: false,
            modalAddTask: false,
            data: []
        }
    }
    toggleAddProject = () => {
        this.setState({
            modalAddProject: !this.state.modalAddProject
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
                                <b style={{ fontSize: "20px" }}>CÔNG NGHỆ WEB</b>
                            </div>
                            <div style={{ marginBottom: "5%" }}>
                                <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                    <b>Write 3D table in js</b>
                                </Button>
                                <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>+ Create new</div>
                            </div>
                            <ModalAddProject modal={this.state.modalAddProject} toggle={this.toggleAddProject} />
                        </div>
                        <div className="col-md-8" style={{ marginTop: "7%", paddingLeft: "1%", marginLeft: "18%" }}>
                            <div style={{ fontSize: "20px", marginBottom: "1%" }}>
                                <b>Write 3D table in js</b>
                            </div>
                            <div className="row" onClick={this.toggleAddProject} style={{ color: "#989999", cursor: "pointer" }}>+ Create new </div>
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                   <b> Plan </b>
                                        <div>
                                        <Button color="light" style={{ width: "95%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{textAlign: "right"}}></i>
                                      </Button>
                                    </div>
                                </div>
                            </CardGroup>
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%", left: "408px", top: "-226px" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                   <b> Doing </b>
                                        <div>
                                        <Button color="light" style={{ width: "95%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{textAlign: "right"}}></i>
                                      </Button>
                                    </div>
                                </div>
                            </CardGroup>
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%", left: "814px", top: "-452px" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                   <b> Done </b>
                                        <div>
                                        <Button color="light" style={{ width: "95%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{textAlign: "right"}}></i>
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
        data: state.data
    }
}
const mapActiontoProps = (dispatch) => ({
    addNewProject: () => dispatch(addNewProject())
})
export default connect(mapStatetoProps, mapActiontoProps)(boardList)