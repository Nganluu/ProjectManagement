
import React, { Component } from 'react';
import {
    Input, Button, Form, FormGroup, Col, CardGroup, Progress,
    Modal, ModalHeader, ModalBody, ModalFooter, Spinner
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css';
import DetailTask from '../detailPage/detailTask'
import ModalAddJob from '../detailPage/modalAddJob'

import { getPersonalProjectWithId, updatePersonalProjectName,
     getAllPersonalProject, getAllPersonalTask } from '../../Actions/personalProjectAction';


class PersonalJobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditPersonalProjectName: false,
            isDeletePersonalJob: false,
            inputShown: false,
            name: "",
            modalShowDetailTask: false,
            idSelectedJob: ''
        }
    }

    componentDidMount() {
        //lấy giá trị id của url hiện tại
        const url = window.location.pathname.toString();
        const id = url.substr(17);
        this.props.getPersonalProjectWithId(id)
        this.props.getAllPersonalTask(id)
    }

    componentWillReceiveProps( nextProps) {
        if ( nextProps.match.params.personal_id != this.props.match.params.personal_id ) {
            console.log(nextProps.match.params.personal_id);
            nextProps.getPersonalProjectWithId(nextProps.match.params.personal_id);
        }
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

    toggleShowDetaiTask = (id) => {
        this.setState({
            modalShowDetailTask: !this.state.modalShowDetailTask,
            idSelectedJob: id
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
        return (
            <div className="col-md-9 project">
                {this.props.personalProject.callapidone? 
                    <div>
                        <div style={{ fontSize: "24px", margin: "2%" }}>
                            {
                                !this.state.isEditPersonalProjectName ?
                                    <div>
                                        <b style={{ marginRight: "1rem", fontSize: "30px" }} >
                                            {this.props.personalProject.personalProjectDetail.personal_name}
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
                                        <Button color="link">
                                                <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                                                onClick={this.update} className="fas fa-pen"></i>
                                            </Button>
                                            <span style={{color: "blue"}}>|</span>
                                            <Button color="link">
                                                <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                                                onClick={this.editPersonalProjectName} className="fas fa-times"></i>
                                            </Button>
                                        </div>
                                    </div>
                            }
                        </div>

                        <div className="row">
                {/* công việc đang lên kế hoạch */}
                <div className="col-md-4">
                    <div className="card" style={{ height: "100%"}}>
                        <b> Plan </b>
                        <div>
                            {this.props.personalProject.pTaskList? this.props.personalProject.pTaskList.map(
                                item => 
                                    item.p_task_tick === 0 ?
                                        <div key={item.id} className="menu-inside" style={{ width: "100%"}}>
                                            <div className="delete">
                                                <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={() => this.deleteJob(item.id)}></i>
                                            </div>
                                            <Button key={'job' + item.id} onClick={() => this.toggleShowDetaiTask(item.id)}
                                                color="light" style={{ width: "98%", textAlign: "left" }}>
                                                {item.p_task_name}
                                                <i className="fas fa-pen" style={{ paddingLeft: "1rem" }}></i><br />
                                           </Button>
                                        </div>
                                    : null
                            ): null}

                            <DetailTask
                                toggle={this.cancelShowDetailTask}
                                id={this.state.idSelectedJob}
                                modal={this.state.modalShowDetailTask} />
                            <Button onClick={this.toggleAddJob}
                                color="light" style={{ color: "#989999", width: "98%", textAlign: "left" }}>
                                + Add more
                            </Button>

                            <ModalAddJob modal={this.state.modalAddJob} cancel={this.toggleAddJob} />
                        </div>
                    </div>
                </div>

                {/* công việc đang làm  */}
                <div className="col-md-4">
                    <div className="card" style={{ height: "100%"}}>    
                        <b> Doing </b>
                        <div>
                        {this.props.personalProject.pTaskList? this.props.personalProject.pTaskList.map(
                                item => 
                                    item.personal_process > 0 && item.personal_process < 100 ?
                                        <div className="menu-inside" style={{ width: "100%"}}>
                                            <div className="delete">
                                                <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={() => this.deleteJob(item.id)}></i>
                                            </div>
                                            <Button key={'job' + item.id} onClick={() => this.toggleShowDetaiTask(item.id)}
                                                color="light" style={{ width: "98%", textAlign: "left" }}>
                                                {item.job_name}
                                                <i className="fas fa-pen" style={{ textAlign: "right" }}></i><br />
                                                <span style={{ backgroundColor: "orange", padding: "1px 5px", borderRadius: "5px" }}>
                                                    <i className="far fa-clock"></i>{dateFormat(item.end_date, "dd/mm/yyyy")}
                                                </span>
                                                <center style={{ marginBottom: "-20px" }}>{item.personal_process}%</center>
                                                <Progress value={item.personal_process} style={{ width: "100%", marginBottom: "10px" }} />
                                            </Button>
                                        </div>
                                    : null
                            ): null}
                        </div>
                    </div>
                </div>

                {/* công việc đã làm xong */}
                <div className="col-md-4">
                    <div className="card" style={{ height: "100%"}}>
                        <b> Done </b>
                        <div>
                            {this.props.personalProject.pTaskList? this.props.personalProject.pTaskList.map(
                                item => 
                                    item.personal_process === 100 ?
                                    <div className="menu-inside" style={{ width: "100%"}}>
                                        <div className="delete">
                                            <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={() => this.deleteJob(item.id)}></i>
                                        </div>
                                        <Button key={'job' + item.id} onClick={() => this.toggleShowDetaiTask(item.id)}
                                            color="light" style={{ width: "98%", textAlign: "left" }}>
                                            {item.job_name}
                                            <i className="fas fa-pen" style={{ textAlign: "right" }}></i><br />
                                            <span style={{ backgroundColor: "aqua", padding: "1px 5px", borderRadius: "5px" }}>
                                                <i className="fas fa-check-circle"></i>{dateFormat(item.done_date, "dd/mm/yyyy")}
                                            </span>
                                        </Button>
                                    </div>
                                    : null
                            ): null}
                        </div>
                    </div>
                </div>
                
                <div>
                    <Modal isOpen={this.state.isDeleteJob} >
                        <ModalBody>
                            <p>Do you want to delete this job?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.cancelDeleteJob}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary" onClick={this.handleDeleteJob}><b>Delete</b></Button>
                        </ModalFooter>
                    </Modal>
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
    getAllPersonalProject: () => dispatch(getAllPersonalProject()),
    getAllPersonalTask: (id)=>dispatch(getAllPersonalTask(id))
});

const mapStatetoProps = state => ({
    personalProject: state.personalProject
});

export default withRouter(connect(mapStatetoProps, mapActiontoProps)(PersonalJobList))