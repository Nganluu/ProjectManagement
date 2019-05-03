import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Progress, Button} from 'reactstrap';
import { connect } from 'react-redux';
import '../../styles/Login.css';
import '../../styles/homePage.css';
import ModalAddJob from './modalAddJob';
import DetailTask from './detailTask';
import { getAllJob, getJobWithId, addNewJob, deleteJob } from '../../Actions/jobAction';
import { userInfo } from 'os';

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShowDetailTask: false,
            modalAddJob: false
            // jobList: this.props.job.jobList
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params.jobgroup_id);
        this.props.getAllJob(this.props.match.params.jobgroup_id);
    }

    toggleShowDetaiTask = () => {
        this.setState({
            modalShowDetailTask: !this.state.modalShowDetailTask
        })
    }

    toggleAddJob = () => {
        this.setState({
            modalAddJob: !this.state.modalAddJob
        })
    }

    render() {
        console.log(this.props.job.jobList);
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
                                        <Button key={'job' + item.id} onClick={this.toggleShowDetaiTask}
                                            color="light" style={{ width: "98%", textAlign: "left" }}>
                                            {item.job_name}
                                            <i className="fas fa-pen" style={{ textAlign: "right" }}></i><br />
                                                <span style={{ backgroundColor: "orange", padding: "1px 5px", borderRadius: "5px" }}>
                                                    <i className="far fa-clock"></i>{item.end_date}
                                            </span>
                                        </Button>
                                    : null
                            ): null}

                            <DetailTask
                                toggle={this.toggleShowDetaiTask}
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
                                        <Button key={'job' + item.id} onClick={this.toggleShowDetaiTask}
                                            color="light" style={{ width: "98%", textAlign: "left" }}>
                                            {item.job_name}
                                            <i className="fas fa-pen" style={{ textAlign: "right" }}></i><br />
                                            <span style={{ backgroundColor: "orange", padding: "1px 5px", borderRadius: "5px" }}>
                                                <i className="far fa-clock"></i>{item.end_date}
                                            </span>
                                            <center style={{ marginBottom: "-20px" }}>{item.job_process}%</center>
                                            <Progress value={item.job_process} style={{ width: "100%", marginBottom: "10px" }} />
                                        </Button>
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
                                        <Button key={'job' + item.id} onClick={this.toggleShowDetaiTask}
                                            color="light" style={{ width: "98%", textAlign: "left" }}>
                                            {item.job_name}
                                            <i className="fas fa-pen" style={{ textAlign: "right" }}></i><br />
                                            <center style={{ marginBottom: "-20px" }}>{item.job_process}%</center>
                                            <Progress value={item.job_process} style={{ width: "100%", marginBottom: "10px" }} />
                                        </Button>
                                    : null
                            ): null}
                        </div>
                    </div>
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