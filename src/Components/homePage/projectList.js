
import React, { Component } from 'react';
import { Button, CardGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleteProject: false
        }
    }

    deleteProject = () => {
        this.setState({
            isDeleteProject: !this.state.isDeleteProject
        });
    }

    render() {
        return (
            <div className="col-md-10 project">
                <div className="row">
                    <div className="col-md-3 menu-inside">
                        <div className="delete">
                            <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={this.deleteProject}></i>
                        </div>
                    
                        <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                            <div >                            
                                <span>Công nghệ web</span>
                            </div>
                        </CardGroup>
                        
                        <div className="mask">
                            <Link to='/project' style={{textDecoration: "none"}}>
                                <Button type="submit" outline color="primary" onClick=""><b>View Detail</b></Button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Modal isOpen={this.state.isDeleteProject} >
                            <ModalBody>
                                <p>Do you want to delete this project?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="submit" outline color="primary" onClick={this.deleteProject}><b>Cancel</b></Button>
                                <Button type="submit" outline color="primary" onClick=""><b>Delete</b></Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}