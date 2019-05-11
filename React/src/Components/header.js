import React, { Component } from 'react'
import { Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import ModalAddProject from './homePage/modalAddProject'

class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAdd: false,
            userDrop: false
        }
    }
    toggleUser = () => {
        this.setState({
            userDrop: !this.state.userDrop
        })
    }
    toggleAddProject = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }
    handleSignout = ()=>{
        localStorage.clear();
        window.location.reload()
        this.props.history.push('/')
    }
    render() {
        return (
            <div className="container-fluid" id="header">
                <div className="row">
                    <div className="col-md-7">
                        <i className="fas fa-tasks" style={{ marginRight: "10px" }}></i>
                        <Link to='/home' style={{ textDecoration: "none", color: "#4267b2" }}><b> PROMAN </b></Link>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className='col-md-4' style={{ textAlign: "right" }}>
                        <Button color="link" onClick={this.toggleAddProject}>
                            <i className="fas fa-plus-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                        </Button>
                        <Link to='/contact'>
                            <Button color="link">
                                <i className="fas fa-info-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                            </Button>
                        </Link>
                        <ButtonDropdown isOpen={this.state.userDrop} toggle={this.toggleUser} style={{ marginTop: "-4px" }}>
                            <DropdownToggle data-toggle="dropdown" tag="span">
                                <Button color="link" onClick={this.toggleUser}>
                                    <i className="fas fa-user-circle" style={{ cursor: "pointer", fontSize: "28px" }}></i>
                                </Button>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag="a" href='/user'>Profile</DropdownItem>
                                <DropdownItem onClick={this.handleSignout}>Sign out</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    <ModalAddProject modal={this.state.modalAdd} toggle={this.toggleAddProject} />
                </div>
            </div>
        )
    }
}
export default withRouter(header)