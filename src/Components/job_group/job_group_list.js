
import React, { Component } from 'react';
import {
    Input, Button, Form, FormGroup, Col, CardGroup, Progress,
    Modal, ModalHeader, ModalBody, ModalFooter, Spinner
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'
import { getProjectWithId, updateProjectName, getAllProject } from '../../Actions/projectActions';
import { getAllJobGroup, addNewJobGroup, deleteJobGroup} from '../../Actions/jobGroupAction';


class JobGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditProjectName: false,
            isDeleteJobGroup: false,
            idDeleteJobGroup: "",
            newJobGroupName: "",
            inputShown: false,
            name: ""
        }
    }

    componentDidMount() {
        //lấy giá trị id của url hiện tại
        const id = this.props.match.params.project_id
        this.props.getProjectWithId(id);
        this.props.getAllJobGroup(id);
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
    
    update = () => {
        //lấy giá trị id của url hiện tại
        const id = this.props.match.params.project_id;
        this.props.updateProjectName(this.state.name, id)
        this.props.getProjectWithId(id)
        this.props.getAllProject()       
        this.editProjectName()
    }

    deleteJobGroup = (id) => {
        this.setState({
            idDeleteJobGroup: id
        });

        this.setState({
            isDeleteJobGroup: !this.state.isDeleteJobGroup
        });
    }

    cancelDeleteJobGroup = () => {
        this.setState({
            idDeleteJobGroup: ""
        });

        this.setState({
            isDeleteJobGroup: !this.state.isDeleteJobGroup
        });
    }

    handleDeleteJobGroup = () => {
        const url = window.location.pathname.toString();
        const id = url.substr(9);
        this.props.deleteJobGroup(this.state.idDeleteJobGroup);
        this.setState({
            isDeleteJobGroup: ""
        });
        this.props.getAllJobGroup(id)
    }

    clickAdd = () => {
        this.setState({
            inputShown: !this.state.inputShown
        });
    }

    handleChangeName = event => {
        this.setState({
            newJobGroupName: event.target.value
        })
    }

    addNewJobGroup = () => {
        const url = window.location.pathname.toString();
        const id = url.substr(9);
        this.props.addNewJobGroup(id, this.state.newJobGroupName);
        this.setState({
            newJobGroupName: "",
            inputShown: false
        });
        this.props.getAllJobGroup(id);
    }

    render() {
        return (
            <div className="col-md-8 project">
                {/* {this.props.project.callapidone?  */}
                    <div>
                        <div style={{ fontSize: "24px", margin: "2%" }}>
                            {
                                !this.state.isEditProjectName ?
                                    <div>
                                        <b style={{ marginRight: "1rem", fontSize: "30px" }} >
                                            {this.state.name}
                                        </b>
                                        <Button color="link">
                                        <i style={{ top: "-0.2rem", fontSize: "24px", position: "relative", cursor: "pointer" }} 
                                        onClick={this.editProjectName} className="fas fa-pen"></i>
                                        </Button>
                                    </div>
                                    :
                                    <div className="row input">
                                        <div className="col-md-3"><i>Project name:</i></div>
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
                                            <Button color="link">
                                                <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                                                onClick={this.update} className="fas fa-pen"></i>
                                            </Button>
                                            <span style={{color: "blue"}}>|</span>
                                            <Button color="link">
                                                <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                                                onClick={this.editProjectName} className="fas fa-times"></i>
                                            </Button>
                                        </div>
                                    </div>
                            }
                        </div>

                        <div className="row">
                            {this.props.jobGroup.jobGroupList ? this.props.jobGroup.jobGroupList.map(
                                item => 
                                    <div key={item.id} className="col-md-3 menu-inside jobGroup">
                                        <div className="delete">
                                            <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={() => this.deleteJobGroup(item.id)}></i>
                                        </div>

                                        <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                                            <div >
                                                <span>{item.job_group_name}</span>
                                            </div>
                                            <div style={{ width: "100%", marginRight: "5%" }}>
                                                <Progress value={item.job_group_process} style={{ marginBottom: "10px" }} />
                                                <center>{item.job_group_process}%</center>
                                            </div>
                                        </CardGroup>

                                        <div className="mask">
                                            <Link to={'/detailPage/' + item.id + '.' + item.project_id} style={{ textDecoration: "none" }}>
                                                <Button type="submit" outline color="primary"><b>View Detail</b></Button>
                                            </Link>
                                        </div>
                                    </div>     
                                )
                                :null
                            }

                            <div>
                                <Modal isOpen={this.state.isDeleteJobGroup} >
                                    <ModalBody>
                                        <p>Do you want to delete this job group?</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type="submit" outline color="primary" onClick={this.cancelDeleteJobGroup}><b>Cancel</b></Button>
                                        <Button type="submit" outline color="primary" onClick={this.handleDeleteJobGroup}><b>Delete</b></Button>
                                    </ModalFooter>
                                </Modal>
                            </div>

                            <div className="col-md-3 jobGroup" style={{ color: "#4267b2" }}>
                                <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                                    {
                                        !this.state.inputShown ?

                                            <div onClick={this.clickAdd}>
                                                <span><i className="fas fa-plus-circle"></i> Add new</span>
                                            </div>
                                            :
                                            <div>
                                                <div className="delete-add" onClick={this.clickAdd}>
                                                    <i className="fas fa-times-circle" style={{ fontSize: "28px", cursor: "pointer" }}></i>
                                                </div>
                                                <Form>
                                                    <FormGroup>
                                                        <Col sm="12" md={{ size: 12 }}>
                                                            <i>New job group</i>
                                                            <Input
                                                                type="text"
                                                                value={this.state.newJobGroupName}
                                                                onChange={this.handleChangeName}
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                    <center>
                                                        <Button outline color="primary" onClick={this.addNewJobGroup}>Add</Button>
                                                    </center>
                                                </Form>
                                            </div>
                                    }
                                </CardGroup>
                            </div>
                        </div>
                    </div>
                    {/* : <Spinner color="primary"/>
                } */}
            </div>
        );
    }
}
const mapActiontoProps = dispatch => ({
    //actions about project
    getProjectWithId: (id) => dispatch(getProjectWithId(id)),
    updateProjectName: (name, id) => dispatch(updateProjectName(name, id)),
    getAllProject: () => dispatch(getAllProject()),

    //actions about jobGroup
    getAllJobGroup: (id) => dispatch(getAllJobGroup(id)),
    addNewJobGroup: (project_id, job_group_name) => dispatch(addNewJobGroup(project_id, job_group_name)),
    deleteJobGroup: (id) => dispatch(deleteJobGroup(id))
})
const mapStatetoProps = state => ({
    project: state.project,
    jobGroup: state.jobGroup
})

export default withRouter(connect(mapStatetoProps, mapActiontoProps)(JobGroupList))