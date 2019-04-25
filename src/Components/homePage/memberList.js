import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../../styles/member.css'

export default class MemberList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleteMember: false
        }
    }

    deleteMember = () => {
        this.setState({
            isDeleteMember: !this.state.isDeleteMember
        });
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
            </div>
        );
    }
}