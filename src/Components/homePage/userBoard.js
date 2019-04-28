import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import '../../styles/member.css'
import ModalAddProject from './modalAddProject'
import { getAllProject } from '../../Actions/projectActions'

class homePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddProject: false,
            modalAddTask: false,
            projectList: []
        }
    }
    componentDidMount() {
        this.props.getAllProject();
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
            <div className="col-md-2 menu" style={{ marginTop: "5%", paddingLeft: "3%" }}>
                <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                    <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                  <a href="/home" style={{color: "inherit", textDecoration: "none"}}><b style={{ fontSize: "23px" }}>MY PROJECT</b></a>
                </div>
                <div style={{ marginBottom: "5%" }}>
                    {this.props.project.projectList ? this.props.project.projectList.map(
                        (item) =>
                            <a href={`/project/${item.id}`}>
                                <Button key={item.id} color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                    <b>{item.project_name}</b>
                                </Button>
                            </a>
                    ) : null}

                    <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>+ Create new</div>
                </div>
                <div style={{ color: "#4267b2" }}>
                    <i className="far fa-check-circle" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                    <b style={{ fontSize: "25px" }}>PERSONAL</b>
                    <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                        <b>All Tasks</b>
                    </Button>
                    <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>+ Create new</div>
                </div>
                <ModalAddProject modal={this.state.modalAddProject} toggle={this.toggleAddProject} />
            </div>
        );
    }
}
const mapStatetoProps = state => {
    return {
        project: state.project
    }
}
const mapActiontoProps = (dispatch) => ({
    getAllProject: () => dispatch(getAllProject())
})
export default connect(mapStatetoProps, mapActiontoProps)(homePage)