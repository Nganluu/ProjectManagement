
import React, { Component } from 'react';
import { Input, Button, Form, FormGroup, Col, CardGroup, Progress,
            Modal, ModalHeader, ModalBody, ModalFooter
        } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'

export default class JobGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditProjectName: false,
            isDeleteJobGroup: false, 
            inputShown: false
        }
    }

    editProjectName = () => {
        this.setState({
            isEditProjectName: !this.state.isEditProjectName
        });
    }

    deleteJobGroup = () => {
        this.setState({
            isDeleteJobGroup: !this.state.isDeleteJobGroup
        });
    }

    clickAdd = () => {
        this.setState({
            inputShown: !this.state.inputShown
        });
    }

    render() {
        return (
            <div className="col-md-8 project">
                    <div style={{ fontSize: "20px", margin: "2%" }}>
                    {
                        !this.state.isEditProjectName ?
                            <b className="project-name" onClick={this.editProjectName}>CÔNG NGHỆ WEB</b>
                        :
                        <div className="row input">
                            <div className="col-md-2"><i>New name:</i></div>
                            <div className="col-md-4">
                                <Form>
                                    <FormGroup>
                                        <Col sm="12" md={{ size: 12 }}>
                                            <Input
                                                type="text"
                                                onChange=""
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                            <div className="col-md-3">
                                <Button type="submit" outline color="primary" onClick="">Edit</Button>
                                <Button type="submit" outline color="primary" onClick={this.editProjectName}>Cancel</Button>
                            </div>
                        </div>
                    }
                    </div>

                <div className="row">
                    <div className="col-md-3 menu-inside">
                        <div className="delete">
                            <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={this.deleteJobGroup}></i>
                        </div>
                    
                        <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                                <div >                            
                                    <span>Write 3D table in Js</span>
                                </div>
                            <div style={{ width: "100%", marginRight: "5%" }}>
                                <Progress value="30" style={{ marginBottom: "10px" }} />
                                <center>30%</center>
                            </div>
                        </CardGroup>
                        
                        <div className="mask">
                            <Link to='/detailPage' style={{textDecoration: "none"}}>
                                <Button type="submit" outline color="primary" onClick=""><b>View Detail</b></Button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Modal isOpen={this.state.isDeleteJobGroup} >
                            <ModalBody>
                                <p>Do you want to delete this job group?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="submit" outline color="primary" onClick={this.deleteJobGroup}><b>Cancel</b></Button>
                                <Button type="submit" outline color="primary" onClick=""><b>Delete</b></Button>
                            </ModalFooter>
                        </Modal>
                    </div>

                    <div className="col-md-3">
                        <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                            {
                                !this.state.inputShown ? 
                                
                                    <div onClick={this.clickAdd}>
                                        <span><i className="fas fa-plus-circle"></i> Add new</span>
                                    </div> 
                                    
                                    : 

                                    <div>
                                        <Form>
                                            <FormGroup>
                                                <Col sm="12" md={{ size: 12 }}>
                                                    <i>New job group</i>
                                                    <Input
                                                        type="text"
                                                        id="Content"
                                                        name="Content"
                                                        value={this.state.name}
                                                        onChange={this.handleChangeName}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <center>
                                                    <Button type="submit" outline color="primary" onClick="">Add</Button>
                                            </center>
                                        </Form>
                                    </div>
                            }
                            </CardGroup>
                    </div>
            </div>
        </div>     
        );
    }
}