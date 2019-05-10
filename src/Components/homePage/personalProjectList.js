
import React, { Component } from 'react';
import {
    Button, CardGroup, Modal, ModalBody, ModalFooter, Progress, Dropdown,
    DropdownItem, DropdownToggle, DropdownMenu, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {
    getAllPersonalProject, deletePersonalProject, getPersonalProjectWithId,
    getAllPersonalTask, addPersonalTask, deletePersonalTask, updatePersonalTaskName, tickPersonalTask
} from '../../Actions/personalProjectAction';
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'

class PersonalProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeletePersonalProject: false,
            personalProjectList: this.props.personalProject.personalProjectList,
            idDeletePersonalProject: "",
            isViewDetail: false,
            dropdownAdd: false,
            name: "",
            pId: "",
            changeNameId: ""
        }
    }

    componentDidMount() {
        this.props.getAllPersonalProject();
    }

    cancelDeletePersonalProject = () => {
        this.setState({
            idDeletePersonalProject: ""
        });

        this.setState({
            isDeletePersonalProject: !this.state.isDeletePersonalProject
        });
    }

    clickDeletePersonalProject = (id) => {
        console.log(id);
        this.setState({
            idDeletePersonalProject: id,
            isDeletePersonalProject: !this.state.isDeletePersonalProject
        });
    }

    handleDeletePersonalProject = () => {
        console.log(this.state.idDeletePersonalProject)
        this.props.deletePersonalProject(this.state.idDeletePersonalProject);
        this.setState({
            isDeletePersonalProject: false,
            idDeletePersonalProject: ""
        })
        if(this.props.personalProject.callapidone) {
            this.props.getAllPersonalProject()
        }
    }

    getDetailTask = (id) => {
        this.props.getPersonalProjectWithId(id);
        this.props.getAllPersonalTask(id);
        this.setState({
            pId: id
        })
        this.toggleViewDetail()
    }

    toggleViewDetail = () => {
        this.setState({
            isViewDetail: !this.state.isViewDetail
        })
    }
    onTaskName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    addTask = () => {
        this.props.addPersonalTask(this.state.name, this.state.pId)
        this.props.getAllPersonalTask(this.state.pId)
        this.toggleAdd()
    }

    toggleAdd = () => {
        this.setState({
            dropdownAdd: !this.state.dropdownAdd
        })
    }

    handleDeleteTask = (id, personal_id) => {
        this.props.deletePersonalTask(id);
        this.props.getAllPersonalTask(personal_id)
        this.props.getAllPersonalProject()
    }
    onChangeTaskName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    clickTaskName = (id) => {
        this.setState({
            changeNameId: id
        })
    }
    handleChangeTaskName = (id, personal_id) => {
        this.props.updatePersonalTaskName(id, this.state.name)
        this.props.getAllPersonalTask(personal_id)
        this.setState({
            changeNameId: ""
        })
    }
    cancelChangeTaskName = () => {
        this.setState({
            changeNameId: ""
        })
    }
    tickTask = (id, personal_id, tick) => {
        this.props.tickPersonalTask(id, !tick);
        this.props.getAllPersonalTask(personal_id)
        this.props.getAllPersonalProject()
    }
    render() {
        return (
            <div className="row">
                {this.props.personalProject.personalProjectList ?
                    this.props.personalProject.personalProjectList.map(
                        item =>
                            <div key={item.id} className="col-md-3 menu-inside">
                                <div className="delete">
                                    <i className="fas fa-times-circle" style={{ fontSize: "28px" }} onClick={() => this.clickDeletePersonalProject(item.id)}></i>
                                </div>

                                <div>
                                    <CardGroup className="card" style={{ cursor: "pointer" }}>
                                        <div >
                                            <span>{item.personal_name}</span>
                                        </div>
                                        <div style={{ width: "100%", marginRight: "5%" }}>
                                            <Progress value={item.personal_process} style={{ marginBottom: "10px" }} />
                                            <center>{item.personal_process}%</center>
                                        </div>
                                    </CardGroup>
                                </div>
                                <div className="mask">
                                    {/* <Link to={'/personalProject/' + item.id} style={{ textDecoration: "none" }}> */}
                                    <Button onClick={() => this.getDetailTask(item.id)} outline color="primary"><b>View Detail</b></Button>
                                    {/* </Link> */}
                                </div>
                            </div>
                    ) : null
                }
                <div>
                    <Modal isOpen={this.state.isDeletePersonalProject} >
                        <ModalBody>
                            <p>Do you want to delete this project?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.cancelDeletePersonalProject}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary" onClick={this.handleDeletePersonalProject}><b>Delete</b></Button>
                        </ModalFooter>
                    </Modal>
                </div>

                <div>
                    <Modal style={{ height: "100%" }} isOpen={this.state.isViewDetail} toggle={this.toggleViewDetail}>
                        <ModalHeader>
                            {this.props.personalProject.personalProjectDetail.personal_name}
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ padding: "10px" }}>
                                {/* Add Task */}
                                <i className="fas fa-clipboard-check"></i>
                                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>To do list</b>
                                <Dropdown isOpen={this.state.dropdownAdd} style={{ marginLeft: "102px", marginTop: "-30px" }}>
                                    <DropdownToggle tag="span" data-toggle="dropdown">
                                        <Button onClick={this.toggleAdd} color="link">
                                            <i className="fas fa-plus-circle" style={{ fontSize: "20px" }}></i>
                                        </Button>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <b>Task Name</b>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <input onChange={this.onTaskName} style={{ border: "1px solid blue" }} />
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Button onClick={this.addTask}>Add</Button>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <br />

                                {/* Task List */}
                                {this.props.personalProject.pTaskList ? this.props.personalProject.pTaskList.map(
                                    item =>
                                        <div key={item.id}>
                                            {this.state.changeNameId != item.id ?
                                                <p key={item.id} style={{ cursor: "pointer" }} className="task">
                                                    <input type="checkbox"
                                                        checked={item.p_task_tick}
                                                        onChange={() => this.tickTask(item.id, item.personal_id, item.p_task_tick)}

                                                        style={{ fontSize: "20px" }} />
                                                    <span onClick={() => this.clickTaskName(item.id)} style={{ marginLeft: "5px", marginRight: "15px" }}>
                                                        {item.p_task_name}
                                                    </span>
                                                    <span className="delete-task" onClick={() => this.handleDeleteTask(item.id, item.personal_id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </p>
                                                :
                                                <p key={item.id} style={{ cursor: "pointer" }} className="task">
                                                    <input type="checkbox" checked={item.p_task_tick}
                                                        onChange={() => this.tickTask(item.id, item.personal_id, item.p_task_tick)}
                                                        style={{ fontSize: "20px" }} />
                                                    <span className="change-task">
                                                        <input onChange={this.onChangeTaskName} placeholder="New name..." />
                                                        <Button color="link" onClick={() => this.handleChangeTaskName(item.id, item.personal_id)}>
                                                            <i style={{ fontSize: "14px", position: "relative", cursor: "pointer" }}
                                                                className="fas fa-pen"></i>
                                                        </Button>
                                                        <span style={{ color: "blue" }}>|</span>
                                                        <Button color="link">
                                                            <i style={{ fontSize: "14px", position: "relative", cursor: "pointer" }}
                                                                onClick={this.cancelChangeTaskName} className="fas fa-times"></i>
                                                        </Button>
                                                    </span>
                                                </p>
                                            }
                                        </div>
                                ) : null}
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    personalProject: state.personalProject
})
const mapActiontoProps = dispatch => ({
    getAllPersonalProject: () => dispatch(getAllPersonalProject()),
    deletePersonalProject: (id) => dispatch(deletePersonalProject(id)),
    getPersonalProjectWithId: (id) => dispatch(getPersonalProjectWithId(id)),
    getAllPersonalTask: (id) => dispatch(getAllPersonalTask(id)),
    addPersonalTask: (name, id) => dispatch(addPersonalTask(name, id)),
    deletePersonalTask: (id) => dispatch(deletePersonalTask(id)),
    updatePersonalTaskName: (id, name) => dispatch(updatePersonalTaskName(id, name)),
    tickPersonalTask: (id, tick) => dispatch(tickPersonalTask(id, tick))
})
export default connect(mapStatetoProps, mapActiontoProps)(PersonalProjectList)