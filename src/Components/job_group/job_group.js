import React, { Component } from 'react'
import { Progress, CardGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'
import '../../styles/homePage.css'

export default class JobGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ckickMenu: false
        }
    }

    clickMenu = () => {
        this.setState({
            clickMenu: !this.state.clickMenu
        });
    }

    render() {
        return (
            <Link to='/detailPage' style={{textDecoration: "none"}}>
                <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                        <div >
                            
                            <span>{this.props.name}</span>
                        </div>
                        <div style={{ width: "100%", marginRight: "5%" }}>
                            <center style={{ marginBottom: "-20px" }}>{this.props.process}%</center>
                            <Progress value={this.props.process} style={{ marginBottom: "10px" }} />
                        </div>
                        <div>
                            <center>
                                <i className="fas fa-thumbtack" style={{ fontSize: "20px" }}></i>
                                <i className="fas fa-users" style={{ fontSize: "20px" }}></i>
                            </center>
                        </div>
                </CardGroup>
            </Link>
        );
    }
}