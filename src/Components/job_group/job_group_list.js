
import React, { Component } from 'react';
import {
    Input, Button, Form, FormGroup, Col, CardGroup, Progress,
    Modal, ModalHeader, ModalBody, ModalFooter, Spinner
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'
import { getProjectWithId, updateProjectName } from '../../Actions/projectActions'


class JobGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditProjectName: false,
            isDeleteJobGroup: false,
            inputShown: false,
            name: ""
        }
    }

    componentDidMount() {
        //lấy giá trị id của url hiện tại
        const url = window.location.pathname.toString();
        const id = url.substr(9);
        this.props.getProjectWithId(id)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.project.projectDetail.project_name
        })
    }

    editProjectName = () => {
        this.setState({
            isEditProjectName: !this.state.isEditProjectName
        });
    }

    onChangeProjectName = event => {
        this.setState({
            name: event.target.value
        })
    }

    deleteJobGroup = () => {
        this.setState({
            isDeleteJobGroup: !this.state.isDeleteJobGroup
        });
    }
    
    update = () => {
        //lấy giá trị id của url hiện tại
        const url = window.location.pathname.toString();
        const id = url.substr(9);
        this.props.updateProjectName(this.state.name, id)
        window.location.reload()
    }
    clickAdd = () => {
        this.setState({
            inputShown: !this.state.inputShown
        });
    }

    render() {
         
        return (
            <div className="col-md-8 project">
                {this.props.project.callapidone?
                    <div>
                        <div style={{ fontSize: "24px", margin: "2%" }}>
                            {
                                !this.state.isEditProjectName ?
                                    <div>
                                        <b style={{ marginRight: "1rem", fontSize: "30px" }} >
                                            {this.props.project.projectDetail.project_name}
                                        </b>
                                        <i style={{ top: "-0.2rem", position: "relative", cursor: "pointer" }} 
                                        onClick={this.editProjectName} className="fas fa-pen"></i>
                                    </div>
                                    :
                                    <div className="row input">
                                        <div className="col-md-2"><i>Project name:</i></div>
                                        <div className="col-md-4">
                                            <Form>
                                                <FormGroup>
                                                    <Col sm="12" md={{ size: 12 }}>
                                                        <Input
                                                            type="text"
                                                            value={this.state.name}
                                                            onChange={this.onChangeProjectName}
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
                                    <Link to='/detailPage' style={{ textDecoration: "none" }}>
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
                    : <Spinner color='primary' />
                }
            </div>
        );
    }
}
const mapActiontoProps = dispatch => ({
    getProjectWithId: (id) => dispatch(getProjectWithId(id)),
    updateProjectName: (name, id) => dispatch(updateProjectName(name, id))
})
const mapStatetoProps = state => ({
    project: state.project
})

export default connect(mapStatetoProps, mapActiontoProps)(JobGroupList)