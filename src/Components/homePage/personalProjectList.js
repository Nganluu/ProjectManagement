
import React, { Component } from 'react';
import { Button, CardGroup, Modal, ModalBody, ModalFooter, Progress } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllPersonalProject, deletePersonalProject } from '../../Actions/personalProjectAction';
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'

class PersonalProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeletePersonalProject: false,
            personalProjectList: this.props.personalProject.personalProjectList,
            idDeletePersonalProject: ""
        }
    }

    componentDidMount() {
        this.props.getAllPersonalProject();
    }

    cancelDeletePersonalProject = () => {
        this.setState({
            idDeletePersonalProject: ""
        });

        this.setState({
            isDeletePersonalProject: !this.state.isDeletePersonalProject
        });
    }

    clickDeletePersonalProject = (id) => {
        this.setState({
            idDeletePersonalProject: id
        });

        this.setState({
            isDeletePersonalProject: !this.state.isDeletePersonalProject
        });
    }

    handleDeletePersonalProject = () => {
        this.props.deletePersonalProject(this.state.idDeletePersonalProject);
        this.setState({
            isDeletePersonalProject: !this.state.isDeletePersonalProject
        })
        this.props.getAllPersonalProject()
    }

    render() {
        console.log(this.props.personalProject.personalProjectList);
        return (
            <div className="row">
                {this.props.personalProject.personalProjectList ?
                    this.props.personalProject.personalProjectList.map(
                        item =>
                            <div key={item.id} className="col-md-3 menu-inside">
                                <div className="delete">
                                    <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={() => this.clickDeletePersonalProject(item.id)}></i>
                                </div>

                                <div>
                                    <CardGroup className="card" style={{ cursor: "pointer" }}>
                                        <div >
                                            <span>{item.personal_name}</span>
                                        </div>
                                        <div style={{ width: "100%", marginRight: "5%" }}>
                                            <Progress value={item.personal_process} style={{ marginBottom: "10px" }} />
                                            <center>{item.personal_process}%</center>
                                        </div>
                                    </CardGroup>
                                </div>
                                <div className="mask">
                                    <Link to={'/personalProject/' + item.id} style={{ textDecoration: "none" }}>
                                        <Button type="submit" outline color="primary"><b>View Detail</b></Button>
                                    </Link>
                                </div>
                            </div>
                    ) : null
                }
                <div>
                    <Modal isOpen={this.state.isDeletePersonalProject} >
                        <ModalBody>
                            <p>Do you want to delete this project?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.cancelDeletePersonalProject}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary" onClick={this.handleDeletePersonalProject}><b>Delete</b></Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    personalProject: state.personalProject
})
export default connect(mapStatetoProps, {getAllPersonalProject, deletePersonalProject })(PersonalProjectList)