import React, { Component } from 'react';
import '../../styles/member.css'

export default class Member extends Component {
    render() {
        return(
            <div className="member">
                <span>{this.props.memberName}</span>
                <i className="fas fa-times-circle" style={{ fontSize: "14px" }}></i>
            </div>
        );
    }
}