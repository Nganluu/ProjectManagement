
import React, { Component } from 'react';
import { Button, CardGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteProject, getAllProject } from '../../Actions/projectActions';
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleteProject: false,
            projectList: this.props.project.projectList,
            idDeleteProject: ""
        }
    }

    componentDidMount() {
        this.props.getAllProject();
    }

    cancelDeleteProject = () => {
        this.setState({
            idDeleteProject: ""
        });

        this.setState({
            isDeleteProject: !this.state.isDeleteProject
        });
    }

    clickDeleteProject = (id) => {
        this.setState({
            idDeleteProject: id
        });

        this.setState({
            isDeleteProject: !this.state.isDeleteProject
        });
    }

    handleDeleteProject = () => {
        this.props.deleteProject(this.state.idDeleteProject);
        this.setState({
            isDeleteProject: !this.state.isDeleteProject
        })
        this.props.getAllProject()
    }

    render() {

        return (
            <div className="row">
                {this.props.project.projectList ?
                    this.props.project.projectList.map(
                        item =>
                            <div key={item.id} className="col-md-3 menu-inside">
                                {(localStorage.getItem("userId") == item.pivot.user_id && item.pivot.user_role === "admin") ?
                                    <div className="delete">
                                        <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={() => this.clickDeleteProject(item.id)}></i>
                                    </div> : null
                                }


                                <div>
                                    <CardGroup className="card" style={{ cursor: "pointer" }}>
                                        <div >
                                            <span>{item.project_name}</span>
                                        </div>
                                    </CardGroup>
                                </div>
                                <div className="mask">
                                    <Link to={`/project/${item.id}`} style={{ textDecoration: "none" }}>
                                        <Button type="submit" outline color="primary"><b>View Detail</b></Button>
                                    </Link>
                                </div>
                            </div>
                    ) : null
                }
                <div>
                    <Modal isOpen={this.state.isDeleteProject} >
                        <ModalBody>
                            <p>Do you want to delete this project?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.cancelDeleteProject}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary" onClick={this.handleDeleteProject}><b>Delete</b></Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    project: state.project
})
export default connect(mapStatetoProps, { getAllProject, deleteProject })(ProjectList)