
import React, { Component } from 'react';
import { Input, Button, Form, FormGroup, Col } from 'reactstrap';
import JobGroup from './job_group';
import AddJobGroup from './add_job_group';
import '../../styles/menu.css';
import '../../styles/Login.css';
import '../../styles/homePage.css'

export default class JobGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditProjectName: false
        }
    }

    editProjectName = () => {
        this.setState({
            isEditProjectName: !this.state.isEditProjectName
        });
    }

    render() {
        return (
            <div className="col-md-8 project">
                    <div style={{ fontSize: "20px", margin: "2%" }}>
                    {
                        !this.state.isEditProjectName ?
                            <b className="project-name" onClick={this.editProjectName}>CÔNG NGHỆ WEB</b>
                        :
                        <div className="row input">
                            <div className="col-md-2"><i>New name:</i></div>
                            <div className="col-md-4">
                                <Form>
                                    <FormGroup>
                                        <Col sm="12" md={{ size: 12 }}>
                                            <Input
                                                type="text"
                                                onChange=""
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                            <div className="col-md-3">
                                <Button type="submit" outline color="primary" onClick="">Edit</Button>
                                <Button type="submit" outline color="primary" onClick={this.editProjectName}>Cancel</Button>
                            </div>
                        </div>
                    }
                    </div>

                <div className="row">
                    <JobGroup name="Write 3D table in JS" process="25" />
                    <JobGroup name="fix hang ngang" process="10" />
                    <JobGroup name="fix hang doc" process="20" />
                    <JobGroup name="tap the duc buoi sang" process="35" />
                    <div className="col-md-3">
                        <AddJobGroup />
                    </div>
            </div>
        </div>     
        );
    }
}