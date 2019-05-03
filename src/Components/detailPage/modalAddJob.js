import React, { Component } from 'react'
import { Modal, Col, Form, FormGroup, Input, Label, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import DateTimePicker from 'react-datetime-picker';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import dateFormat from 'dateformat';
import { getAllJob, addNewJob} from '../../Actions/jobAction'

class modalAddJob extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            isDatesInvalid: false
        }
    }
    
    handleChangeEndDate = endDate => {
        this.setState({
            isDatesInvalid: false
        });
        this.setState({
            endDate: endDate
        });
    }

    handleChangeStartDate = startDate => {
        this.setState({
            startDate
        })
    }

   

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    

    fetchSubmit = () => {
    const id = this.props.match.params.jobgroup_id;
    const startDate = dateFormat(this.state.startDate, "yyyy/mm/dd");
    const endDate = dateFormat(this.state.endDate, "yyyy/mm/dd");
    if (startDate > endDate ) {
        this.setState({
            isDatesInvalid: !this.state.isDatesInvalid
        })
    } else {
        this.props.addNewJob(id, this.state.name, startDate, endDate);
        this.props.cancel();
        this.setState({
            isDatesInvalid: false
        });
        this.props.getAllJob(id);
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal}>
                    <ModalHeader>Create a new Job</ModalHeader>
                    <ModalBody>
                        <Form>
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
                       
                       <div>
                        <div style={{marginLeft: "4%"}}>
                            <b>Start Date</b><br/>
                            <DateTimePicker onChange={this.handleChangeStartDate} value={this.state.startDate} format="y/MM/dd" />
                            </div>
                            <div style={{marginLeft: "4%", marginTop: "4%"}}>
                            <b>End Date</b><br/>
                            <DateTimePicker onChange={this.handleChangeEndDate} value={this.state.endDate} format="y/MM/dd" />
                            {this.state.isDatesInvalid ? 
                                <p style={{color: "red"}}>End Date is invalid</p> 
                            : null}
                            </div>
                            </div> 
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button type="submit" color="secondary" onClick={this.props.cancel}>Cancel</Button>
                    <Button type="submit" color="secondary" onClick={this.fetchSubmit}>Create</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default withRouter(connect(null, { getAllJob, addNewJob})(modalAddJob))
