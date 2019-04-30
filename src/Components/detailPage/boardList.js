import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Progress, Button, CardGroup, Form, FormGroup, Col, Input} from 'reactstrap'
import { connect } from 'react-redux'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import ModalAddProject from '../homePage/modalAddProject'
import DetailTask from './detailTask'
import { getProjectWithId } from '../../Actions/projectActions'
import { getAllJobGroup, getJobGroupWithId, updateJobGroupName } from '../../Actions/jobGroupAction';

class boardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditJobGroupName: false,
            name: ""
        }
    }

    componentDidMount = () => {
        this.props.getJobGroupWithId(this.props.match.params.jobgroup_id);
        this.props.getProjectWithId(this.props.match.params.project_id);
        this.props.getAllJobGroup(this.props.match.params.project_id)
    }

    editJobGroupName = () => {
        this.setState({
            isEditJobGroupName: !this.state.isEditJobGroupName
        })
    }

    onChangeJobGroupName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleUpdateJobGroupName = () => {
        if(this.state.name){
            this.props.updateJobGroupName(this.state.name, this.props.match.params.jobgroup_id);
            this.setState({
                name: "",
                isEditJobGroupName: !this.state.isEditJobGroupName
            });
            this.props.getAllJobGroup(this.props.match.params.project_id);
            this.props.getJobGroupWithId(this.props.match.params.jobgroup_id);;
        }
    }

    render() {
        console.log(this.props.jobGroup.jobGroupDetail)
        return (
            
            <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                <div>
                    <div className="row">
                        {/* Menu */}
                        <div className="col-md-2 menu" style={{ marginTop: "5%", paddingLeft: "3%" }}>
                            <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                                <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                <b style={{ fontSize: "20px" }}>{this.props.project.projectDetail.project_name}</b>
                            </div>
                            <div style={{ marginBottom: "5%" }}>
                                {this.props.jobGroup.jobGroupList ? this.props.jobGroup.jobGroupList.map(
                                    item =>
                                        <a key={item.id} href={'/detailPage/' + item.id + '.' + item.project_id}>
                                        <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                            <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                            <b>{item.job_group_name}</b>
                                        </Button>
                                        </a>
                                ): null }
                            </div>
                        </div>

                        {/* Content */}
                        <div className="col-md-8" style={{ marginTop: "7%", paddingLeft: "1%", marginLeft: "18%" }}>
                            {/* Job Group Name */}
                            
                            <div style={{ fontSize: "24px", margin: "2%" }}>
                            {
                                !this.state.isEditJobGroupName ?
                                    <div>
                                        <b style={{ marginRight: "1rem", fontSize: "30px" }} >
                                            {this.props.jobGroup.jobGroupDetail.job_group_name}
                                        </b>
                                        <Button color="link">
                                        <i style={{ top: "-0.2rem", fontSize: "24px", position: "relative", cursor: "pointer" }} 
                                        onClick={this.editJobGroupName} className="fas fa-pen"></i>
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
                                                            onChange={this.onChangeJobGroupName}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        </div>
                                        <div className="col-md-3">
                                            <Button color="link">
                                                <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                                                onClick={this.handleUpdateJobGroupName} className="fas fa-pen"></i>
                                            </Button>
                                            <span style={{color: "blue"}}>|</span>
                                            <Button color="link">
                                                <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                                                onClick={this.editJobGroupName} className="fas fa-times"></i>
                                            </Button>
                                        </div>
                                    </div>
                            }
                        </div>
                            <div style={{ color: "#989999", cursor: "pointer" }}>
    
                                <span>
                                    <i className="fas fa-cog" style={{ paddingRight: "5px" }} />
                                    Setting
                            </span>
                            </div>

                            {/* công việc đang lên kế hoạch */}
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <b> Plan </b>
                                    <div>
                                        <Button onClick={this.toggleShowDetailTask}
                                            color="light" style={{ width: "98%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{ textAlign: "right" }}></i><br />
                                            <span style={{ backgroundColor: "orange", padding: "1px 5px", borderRadius: "5px" }}>
                                                <i className="far fa-clock"></i>17:30, May 25 2019
                                       </span>
                                        </Button>
                                        {/* <DetailTask
                                            toggle={this.toggleShowDetailTask}
                                            modal={this.state.modalShowDetailTask} /> */}
                                        <Button
                                            color="light" style={{ color: "#989999", width: "98%", textAlign: "left" }}>
                                            + Add more
                                      </Button>
                                    </div>
                                </div>
                            </CardGroup>

                            {/* công việc đang làm  */}
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%", left: "408px", top: "-281px" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <b> Doing </b>
                                    <div>
                                        <Button color="light" style={{ width: "98%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{ textAlign: "right" }}></i>
                                            <center style={{ marginBottom: "-20px" }}>25%</center>
                                            <Progress value="25" style={{ width: "100%", marginBottom: "10px" }} />
                                        </Button>
                                    </div>
                                </div>
                            </CardGroup>

                            {/* công việc đã làm xong */}
                            <CardGroup className="card col-md-4" style={{ height: "60%", width: "40%", left: "814px", top: "-564px" }}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <b> Done </b>
                                    <div>
                                        <Button color="light" style={{ width: "98%", textAlign: "left" }}>
                                            this is a test for pen hihihiihihi
                                        <i className="fas fa-pen" style={{ textAlign: "right" }}></i>
                                        </Button>
                                    </div>
                                </div>
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return {
        project: state.project,
        jobGroup: state.jobGroup
    }
}

const mapActiontoProps = (dispatch) => ({
    getProjectWithId: (id) => dispatch(getProjectWithId(id)),
    getAllJobGroup: (id) => dispatch(getAllJobGroup(id)),
    getJobGroupWithId: (id) => dispatch(getJobGroupWithId(id)),
    updateJobGroupName: (name, id) => dispatch(updateJobGroupName(name, id))
})

export default withRouter (connect(mapStatetoProps, mapActiontoProps
    )(boardList))

