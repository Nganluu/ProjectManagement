import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import ModalAddProject from './modalAddProject'
import { addNewProject } from '../../Actions/createNew'
import Project from '../project/project'
import AddJobGroup from '../job_group/add_job_group'
import JobGroup from '../job_group/job_group'

class homePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddProject: false,
            modalAddTask: false,
            data: []
        }
    }
    toggleAddProject = () => {
        this.setState({
            modalAddProject: !this.state.modalAddProject
        })
    
    }
    toggleAddTask = ()=>{
        this.setState({
            modalAddTask: !this.state.modalAddTask
        })
    }
    render() {
        return (
            <div style={{ backgroundColor: "rgba(231, 231, 231, 0.07)" }}>
                <div>
                    <div className="row">
                        <div className="col-md-2 menu" style={{ marginTop: "5%", paddingLeft: "3%" }}>
                            <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                                <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                <b style={{ fontSize: "23px" }}>MY PROJECT</b>
                            </div>
                            <div style={{ marginBottom: "5%" }}>
                                <Project projectName="CNW" />
                                <Project projectName="PTTK" />
                                <Project projectName="NLP" />
                                <Project projectName="SQA" />

                                <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>+ Create new</div>
                                    {/* <ModalAddProject  modal={this.state.modalAddProject} toggle={this.toggleAddProject}/> */}
                            </div>
                            <div style={{ color: "#4267b2" }}>
                                <i className="far fa-check-circle" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                                <b style={{ fontSize: "25px" }}>PERSONAL</b>
                                <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                                    <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                             <b>All Tasks</b>
                                </Button>
                                <div onClick={this.toggleAddProject} style={{ color: "#989999" }}>+ Create new</div>   
                            </div>
                            <ModalAddProject modal={this.state.modalAddProject} toggle={this.toggleAddProject}/>
                        </div>
                        <div className="col-md-8" style={{ marginTop: "7%", paddingLeft: "1%", marginLeft: "18%" }}>
                            <div style={{ fontSize: "20px", marginBottom: "1%" }}>
                                <b>CÔNG NGHỆ WEB</b>
                            </div>
                            <div onClick={this.toggleAddProject} style={{ color: "#989999", cursor: "pointer" }}>+ Create new </div>

                            <div class="row">
                                <div class="col-md-3" style={{ marginBottom: "10px" }}>
                                    <JobGroup name="Write 3D table in JS" process="25" />
                                </div>

                                <div class="col-md-3" style={{ marginBottom: "10px" }}>
                                    <JobGroup name="fix hang ngang" process="10" />
                                </div>

                                <div class="col-md-3" style={{ marginBottom: "10px" }}>
                                    <JobGroup name="fix hang doc" process="20" />
                                </div>

                                <div class="col-md-3" style={{ marginBottom: "10px" }}>
                                    <JobGroup name="tap the duc buoi sang" process="35" />
                                </div>

                                <div class="col-md-3" style={{ marginBottom: "10px" }}>
                                    <AddJobGroup />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps=state=>{
    return {
         data: state.data
        }
}
const mapActiontoProps = (dispatch) => ({
    addNewProject: () => dispatch(addNewProject())
})
export default connect(mapStatetoProps, mapActiontoProps)(homePage)