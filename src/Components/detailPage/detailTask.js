import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Modal, Progress, ModalBody, ModalFooter, Button } from 'reactstrap'

class detailTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      description: false,
      value: ""
    }
  }
  toggle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }
  descriptionEditing=()=>{
    this.setState({
      description: !this.state.description
    })
  }
  onEdit=(event)=>{
    this.setState({
      value: event.target.value
    })
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} >
          <ModalBody>
            <div >

              <div style={{ padding: "10px" }}>
                <i className="fas fa-list-ul"></i>
                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>this is test, add api </b>
                <div style={{ fontSize: "15px" }}><i>This is a test for pen</i></div>
              </div>
              <div style={{ padding: "10px", paddingLeft: "30px" }}>
                <div>
                  <i className="fas fa-hourglass-start"></i> From Date
                  </div>
                <div>
                  <i className="fas fa-hourglass-end"></i> Til Date
                  </div>
              </div>
              <div style={{ padding: "10px" }}>
                <i className="fas fa-grip-lines"></i>
                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>Description</b>
                <Button style={{padding: "0px 10px", marginLeft: "10px", marginTop: "-5px"}} onClick={this.descriptionEditing}>Edit</Button>
                <br/>
                {this.state.description ?
                  <textarea onBlur={this.descriptionEditing} onChange={this.onEdit} value={this.state.value} rows="3" cols="50" placeholder="Add some description..." />
                  : this.state.value
                }
              </div>
              <div style={{ padding: "10px" }}>
                <i className="fas fa-clipboard-check"></i>
                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>To do list</b>
                <Dropdown isOpen={this.state.dropdown} style={{ marginLeft: "102px", marginTop: "-30px" }}>
                  <DropdownToggle tag="span" data-toggle="dropdown">
                    <Button onClick={this.toggle} color="link">
                      <i className="fas fa-plus-circle" style={{ fontSize: "20px" }}></i>
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <b>Task Name</b>
                    </DropdownItem>
                    <DropdownItem>
                      <input style={{ border: "1px solid blue" }} />
                      </DropdownItem>
                      <DropdownItem>
                        <Button>Add</Button>
                      </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                15% <Progress value="15" />
                <br/>
                <input type="checkbox" style={{fontSize: "20px"}}/> JOB
              </div>
              <div style={{ padding: "10px" }}>
                <i className="fas fa-comment"></i>
                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>Comment</b><br />
                <div>abc</div>

                <span>
                  <input style={{ borderRadius: "10px" }} placeholder="add a comment..." />
                  <Button color="link">
                    <i style={{ fontSize: "30px", paddingLeft: "-4px", paddingTop: "-5px  " }} class="fas fa-arrow-alt-circle-up"></i>
                  </Button>
                </span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>Ok</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}
const mapStatetoProps = state => {

}
export default connect(mapStatetoProps)(detailTask)