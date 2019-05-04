import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat';
import DateTimePicker from 'react-datetime-picker';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Modal, Progress, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getJobWithId, updateJobName, updateJobDescription, updateJobStartDate, updateJobEndDate } from '../../Actions/jobAction';
import { getAllTask, getTaskWithId, addNewTask, updateTaskName, updateTaskTick, deleteTask } from '../../Actions/taskAction'


class detailTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      description: false,
      value: "",
      isStartDateChange: false,
      isStartDateInvalid: false,
      startDate: "",
      isEndDateChange: false,
      isEndDateInvalid: false,
      endDate: "",
      taskName: "",
      test: "",
      jobTitle: "",
      jobTitleEditing: false 
    }
  }

  //show data
  componentDidUpdate = (prevProps) => {
      if(this.props.id != prevProps.id) {
        this.props.getJobWithId(this.props.id);
        this.props.getAllTask(this.props.id);
      }

  }

  //Change job name
  jobTitleEditing = ()=>{
    this.setState({
      jobTitleEditing: !this.state.jobTitleEditing
    })
  }

  onChangeJobTitle=(event)=>{
    this.setState({
      jobTitle: event.target.value
    })
  }

  handleChangeJobTitle = () => {
    const id = this.props.id;
    console.log(id);
    this.props.updateJobName(id, this.state.jobTitle);
    this.props.getJobWithId(id);
    this.jobTitleEditing();
  }

  //Change job description
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

  handleChangeJodDescription = () => {
    const id = this.props.id;
    this.props.updateJobDescription(id, this.state.value);
    this.props.getJobWithId(id);
    this.descriptionEditing();
  }

  //Change job start date
  startDateEditing = () => {
    this.setState({
      isStartDateChange: !this.state.isStartDateChange,
      isStartDateInvalid: false
    });
  }

  changeStartDate = (startDate) => {
    this.setState({startDate});
    this.setState({
      isStartDateInvalid: false
    })
  }

  handleChangeStartDate = () => {
    const id = this.props.id;
    const startDate = dateFormat(this.state.startDate, "yyyy/mm/dd");
    const endDate = dateFormat(this.props.job.jobDetail.end_date, "yyyy/mm/dd");
    console.log(startDate > endDate);
    if ( startDate > endDate ) {
      this.setState({
        isStartDateInvalid: !this.state.isStartDateInvalid
      })
    } else {
      this.props.updateJobStartDate(id, startDate);
      this.props.getJobWithId(id);
      this.startDateEditing();
    }
  }

  //Change Job End Date
  endDateEditing = () => {
    this.setState({
      isEndDateChange: !this.state.isEndDateChange,
      isEndDateInvalid: false
    });
  }

  changeEndDate = (endDate) => {
    this.setState({endDate});
    this.setState({
      isEndDateInvalid: false
    })
  }

  handleChangeEndDate = () => {
    const id = this.props.id;
    const endDate = dateFormat(this.state.endDate, "yyyy/mm/dd");
    const startDate = dateFormat(this.props.job.jobDetail.start_date, "yyyy/mm/dd");
    const now = dateFormat(new Date(), "yyyy/mm/dd");
    if ( startDate > endDate || now > endDate) {
      this.setState({
        isEndDateInvalid: !this.state.isEndDateInvalid
      })
    } else {
      this.props.updateJobEndDate(id, endDate);
      this.props.getJobWithId(id);
      this.endDateEditing();
    }
  }

  // Add new task
  toggle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  onTaskName = (event)=>{
    this.setState({
      taskName: event.target.value
    })
  }

  addTask = ()=>{
    if(this.state.taskName) {
      this.props.addNewTask(this.props.id, this.state.taskName);
      this.props.getAllTask(this.props.id);
      this.setState({
        dropdown: false
      })
    }
  }

 

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} >
          <ModalBody>
            <div >
              <div style={{ padding: "10px" }}>
                {!this.state.jobTitleEditing ?
                  <div>
                    <i className="fas fa-list-ul"></i>
                    <b onClick={this.jobTitleEditing} style={{ paddingLeft: "5px", fontSize: "20px" }}>{this.props.job.jobDetail.job_name} </b>
                  </div>
                  :
                  <div>
                    <i className="fas fa-list-ul"></i>
                    <input onChange={this.onChangeJobTitle} placeholder="New name..." />
                    <Button color="link" onClick={this.handleChangeJobTitle}>
                      <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                      className="fas fa-pen"></i>
                    </Button>
                    <span style={{color: "blue"}}>|</span>
                    <Button color="link">
                        <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                        onClick={this.jobTitleEditing} className="fas fa-times"></i>
                    </Button>
                  </div>
                }
              </div>
              <div style={{ padding: "10px", paddingLeft: "30px" }}>
              {!this.state.isStartDateChange ?
                <div onClick={this.startDateEditing}>
                  <i className="fas fa-hourglass-start"></i> From: {dateFormat(this.props.job.jobDetail.start_date, "dd/mm/yyyy")}
                </div>
                : 
                <div>
                  <DateTimePicker onChange={this.changeStartDate} value={this.state.startDate} />
                  <Button color="link" onClick={this.handleChangeStartDate}>
                    <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                    className="fas fa-pen"></i>
                  </Button>
                  <span style={{color: "blue"}}>|</span>
                  <Button color="link">
                      <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                      onClick={this.startDateEditing} className="fas fa-times"></i>
                  </Button>
                  {this.state.isStartDateInvalid ? <p style={{color: "red"}}>Date is invalid</p>:null}
                </div>
              }
                <div>
                  {!this.state.isEndDateChange?
                  <div onClick={this.endDateEditing}>
                    <i className="fas fa-hourglass-end"></i> Til: {dateFormat(this.props.job.jobDetail.end_date, "dd/mm/yyyy")}
                  </div>
                  :
                  <div>
                    <DateTimePicker onChange={this.changeEndDate} value={this.state.endDate} />
                    <Button color="link" onClick={this.handleChangeEndDate}>
                      <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                      className="fas fa-pen"></i>
                    </Button>
                    <span style={{color: "blue"}}>|</span>
                    <Button color="link">
                        <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                        onClick={this.endDateEditing} className="fas fa-times"></i>
                    </Button>
                    {this.state.isEndDateInvalid ? <p style={{color: "red"}}>Date is invalid</p>:null}
                  </div>
                  }
                  </div>
              </div>
              <div style={{ padding: "10px" }}>
                <i className="fas fa-grip-lines"></i>
                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>Description</b>
                {!this.state.description ?
                  <b>
                  <Button style={{padding: "0px 10px", marginLeft: "10px", marginTop: "-5px"}} onClick={this.descriptionEditing}>Edit</Button>
                  </b>
                  :
                  <b>
                  <Button style={{padding: "0px 10px", marginLeft: "10px", marginTop: "-5px"}} onClick={this.handleChangeJodDescription}>Edit</Button>
                  <Button color="link">
                      <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                      onClick={this.descriptionEditing} className="fas fa-times"></i>
                  </Button>
                  </b>
                }
                <br/>
                {this.state.description ?
                  <textarea onChange={this.onEdit} rows="3" cols="50" placeholder="Add some description..." />
                  : this.props.job.jobDetail.job_description
                }
              </div>
              <div style={{ padding: "10px" }}>
              {/* Add Task */}
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
                      <input onChange={this.onTaskName} style={{ border: "1px solid blue" }} />
                      </DropdownItem>
                      <DropdownItem>
                        <Button onClick={this.addTask}>Add</Button>
                      </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {this.props.job.jobDetail.job_process}% <Progress value={this.props.job.jobDetail.job_process} />
                <br />

                {/* Task List */}
                {this.props.task.taskList ? this.props.task.taskList.map(
                  item =>
                  <p>
                    <input type="checkbox" style={{fontSize: "20px"}}/> {item.task_name}
                  </p>
                ): null}
              </div>

              {/* Comments */}
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
              <div style={{ padding: "10px",paddingLeft: "5px" }}>
              <i className="fas fa-check-circle"></i>
              <b>Job Check</b>
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
  return {
    job: state.job,
    task: state.task
  }
}

const mapActiontoProps = dispatch => {
 return {
   //Action with job
   getJobWithId: id => dispatch(getJobWithId(id)),
   updateJobName: (id, name) => dispatch(updateJobName(id, name)),
   updateJobDescription: (id, desc) => dispatch(updateJobDescription(id, desc)),
   updateJobStartDate: (id, startDate) => dispatch(updateJobStartDate(id, startDate)),
   updateJobEndDate: (id, endDate) => dispatch(updateJobEndDate(id, endDate)),
  
   //Action with task
   getAllTask: id => dispatch(getAllTask(id)),
   getTaskWithId: id => dispatch(getTaskWithId(id)),
   addNewTask: (id, name) => dispatch(addNewTask(id, name)),
   updateTaskName: (id, name) => dispatch(updateTaskName(id, name)),
   updateTaskTick: (id, taskTick) => dispatch(updateTaskTick(id, taskTick)),
   deleteTask: id => dispatch(deleteTask(id))
  }
}

export default connect(mapStatetoProps, mapActiontoProps)(detailTask)