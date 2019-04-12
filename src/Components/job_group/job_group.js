import React, { Component } from 'react'
import { Progress, CardGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'
import '../../styles/homePage.css'
import '../../styles/style1.css'
import '../../styles/style_common.css'

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
                <div className="view view-first">
                    <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
                        <div >                            
                            <span>{this.props.name}</span>
                        </div>
                        <div style={{ width: "100%", marginRight: "5%" }}>
                            <center style={{ marginBottom: "-20px" }}>{this.props.process}%</center>
                            <Progress value={this.props.process} style={{ marginBottom: "10px" }} />
                        </div>
                    </CardGroup>

                    <div className="mask">
                        <Button type="submit" outline color="primary" onClick=""><b>Chi tiết</b></Button>
                        <Button type="submit" outline color="primary" onClick=""><b>Chỉnh sửa</b></Button>
                        <Button type="submit" outline color="primary" onClick=""><b>Xóa</b></Button>
                    </div>
                </div>
            </Link>
        );
    }
}