import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Input } from 'reactstrap';
import '../../styles/member.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProjectUser, deleteProjectUser} from '../../Actions/projectActions'
class MemberList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            isDeleteMember: false,
            isInviteMember: false
        }
    }
    componentDidMount(){
        const url = window.location.pathname.toString();
        const id = url.substr(9);
        this.props.getProjectUser(id)
    }
    deleteMemberModal = (user_id) => {
        this.setState({
            user_id: user_id,
            isDeleteMember: !this.state.isDeleteMember
        });
    }
    toggleDelete = ()=>{
        this.setState({
            isDeleteMember: !this.state.isDeleteMember
        })
    }
    deleteProjectUser = ()=>{
        const project_id = this.props.match.params.project_id
        this.props.deleteProjectUser(this.state.user_id, project_id)
        this.props.getProjectUser(project_id)
        this.setState({
            isDeleteMember: !this.state.isDeleteMember
        })
    }
    inviteMember = () => {
        this.setState({
            isInviteMember: !this.state.isInviteMember
        })
    }

    render() {
        return(
            
            <div className="col-md-2 members">
                <center style={{ fontSize: "20px"}}><i>Member</i></center>
                <hr />
                {this.props.project.projectUser ? 
                this.props.project.projectUser.map(
                    item => 
                    <div key = {item.id} className="member">
                    <span>{item.name}</span>
                    <i className="fas fa-times-circle" style={{ fontSize: "14px" }} onClick={()=>this.deleteMemberModal(item.id)}></i>
                </div>
                ) : null
                }
            
                <div style={{ color: "#989999" }} onClick={this.inviteMember}>
                    <span style={{cursor: "pointer"}}>+ Invite</span>
                </div>

                <div>
                    <Modal isOpen={this.state.isDeleteMember} >
                        <ModalBody>
                            <p>Do you want to delete this member?</p>
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
                                >
                                </Input>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.inviteMember}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary"><b>Invite</b></Button>
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
    getProjectUser: (id)=>dispatch(getProjectUser(id)),
    deleteProjectUser : (user_id, project_id)=>dispatch(deleteProjectUser(user_id, project_id))
})
export default withRouter(connect(mapStatetoProps, mapActiontoProps)(MemberList))