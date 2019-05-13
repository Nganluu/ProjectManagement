
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import {
    Button, CardGroup, Modal, ModalBody, ModalFooter, Progress, Dropdown,
    DropdownItem, DropdownToggle, DropdownMenu, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import ModalShowPersonal from './modalShowPersonal';
import {
    getAllPersonalProject, deletePersonalProject, getPersonalProjectWithId, updatePersonalProjectName,
    getAllPersonalTask, addPersonalTask, deletePersonalTask, updatePersonalTaskName, tickPersonalTask
} from '../../Actions/personalProjectAction';
import menu from '../../styles/menu.css';
import login from '../../styles/Login.css';
import home from '../../styles/homePage.css'

class PersonalProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeletePersonalProject: false,
            personalProjectList: this.props.personalProject.personalProjectList,
            idDeletePersonalProject: "",
            id: ""
        }
    }

    componentDidMount() {
        this.props.getAllPersonalProject();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            pName: nextProps.personalProject.personalProjectDetail.personal_name
        })
    }

    componentDidUpdate = () => {
        this.props.changeLength(this.props.personalProject.personalProjectList.length);
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
        this.props.deletePersonalProject(this.state.idDeletePersonalProject);
        this.setState({
            isDeletePersonalProject: false,
            idDeletePersonalProject: ""
        })
        if(this.props.personalProject.callapidone) {
            this.props.getAllPersonalProject()
        }
    }

    choosePersonal = (id) => {
        this.setState({
            id: id
        })
    }

    closePersonal = () => {
        this.setState({
            id: ""
        })
    }

    render() {
        return (
            <div className="row">
                {this.props.personalProject.personalProjectList.length > 0 ?
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
                                    <Button onClick={() => this.choosePersonal(item.id)} outline color="primary"><b>View Detail</b></Button>
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
                    <ModalShowPersonal id={this.state.id} close={this.choosePersonal}/>
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
    // getPersonalProjectWithId: (id) => dispatch(getPersonalProjectWithId(id)),
    // getAllPersonalTask: (id) => dispatch(getAllPersonalTask(id)),
    // addPersonalTask: (name, id) => dispatch(addPersonalTask(name, id)),
    // deletePersonalTask: (id) => dispatch(deletePersonalTask(id)),
    // updatePersonalTaskName: (id, name) => dispatch(updatePersonalTaskName(id, name)),
    // tickPersonalTask: (id, tick) => dispatch(tickPersonalTask(id, tick)),
    // updatePersonalProjectName: (name, id)=> dispatch(updatePersonalProjectName(name, id))
})

export default connect(mapStatetoProps, mapActiontoProps)(PersonalProjectList)