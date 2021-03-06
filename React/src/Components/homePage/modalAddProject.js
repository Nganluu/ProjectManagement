import React, { Component } from 'react'
import { Modal, Col, Form, FormGroup, Input, Label, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import DateTimePicker from 'react-datetime-picker';
import {connect} from 'react-redux';
import { addNewProject, getAllProject } from '../../Actions/projectActions';
import {addNewPersonalProject, getAllPersonalProject} from '../../Actions/personalProjectAction';


class modalAddProject extends Component {
    constructor(props){
        super(props);
        this.state={
            type: "Project", 
            name: "",
            startDate: new Date(),
            endDate: new Date()
        }
    }
    
    handleChangeEndDate = endDate => {
        this.setState({endDate})
    }

    handleChangeStartDate = startDate => {
        this.setState({startDate})
    }

    handleChangeType = (event) => {
        this.setState({
            type: event.target.value
        });
    }

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    
    handleCancel = () => {
        this.setState({
            type: "Project"
        });

        this.props.toggle()
    }

    fetchSubmit = () => {
        this.props.toggle();
        if (this.state.type === "Project") {
            this.props.addNewProject(this.state.name);
            this.props.getAllProject();
        } 

        if (this.state.type === "Personal") {
            this.props.addNewPersonalProject(this.state.name);
            this.props.getAllPersonalProject();
        } 

        this.setState({
            type: "Project",
            name: ""
    });
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal}>
                    <ModalHeader>Create a new Project</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Col sm="12" md={{ size: 8 }}>
                                    <b for="object" style={{marginRight: "5%"}}>Type</b>
                                   {/* <input type="text"  onChange={this.handleChangeType}/> */}
                                   <select onChange={this.handleChangeType}>
                                       <option value = "Project">Project</option>
                                       <option value="Personal">Personal</option>
                                   </select>
                                   
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm="12" md={{ size: 8 }}>
                                    <b for="content">Name</b>
                                    <Input
                                        type="text"
                                        id="Content"
                                        name="Content"
                                        value={this.state.name}
                                        onChange={this.handleChangeName}
                                    />
                                </Col>
                            </FormGroup>
                        {/* { this.state.type === "Personal" &&
                       <div>
                        <div style={{marginLeft: "4%"}}>
                            <b>Start Date</b><br/>
                            <DateTimePicker onChange={this.handleChangeStartDate} value={this.state.startDate} />
                            </div>
                            <div style={{marginLeft: "4%", marginTop: "4%"}}>
                            <b>End Date</b><br/>
                            <DateTimePicker onChange={this.handleChangeEndDate} value={this.state.endDate} />
                            </div>
                            </div> 
                            }   */}
                         
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button type="submit" color="secondary" onClick={this.handleCancel}>Cancel</Button>
                    <Button type="submit" color="secondary" onClick={this.fetchSubmit}>Create</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapActiontoProps = dispatch => ({
    addNewProject: (project_name) => dispatch(addNewProject(project_name)),
    getAllProject: () => dispatch(getAllProject()),
    addNewPersonalProject: (personal_name) => dispatch(addNewPersonalProject(personal_name)),
    getAllPersonalProject: () => dispatch(getAllPersonalProject())
    });
export default connect(null, mapActiontoProps)(modalAddProject)
