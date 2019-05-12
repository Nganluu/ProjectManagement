import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import '../../styles/member.css'
import '../../styles/scrollbar.css'
import ModalAddProject from './modalAddProject'
import { getAllProject } from '../../Actions/projectActions'
import { getAllPersonalProject } from '../../Actions/personalProjectAction'

class homePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddProject: false,
            modalAddTask: false
        }
    }
    componentDidMount() {
        this.props.getAllProject();
        this.props.getAllPersonalProject();
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
            <div className="col-md-2 menu" style={{ marginTop: "7%", paddingLeft: "3%" }}>
                <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                    <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                  <Link to="/home" style={{color: "inherit", textDecoration: "none"}}><b style={{ fontSize: "1.2em" }}>MY PROJECT</b></Link>
                </div>
                <div className="scrollbar">
                    <div style={{ width: "10em"}} >
                    {this.props.project.projectList ?  this.props.project.projectList.map(
                        (item) =>
                            <Link key={item.id} to={`/project/${item.id}`}>
                                <Button  color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                    <b>{item.project_name}</b>
                                </Button>
                            </Link>
                    ) : null}
                    </div>
                 </div>
                <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>+ Create new</div>
               
                <div style={{ color: "#4267b2", marginTop: "1em"}}>
                    <i className="far fa-check-circle" style={{ paddingRight: "5%", fontSize: "20px"}}></i>
                  <Link to="/home" style={{color: "inherit", textDecoration: "none"}}><b style={{ fontSize: "1.2em" }}>PERSONAL</b></Link>
                    <div className="scrollbar">
                        <div style={{ width: "10em"}} >
                        {this.props.personalProject.personalProjectList ? this.props.personalProject.personalProjectList.map(
                            (item) =>
                                    <Button key={item.id} color="light" style={{ width: "100%", textAlign: "left" }} onClick={() => this.props.choosePersonal(item.id)}>
                                        <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                        <b>{item.personal_name}</b>
                                    </Button>
                            
                        ) : null}
                        </div>
                    </div>
                    <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>+ Create new</div>
                </div>
                <ModalAddProject modal={this.state.modalAddProject} toggle={this.toggleAddProject} />
            </div>
        );
    }
}
const mapStatetoProps = state => {
    return {
        project: state.project,
        personalProject: state.personalProject
    }
}
const mapActiontoProps = (dispatch) => ({
    getAllProject: () => dispatch(getAllProject()),
    getAllPersonalProject: () => dispatch(getAllPersonalProject())

})
export default connect(mapStatetoProps, mapActiontoProps)(homePage)