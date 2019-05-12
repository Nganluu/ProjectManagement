import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Input } from 'reactstrap';
import '../../styles/member.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProjectUser, deleteProjectUser, addProjectUser } from '../../Actions/projectActions'
class MemberList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            email: "",
            user_id: "",
            user_role: "",
            isDeleteMember: false,
            isInviteMember: false,
            isLeaving: false,
            leaveError: false
        }
    }
    componentDidMount() {
        const url = window.location.pathname.toString();
        const id = url.substr(9);
        this.props.getProjectUser(id)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.project.error) {
            this.setState({
                error: true
            })
        }
        if (nextProps.match.params.project_id != this.props.match.params.project_id) {
           nextProps.getProjectUser(nextProps.match.params.project_id)
        }
    }
    deleteMemberModal = (user_id, user_role) => {
        this.setState({
            user_role: user_role,
            user_id: user_id,
            isDeleteMember: !this.state.isDeleteMember
        });
    }
    leaveModal = ()=>{
        this.setState({
            isLeaving: !this.state.isLeaving
        })
    }
    handleLeaveProject = ()=>{
        const project_id = this.props.match.params.project_id
        const user_id = localStorage.getItem("userId")
        if(localStorage.getItem("role") === "user"){
            this.props.deleteProjectUser(user_id, project_id)
            this.props.history.push("/home")
        }
        else {
            this.setState({
                leaveError: true
            })
        }
        this.setState({
            isLeaving: !this.state.isLeaving
        })
    }
    toggleLeaveError=()=>{
        this.setState({
            leaveError: !this.state.leaveError
        })
    }
    toggleDelete = () => {
        this.setState({
            isDeleteMember: !this.state.isDeleteMember
        })
    }
    deleteProjectUser = () => {
        const project_id = this.props.match.params.project_id
        this.props.deleteProjectUser(this.state.user_id, project_id)
        this.props.getProjectUser(project_id)
        this.setState({
            isDeleteMember: !this.state.isDeleteMember
        })
    }
    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    toggleInvite = () => {
        this.setState({
            isInviteMember: !this.state.isInviteMember
        })
    }
    toggleError = () => {
        this.setState({
            error: !this.state.error
        })
    }
    inviteMember = () => {
        const project_id = this.props.match.params.project_id
        this.props.addProjectUser(this.state.email, project_id)
        this.props.getProjectUser(project_id)
        this.setState({
            email: "",
            isInviteMember: !this.state.isInviteMember
        })
    }
    getUserRole = (id, role) => {
        if (localStorage.getItem('userId')==id) {
            localStorage.setItem("role", role)
        }
    }

    render() {
        const role = this.state.user_role;
        return (
            <div className="col-md-2 members">
                <center style={{ fontSize: "20px" }}><i>Member</i></center>
                <hr />
                {this.props.project.projectUser ?
                    this.props.project.projectUser.map(
                        item =>
                            <div style={{ backgroundColor: item.pivot.user_role === 'admin' ? "yellow" : null }} key={item.id} className="member">
                                <span >{item.name}</span>
                                {this.getUserRole(item.id, item.pivot.user_role)}
                                {localStorage.getItem("role")==="admin"? 
                                <div>
                                        {item.pivot.user_role === "user" ?
                                            <i className="fas fa-times-circle" style={{ fontSize: "14px" }}
                                                onClick={() => this.deleteMemberModal(item.id, item.pivot.user_role)}></i>
                                            : null
                                        }
                                    </div> : null
                                }
                            </div>
                    ) : null
                }
                {(localStorage.getItem("role")==="admin") ?
                <div style={{ color: "#989999" }} onClick={this.toggleInvite}>
                    <span style={{ cursor: "pointer" }}>+ Invite</span>
                </div> : null}
                <div style={{backgroundColor: "rgba(204, 197, 197, 0.3)", color: "gray", width: "10.8rem", cursor: "pointer"}}>
                    <center onClick={this.leaveModal}>Leave this project</center>
                </div>

                <div>
                    <Modal isOpen={this.state.isDeleteMember}>
                        <ModalHeader>Delete Project's User</ModalHeader>

                        <ModalBody>
                            {role === 'user' ?
                                <p>Do you want to delete this member?</p> :
                                <p></p>}
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.toggleDelete}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary" onClick={this.deleteProjectUser}><b>Delete</b></Button>
                        </ModalFooter>
                    </Modal>
                </div>

                <div>
                    <Modal isOpen={this.state.isInviteMember}>
                        <ModalHeader>Invite new member</ModalHeader>
                        <ModalBody>
                            <Form>
                                <span>Member's email:</span>
                                <Input
                                    type="text"
                                    onChange={this.onChangeEmail}
                                    value={this.state.email}
                                >
                                </Input>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.toggleInvite}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary" onClick={this.inviteMember}><b>Invite</b></Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal isOpen={this.state.error}>
                        <ModalHeader>Invite new member error</ModalHeader>
                        <ModalBody>
                            <center><i className="fas fa-times" style={{ fontSize: "50px", color: "red" }}></i></center>
                            <center style={{ fontSize: "20px" }}>CHECK EMAIL AGAIN</center>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.toggleError}><b>OK</b></Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal isOpen={this.state.isLeaving}>
                        <ModalBody>
                            <div>Do you want to leave this project?</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline onClick={this.leaveModal}>Cancel</Button>
                            <Button type="submit" outline onClick={this.handleLeaveProject}>Leave</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal isOpen={this.state.leaveError} toggle={this.toggleLeaveError}>
                        <ModalBody>
                            <div>Can't leave your own project</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline onClick={this.toggleLeaveError}>OK</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    project: state.project
})
const mapActiontoProps = dispatch => ({
    getProjectUser: (id) => dispatch(getProjectUser(id)),
    deleteProjectUser: (user_id, project_id) => dispatch(deleteProjectUser(user_id, project_id)),
    addProjectUser: (email, project_id) => dispatch(addProjectUser(email, project_id))
})
export default withRouter(connect(mapStatetoProps, mapActiontoProps)(MemberList))