import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Progress, Button, Modal, ModalBody, ModalFooter} from 'reactstrap';
import { connect } from 'react-redux';
import '../../styles/Login.css';
import '../../styles/homePage.css';
import '../../styles/menu.css';
import ModalAddJob from './modalAddJob';
import DetailTask from './detailTask';
import { getAllJob, getJobWithId, addNewJob, deleteJob } from '../../Actions/jobAction';
import dateFormat from 'dateformat';

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShowDetailTask: false,
            modalAddJob: false,
            isDeleteJob: false,
            idDeleteJob: "",
            idSelectedJob: ""
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params.jobgroup_id);
        this.props.getAllJob(this.props.match.params.jobgroup_id);
    }

    componentWillReceiveProps = (nextProps) => {
        if ( nextProps.match.params.jobgroup_id != this.props.match.params.jobgroup_id ) {
            nextProps.getAllJob(nextProps.match.params.jobgroup_id);
        }
    }

    toggleShowDetaiTask = (id) => {
        this.setState({
            modalShowDetailTask: !this.state.modalShowDetailTask,
            idSelectedJob: id
        });
    }

    cancelShowDetailTask = () => {
        this.setState({
            modalShowDetailTask: !this.state.modalShowDetailTask,
        });
        this.props.getAllJob(this.props.match.params.jobgroup_id);
    }

    toggleAddJob = () => {
        this.setState({
            modalAddJob: !this.state.modalAddJob
        })
    }

    deleteJob = (id) => {
        this.setState({
            isDeleteJob: !this.state.isDeleteJob,
            idDeleteJob: id
        });

    }

    cancelDeleteJob = () => {
        this.setState({
            isDeleteJob: !this.state.isDeleteJob,
            idDeleteJob: ""
        });
    }

    handleDeleteJob = () => {
        const id = this.props.match.params.jobgroup_id;
        this.props.deleteJob(this.state.idDeleteJob);
        this.props.getAllJob(id);
        this.cancelDeleteJob();
    }

    render() {
        return(
            <div className="row">
                {/* công việc đang lên kế hoạch */}
                <div className="col-md-4">
                    <div className="card" style={{ height: "100%"}}>
                        <b> Plan </b>
                        <div>
                            {this.props.job.jobList ? this.props.job.jobList.map(
                                item => 
                                    item.job_process === 0 ?
                                        <div key={item.id} className="menu-inside" style={{ width: "100%"}}>
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
                        {this.props.job.jobList ? this.props.job.jobList.map(
                                item => 
                                    item.job_process > 0 && item.job_process < 100 ?
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
                                                <center style={{ marginBottom: "-20px" }}>{item.job_process}%</center>
                                                <Progress value={item.job_process} style={{ width: "100%", marginBottom: "10px" }} />
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
                            {this.props.job.jobList ? this.props.job.jobList.map(
                                item => 
                                    item.job_process === 100 ?
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
        )
    }
}

const mapStatetoProps = state => {
    return {
        job: state.job
    }
}

const mapActiontiProps = dispatch => {
    return {
        getAllJob: (id) => dispatch(getAllJob(id)),
        getJobWithId: (id) => dispatch(getJobWithId(id)),
        addNewJob: (job_group_id, job_name, start_date, end_date) => dispatch(addNewJob(job_group_id, job_name, start_date, end_date)),
        deleteJob: (id) => dispatch(deleteJob(id))
    }
}

export default withRouter(connect(mapStatetoProps, mapActiontiProps) (JobList))