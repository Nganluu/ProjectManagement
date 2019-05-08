import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Progress, Button, CardGroup, Form, FormGroup, Col, Input} from 'reactstrap'
import { connect } from 'react-redux'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import '../../styles/scrollbar.css'
import JobList from './jobList'
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

    componentWillReceiveProps = (nextProps) => {
        if ( nextProps.match.params.jobgroup_id != this.props.match.params.jobgroup_id ) {
            nextProps.getJobGroupWithId(nextProps.match.params.jobgroup_id);
        }
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
        return (
            
            <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                <div>
                    <div className="row">
                        {/* Menu */}
                        <div className="col-md-2 menu" style={{ marginTop: "5%", paddingLeft: "3%" }}>
                            <Link to={'/project/' + this.props.match.params.project_id} >
                                <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                                    <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                    <b style={{ fontSize: "20px" }}>{this.props.project.projectDetail.project_name}</b>
                                </div>
                            </Link>
                            <div className="scrollbar" style={{ height: "30em" }}>
                                <div style={{ width: "10em"}} >
                                {this.props.jobGroup.jobGroupList ? this.props.jobGroup.jobGroupList.map(
                                    item =>
                                        <Link key={item.id} to={'/detailPage/' + item.id + '.' + item.project_id}>
                                            <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                                <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                                                <b>{item.job_group_name}</b>
                                            </Button>
                                        </Link>
                                ): null }
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="col-md-9" style={{ marginTop: "7%", paddingLeft: "1%", marginLeft: "18%" }}>
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
                                <JobList />
                            

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

