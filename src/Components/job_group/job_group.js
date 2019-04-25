import React, { Component } from 'react'
import { Progress, CardGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import '../../styles/menu.css'

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
            <div className="col-md-3 menu-inside">
            <Link to='/detailPage' style={{textDecoration: "none"}}>
                    <div className="delete">
                        <i className="fas fa-times-circle" style={{ fontSize: "28px" }}></i>
                    </div>
                
                    <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                        <div >                            
                            <span>{this.props.name}</span>
                       
                        </div>
                        <div style={{ width: "100%", marginRight: "5%" }}>
                            <Progress value={this.props.process} style={{ marginBottom: "10px" }} />
                            <center>{this.props.process}%</center>
                        </div>
                    </CardGroup>
                    
                    <div className="mask">
                        <Button type="submit" outline color="primary" onClick=""><b>View Detail</b></Button>
                    </div>
                
            </Link>
            </div>
        );
    }
}