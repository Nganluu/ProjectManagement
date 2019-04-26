import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Input } from 'reactstrap';
import '../../styles/member.css'

export default class MemberList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleteMember: false,
            isInviteMember: false
        }
    }

    deleteMember = () => {
        this.setState({
            isDeleteMember: !this.state.isDeleteMember
        });
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
                <div className="member">
                    <span>Vu Xinh</span>
                    <i className="fas fa-times-circle" style={{ fontSize: "14px" }} onClick={this.deleteMember}></i>
                </div>
            
                <div className="member">
                    <span>Ngan Luu</span>
                    <i className="fas fa-times-circle" style={{ fontSize: "14px" }} onClick={this.deleteMember}></i>
                </div>

                <div style={{ color: "#989999" }} onClick={this.inviteMember}>
                    <span>+ Invite</span>
                </div>

                <div>
                    <Modal isOpen={this.state.isDeleteMember} >
                        <ModalBody>
                            <p>Do you want to delete this member?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" outline color="primary" onClick={this.deleteMember}><b>Cancel</b></Button>
                            <Button type="submit" outline color="primary" onClick=""><b>Delete</b></Button>
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
                            <Button type="submit" outline color="primary" onClick=""><b>Invite</b></Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}