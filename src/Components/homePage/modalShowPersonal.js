
import React, { Component } from 'react';
import {
    Button, CardGroup, Modal, ModalBody, ModalFooter, Progress, Dropdown,
    DropdownItem, DropdownToggle, DropdownMenu, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {
    getAllPersonalProject, getPersonalProjectWithId, updatePersonalProjectName, getAllPersonalTask, 
    addPersonalTask, deletePersonalTask, updatePersonalTaskName, tickPersonalTask
} from '../../Actions/personalProjectAction';
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'

class PersonalProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isViewDetail: false,
            dropdownAdd: false,
            name: "",
            pId: "",
            pName: "",
            edittingPname: false,
            changeNameId: ""
        }
    }

    componentWillReceiveProps(nextProps){
        if((nextProps.id != this.props.id) && nextProps.id) {
            this.getDetailTask(nextProps.id)
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
        if(this.state.isViewDetail) {
            this.setState({
                isViewDetail: false
            },
                () => this.props.close()
            )
        } else {
            this.setState({
                isViewDetail: true
            });
        }
    }

    onTaskName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    addTask = () => {
        this.props.addPersonalTask(this.state.name, this.state.pId)
        this.props.getAllPersonalTask(this.state.pId)
        this.props.getAllPersonalProject()
        this.props.getPersonalProjectWithId(this.state.pId)
        this.toggleAdd()
    }

    toggleAdd = () => {
        this.setState({
            dropdownAdd: !this.state.dropdownAdd
        })
    }

    handleDeleteTask = (id, personal_id) => {
        this.props.deletePersonalTask(id);
        this.props.getPersonalProjectWithId(personal_id)
        this.props.getAllPersonalTask(personal_id)
        this.props.getAllPersonalProject()
    }
    onChangeTaskName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    clickTaskName = (id, name) => {
        this.setState({
            changeNameId: id,
            name: name
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
            changeNameId: "",
            name: ""
        })
    }

    tickTask = (id, personal_id, tick) => {
        this.props.tickPersonalTask(id, !tick);
        this.props.getAllPersonalTask(personal_id)
        this.props.getAllPersonalProject()
        this.props.getPersonalProjectWithId(personal_id)
    }

    onChangePName = (e)=>{
        this.setState({
            pName: e.target.value
        })
    }

    toggleEditPName = (name) => {
        this.setState({
            edittingPname: !this.state.edittingPname,
            pName: name
        })
    }

    callChangePNameAPI = ()=>{
        const id = this.props.personalProject.personalProjectDetail.id
        this.props.updatePersonalProjectName(this.state.pName, id);
        this.props.getAllPersonalProject()
        this.props.getPersonalProjectWithId(id)
        this.toggleEditPName()
    }
    render() {
        return (
            <div>
                <Modal style={{ height: "100%" }} isOpen={this.state.isViewDetail} toggle={this.toggleViewDetail}>
                    <ModalHeader>
                    {this.state.edittingPname? 
                    <div >
                    <input value={this.state.pName} onChange={this.onChangePName}></input>
                    <Button color="link">
                                        <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }}
                                            onClick={this.callChangePNameAPI} className="fas fa-pen"></i>
                        </Button>
                        <span style={{color: "blue"}}>|</span>
                                        <Button color="link">
                                            <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                                            onClick={this.toggleEditPName} className="fas fa-times"></i>
                                        </Button>
                    </div>
                    :
                        <div onClick={() => this.toggleEditPName(this.props.personalProject.personalProjectDetail.personal_name)}>
                            {this.props.personalProject.personalProjectDetail.personal_name}
                        </div>
                        }
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
                            <div style={{ width: "100%", marginRight: "5%" }}>
                                        <Progress value={this.props.personalProject.personalProjectDetail.personal_process} style={{ marginBottom: "10px" }} />
                                        <center>{this.props.personalProject.personalProjectDetail.personal_process}%</center>
                                    </div>
                            {/* Task List */}
                            {this.props.personalProject.pTaskList ? this.props.personalProject.pTaskList.map(
                                item =>
                                    <div key={item.id}>
                                        {(item.p_task_tick === 0) ?
                                            <p>
                                                {this.state.changeNameId != item.id ?
                                                    <p key={item.id} style={{ cursor: "pointer" }} className="task">
                                                        <i className="far fa-circle"
                                                            onClick={() => this.tickTask(item.id, item.personal_id, item.p_task_tick)}></i>
                                                        <span onClick={() => this.clickTaskName(item.id, item.p_task_name)} style={{ marginLeft: "5px", marginRight: "15px" }}>
                                                            {item.p_task_name}
                                                        </span>
                                                        <span className="delete-task" onClick={() => this.handleDeleteTask(item.id, item.personal_id)}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </span>
                                                    </p>
                                                    :
                                                    <p key={item.id} style={{ cursor: "pointer" }} className="task">
                                                        <i className="far fa-circle"  style={{color: "grey"}}></i>
                                                        <span className="change-task">
                                                            <input onChange={this.onChangeTaskName} value={this.state.name} placeholder="New name..." />
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
                                            </p>
                                            : null}
                                    </div>

                            ) : null}
                            {/* task ticked */}
                            {this.props.personalProject.pTaskList ? this.props.personalProject.pTaskList.map(
                                item =>
                                    <div key={item.id}>
                                        {(item.p_task_tick !== 0) ?
                                            <p>
                                                {this.state.changeNameId != item.id ?
                                                    <p key={item.id} style={{ cursor: "pointer" }} className="task">
                                                        {/* <input type="checkbox"
                                                    checked={item.p_task_tick}
                                                    onChange={() => this.tickTask(item.id, item.personal_id, item.p_task_tick)}
                                                    style={{ fontSize: "20px" }} /> */}
                                                        <i className="far fa-check-circle"
                                                        style={{color: "grey"}}
                                                            onClick={() => this.tickTask(item.id, item.personal_id, item.p_task_tick)}></i>
                                                        <span onClick={() => this.clickTaskName(item.id, item.p_task_name)}
                                                            style={{ marginLeft: "5px", marginRight: "15px", color: "grey" }} >
                                                            <strike> {item.p_task_name}</strike>
                                                        </span>
                                                        <span className="delete-task" onClick={() => this.handleDeleteTask(item.id, item.personal_id)}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </span>
                                                    </p>
                                                    :
                                                    <p key={item.id} style={{ cursor: "pointer" }} className="task">
                                                        <i className="far fa-check-circle"
                                                            style={{color: "grey"}}
                                                        ></i>
                                                        <span className="change-task">
                                                            <input onChange={this.onChangeTaskName} value={this.state.name} placeholder="New name..." />
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
                                            </p>
                                            : null}
                                    </div>

                            ) : null}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    personalProject: state.personalProject
})
const mapActiontoProps = dispatch => ({
    getAllPersonalProject: () => dispatch(getAllPersonalProject()),
    getPersonalProjectWithId: (id) => dispatch(getPersonalProjectWithId(id)),
    getAllPersonalTask: (id) => dispatch(getAllPersonalTask(id)),
    addPersonalTask: (name, id) => dispatch(addPersonalTask(name, id)),
    deletePersonalTask: (id) => dispatch(deletePersonalTask(id)),
    updatePersonalTaskName: (id, name) => dispatch(updatePersonalTaskName(id, name)),
    tickPersonalTask: (id, tick) => dispatch(tickPersonalTask(id, tick)),
    updatePersonalProjectName: (name, id)=> dispatch(updatePersonalProjectName(name, id))
})
export default connect(mapStatetoProps, mapActiontoProps)(PersonalProjectList)