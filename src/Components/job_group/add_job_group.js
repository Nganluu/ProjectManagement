import React, { Component } from 'react'
import { Form, FormGroup, Input, Col, Button, CardGroup } from 'reactstrap'
import '../../styles/Login.css'
import '../../styles/homePage.css'

export default class AddJobGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputShown: false
        }
    }

    clickAdd = () => {
        this.setState({
            inputShown: !this.state.inputShown
        });
    }

    render() {
        return (
            <CardGroup className="card" style={{ height: "100%", width: "100%", cursor: "pointer" }}>
            {
                !this.state.inputShown ? 
                
                    <div onClick={this.clickAdd}>
                        <span>+ Add new</span>
                    </div> 
                    
                    : 

                    <div>
                         <Form>
                            <FormGroup>
                                <Col sm="12" md={{ size: 12 }}>
                                    <i>New job group</i>
                                    <Input
                                        type="text"
                                        id="Content"
                                        name="Content"
                                        value={this.state.name}
                                        onChange={this.handleChangeName}
                                    />
                                </Col>
                            </FormGroup>
                            <center>
                                    <Button type="submit" outline color="primary" onClick="">Add</Button>
                            </center>
                        </Form>
                    </div>
            }
            </CardGroup>
        );
    }
}