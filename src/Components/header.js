import React, { Component } from 'react'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import ModalAddProject from './homePage/modalAddProject'

export default class header extends Component {
    constructor (props){
        super(props);
        this.state={
            modalAdd: false
        }
    }
    toggleAddProject=()=>{
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }
  render() {
    return (
                <div className="container-fluid" id="header">
                    <div className="row">
                        <div className="col-md-7">
                            <i className="fas fa-tasks" style={{ marginRight: "10px" }}></i>
                            <Link to='/home' style={{ textDecoration: "none", color: "#4267b2" }}><b> PROMAN </b></Link>
                        </div>
                        <div className="col-md-3">
                        </div>
                        <div className='col-md-2' style={{ textAlign: "right" }}>
                            <Button color="link" onClick={this.toggleAddProject}>
                                <i className="fas fa-plus-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                            </Button>
                            <Link to='/contact'>
                            <Button color="link">
                                <i className="fas fa-info-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                            </Button>
                            </Link>
                            <Link to='/user'>
                            <Button color="link">
                                <i className="fas fa-user-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                            </Button>
                            </Link>
                        </div>
                        <ModalAddProject modal={this.state.modalAdd} toggle={this.toggleAddProject}/>
                    </div>
                </div>
     
    )
  }
}
