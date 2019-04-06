import React, { Component } from 'react'
import { Button } from 'reactstrap'
import '../../styles/Login.css'
import '../../styles/homePage.css'

export default class Project extends Component {
    render() {
        return (
            <Button color="light" style={{ width: "100%", textAlign: "left" }}>
                <i className="fas fa-thumbtack" style={{ marginRight: "5%" }}></i>
                <b>{this.props.projectName}</b>
            </Button>
        )
    }
}