
import React, { Component } from 'react';
import {
    Input, Button, Form, FormGroup, Col, CardGroup, Progress,
    Modal, ModalHeader, ModalBody, ModalFooter, Spinner
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css';
import { getPersonalProjectWithId, updatePersonalProjectName, getAllPersonalProject } from '../../Actions/personalProjectAction';


class PersonalJobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditPersonalProjectName: false,
            isDeletePersonalJob: false,
            inputShown: false,
            name: ""
        }
    }

    componentDidMount() {
        //lấy giá trị id của url hiện tại
        const url = window.location.pathname.toString();
        const id = url.substr(17);
        this.props.getPersonalProjectWithId(id)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.personalProject.personalProjectDetail.personal_name
        })
    }
   
    editPersonalProjectName = () => {
        this.setState({
            isEditPersonalProjectName: !this.state.isEditPersonalProjectName
        });
    }

    onChangePersonalProjectName = event => {
        this.setState({
            name: event.target.value
        })
    }

    deletePersonalJob = () => {
        this.setState({
            isDeletePersonalJob: !this.state.isDeletePersonalJob
        });
    }
    
    update = () => {
        //lấy giá trị id của url hiện tại
        const url = window.location.pathname.toString();
        const id = url.substr(17);
        this.props.updatePersonalProjectName(this.state.name, id)
        this.props.getPersonalProjectWithId(id)
        this.props.getAllPersonalProject()       
        this.editPersonalProjectName()
    }
    clickAdd = () => {
        this.setState({
            inputShown: !this.state.inputShown
        });
    }

    render() {
        const url = window.location.pathname.toString();
        const id = url.substr(17);
        console.log(id);
        console.log(this.props.personalProject.personalProjectDetail.personal_name)
         
        return (
            <div className="col-md-9 project">
                {this.props.personalProject.callapidone? 
                    <div>
                        <div style={{ fontSize: "24px", margin: "2%" }}>
                            {
                                !this.state.isEditPersonalProjectName ?
                                    <div>
                                        <b style={{ marginRight: "1rem", fontSize: "30px" }} >
                                            {this.state.name}
                                        </b>
                                        <Button color="link">
                                        <i style={{ top: "-0.2rem", fontSize: "24px", position: "relative", cursor: "pointer" }} 
                                        onClick={this.editPersonalProjectName} className="fas fa-pen"></i>
                                        </Button>
                                    </div>
                                    :
                                    <div className="row input">
                                        <div className="col-md-3"><i>New name:</i></div>
                                        <div className="col-md-4">
                                            <Form>
                                                <FormGroup>
                                                    <Col sm="12" md={{ size: 12 }}>
                                                        <Input
                                                            type="text"
                                                            value={this.state.name}
                                                            onChange={this.onChangePersonalProjectName}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        </div>
                                        <div className="col-md-3">
                                            <Button type="submit" outline color="primary"
                                                onClick={this.update}>
                                                Edit
                                            </Button>
                                            <Button type="submit" outline color="primary" onClick={this.editPersonalProjectName}>Cancel</Button>
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
                                    <Link to='/detailPage' style={{ textDecoration: "none" }}>
                                        <Button type="submit" outline color="primary"><b>View Detail</b></Button>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <Modal isOpen={this.state.isDeletePersonalJob} >
                                    <ModalBody>
                                        <p>Do you want to delete this job?</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type="submit" outline color="primary" onClick={this.deletePersonalJob}><b>Cancel</b></Button>
                                        <Button type="submit" outline color="primary"><b>Delete</b></Button>
                                    </ModalFooter>
                                </Modal>
                            </div>

                            <div className="col-md-3" style={{ color: "#4267b2" }}>
                                <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                                    {
                                        !this.state.inputShown ?

                                            <div onClick={this.clickAdd}>
                                                <span><i className="fas fa-plus-circle"></i> Add new</span>
                                            </div>
                                            :
                                            <div>
                                                <div className="delete-add">
                                                    <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={this.clickAdd}></i>
                                                </div>
                                                <Form>
                                                    <FormGroup>
                                                        <Col sm="12" md={{ size: 12 }}>
                                                            <i>New job group</i>
                                                            <Input
                                                                type="text"
                                                                id="Content"
                                                                name="Content"
                                                            
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
                    : null
                }
            </div>
        );
    }
}
const mapActiontoProps = dispatch => ({
    getPersonalProjectWithId: (id) => dispatch(getPersonalProjectWithId(id)),
    updatePersonalProjectName: (name, id) => dispatch(updatePersonalProjectName(name, id)),
    getAllPersonalProject: () => dispatch(getAllPersonalProject())
});

const mapStatetoProps = state => ({
    personalProject: state.personalProject
});

export default connect(mapStatetoProps, mapActiontoProps)(PersonalJobList)