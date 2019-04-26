import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import '../../styles/member.css'
import ModalAddProject from './modalAddProject'
import { getProject } from '../../Actions/projectActions'

class homePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddProject: false,
            modalAddTask: false,
            projectList: []
        }
    }
    componentDidMount(){
        this.props.getProject();
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            projectList: nextProps.project.projectList
        })
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
            <div className="col-md-2 menu" style={{ marginTop: "5%", paddingLeft: "3%" }}>
                <div style={{ marginBottom: "5%", color: "#4267b2" }}>
                    <i className="fas fa-users" style={{ paddingRight: "5%", fontSize: "20px" }}></i>
                    <b style={{ fontSize: "23px" }}>MY PROJECT</b>
                </div>
                <div style={{ marginBottom: "5%" }}>
                 {this.state.projectList? this.state.projectList.map(
                     (item)=>
                     <Button key={item.id} color="light" style={{ width: "100%", textAlign: "left" }}>
                        <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                        <b>{item.project_name}</b>
                    </Button>
                 ) : null }

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
        );
    }
}
const mapStatetoProps=state=>{
    return {
         project: state.project
        }
}
const mapActiontoProps = (dispatch) => ({
    getProject: ()=> dispatch(getProject())
})
export default connect(mapStatetoProps, mapActiontoProps)(homePage)