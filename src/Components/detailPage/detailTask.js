import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import DateTimePicker from 'react-datetime-picker';
import '../../styles/menu.css';
import '../../styles/scrollbar.css'
import Avatar from 'react-avatar'
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Modal, Progress, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getAllJob, getJobWithId, updateJobName, updateJobDescription, updateJobStartDate, updateJobEndDate, getAllHistory } from '../../Actions/jobAction';
import { getAllTask, getTaskWithId, addNewTask, updateTaskName, updateTaskTick, deleteTask } from '../../Actions/taskAction'
import { getAllMemberJob, addNewMemberJob, deleteMemberJob } from '../../Actions/memberJobAction';
import { getProjectUser } from '../../Actions/projectActions';
import { getAllComment, addNewComment, updateComment, deleteComment } from '../../Actions/commentAction';

class detailTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //job name
      jobTitle: "",
      jobTitleEditing: false ,
      //description
      description: false,
      value: "",
      //startDate
      isStartDateChange: false,
      isStartDateInvalid: false,
      startDate: "",
      //endDate
      isEndDateChange: false,
      isEndDateInvalid: false,
      endDate: "",
      //task
      dropdown: false,
      taskName: "",
      test: "",
      id: "",
      //member
      idAddMemberList: [],
      isclickAddMember: false,
      //comment
      idEditComment: "",
      content: "",
      showHistory: false
    }
  }

  //show data
  componentDidUpdate = (prevProps) => {
      if(this.props.id != prevProps.id) {
        this.props.getJobWithId(this.props.id);
        this.props.getAllTask(this.props.id);
        this.props.getAllMemberJob(this.props.id);
        this.props.getProjectUser(this.props.match.params.project_id);
        this.props.getAllComment(this.props.id);
        this.props.getAllHistory(this.props.id);
      }
  }

  //Change job name
  jobTitleEditing = (name)=>{
    this.setState({
      jobTitleEditing: !this.state.jobTitleEditing,
      jobTitle: name
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
  descriptionEditing = (cnt) => {
    this.setState({
      description: !this.state.description,
      value: cnt
    })
  }

  onEdit = (event) => {
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
  startDateEditing = (date) => {
    this.setState({
      isStartDateChange: !this.state.isStartDateChange,
      startDate: date,
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
  endDateEditing = (date) => {
    this.setState({
      isEndDateChange: !this.state.isEndDateChange,
      endDate: date,
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
      this.props.getJobWithId(this.props.id);
      this.props.getAllHistory(this.props.id);
      this.props.getAllJob(this.props.match.params.jobgroup_id);
      this.setState({
        dropdown: false
      })
    }
  }

  //Change Task Name
  onChangeTaskName = (event) => {
    this.setState({
      taskName: event.target.value
    });
  }

  cancelChangeTaskName = () => {
    this.setState({
      taskName: "",
      id: ""
    });
  }

  clickTaskName = (id, name) => {
    this.setState({
      id: id,
      taskName: name
    });
  }

  handleChangeTaskName = (id) => {
    if(this.state.taskName) {
      this.props.updateTaskName(id, this.state.taskName);
      this.setState({
        id: "",
        taskName: ""
      });
      this.props.getAllTask(this.props.id);
      this.props.getAllHistory(this.props.id);
    }
  }

  handleDeleteTask = (id) => {
    this.props.deleteTask(id);
    this.props.getAllTask(this.props.id);
    this.props.getJobWithId(this.props.id);
    this.props.getAllHistory(this.props.id);
    this.props.getAllJob(this.props.match.params.jobgroup_id);
  }

  tickTask = (id, task_tick) => {
    if (localStorage.getItem('role') == "admin" || this.props.member.memberJobList.includes(localStorage.getItem('userId'))) {
      if (task_tick == 0) {
        this.props.updateTaskTick(id, 1);
        this.props.getAllTask(this.props.id);
        this.props.getJobWithId(this.props.id);
        this.props.getAllHistory(this.props.id);
        this.props.getAllJob(this.props.match.params.jobgroup_id);
      } else {
        this.props.updateTaskTick(id, 0);
        this.props.getAllTask(this.props.id);
        this.props.getJobWithId(this.props.id);
        this.props.getAllHistory(this.props.id);
        this.props.getAllJob(this.props.match.params.jobgroup_id);
      }
    }
}

  // Members in job
  clickAddMember = () => {
    if( !this.state.isclickAddMember ) {
      this.setState({
        isclickAddMember: true
      })
    } else {
      this.setState({
        isclickAddMember: false,
        idAddMemberList: []
      })
    }
  }

  chooseMember = (id) => {
    if ( !this.state.idAddMemberList.includes(id)) {
      this.setState({
        idAddMemberList: [...this.state.idAddMemberList,id]
      });
    } else {
      this.setState({
        idAddMemberList: this.state.idAddMemberList.filter(e => e != id)
      });
    }
  }

  handleAddMember = () => {
    if (this.state.idAddMemberList) {
      this.state.idAddMemberList.forEach(id => {
        this.props.addNewMemberJob(this.props.id, id)
      });
      this.props.getAllMemberJob(this.props.id);
      this.setState({
        idAddMemberList: [],
        isclickAddMember: false
      });
    }
  }

  handleDeleteMemberJob = (id) => {
    this.props.deleteMemberJob(this.props.id, id);
    this.props.getAllMemberJob(this.props.id);
  }

  //Comment
  clickEditComment = (id, cont) => {
    if (this.state.idEditComment != id) {
      this.setState({
        idEditComment: id,
        content: cont
      })
    } else {
      this.setState({
        idEditComment: "",
        content: ""
      })
    }
  }

  onChangeComment = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  addComment = () => {
    this.props.addNewComment(this.props.id, this.state.content);
    this.props.getAllComment(this.props.id);
    this.setState({
      content: ""
    });
  }

  handleEditComment = () => {
    if(this.state.content) {
      this.props.updateComment(this.state.idEditComment, this.state.content);
      this.props.getAllComment(this.props.id);
      this.setState({
        idEditComment: "",
        content: ""
      });
    }
  }

  handleDeleteComment = (id) => {
    this.props.deleteComment(id);
    this.props.getAllComment(this.props.id);
  } 

  //Show History
  clickShowHistory = () => {
    this.setState({
      showHistory: !this.state.showHistory
    });
  }
 

  render() {
    console.log(this.props.task.taskList)
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
          <div className="scrollbar" style={{ height : "36em"}}>
          <div style={{width: "32em"}}>
          <ModalBody>
            <div >
              <div style={{ padding: "10px"}}>
                {!this.state.jobTitleEditing ?
                  <div style={{ cursor: "pointer" }}>
                    <i className="fas fa-list-ul"></i>
                    <b onClick={() => this.jobTitleEditing(this.props.job.jobDetail.job_name)} style={{ paddingLeft: "5px", fontSize: "20px" }}>{this.props.job.jobDetail.job_name} </b>
                  </div>
                  :
                  <div>
                    <i className="fas fa-list-ul"></i>
                    <input onChange={this.onChangeJobTitle} value={this.state.jobTitle} placeholder="New name..." />
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

              {/* Start Date */}
              <div>
                <i className="fas fa-hourglass-start"></i> From: {" "}
                <span>
                {!this.state.isStartDateChange ?
                    <span onClick={() => this.startDateEditing(this.props.job.jobDetail.start_date)} style={{ cursor: "pointer" }}>
                    {dateFormat(this.props.job.jobDetail.start_date, "dd/mm/yyyy")}
                  </span>
                  :
                  <span>
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
                  </span>
                }
                </span>
              </div>

              {/* End Date */}
              <div>
                <i className="fas fa-hourglass-end"></i> Til: {" "}
                <span>
                {!this.state.isEndDateChange?
                  <span onClick={() => this.endDateEditing(this.props.job.jobDetail.end_date)} style={{ cursor: "pointer" }}>
                    {dateFormat(this.props.job.jobDetail.end_date, "dd/mm/yyyy")}
                  </span>
                :
                <span>
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
                  </span>
                }
                </span>
              </div>

              {/* Member */}
              <div>
                <i className="fas fa-users"></i> <b>Members of Job</b>
                <br />
                {this.props.member.memberJobList ? this.props.member.memberJobList.map(
                  item =>
                    <span className="member-job">
                      <i className="fas fa-times-circle delete-member-job" onClick={() => this.handleDeleteMemberJob(item.id)}></i>
                      <Avatar
                        name={item.name}
                        border="1px solid #474d56"
                        size="30px"
                        textSizeRatio="2"
                        round={true}
                      />
                      <span className="member-name">{item.name}</span>
                    </span>
                ):null}

                {/* Add member */}
                <Dropdown isOpen={this.state.isclickAddMember} tag="span">
                  <DropdownToggle tag="span" data-toggle="dropdown">
                    <Button onClick={this.clickAddMember} color="link">
                      <i className="fas fa-user-plus" style={{cursor: "pointer", fontSize: "20px"}} onClick=""></i>
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.props.project.projectUser.filter(
                      ({id}) => !(this.props.member.memberJobList.map(
                        user => user.id
                      ).includes(id))).map(
                      item =>
                      <DropdownItem  onClick={() => this.chooseMember(item.id)}>
                        <span>
                          {item.name}  
                          <span>
                          { this.state.idAddMemberList.includes(item.id) ?
                          <i className="fas fa-check" style={{color: "gray", fontSize: "10px", marginLeft: "1em"}}></i>
                          :null}
                          </span>
                        </span>
                    </DropdownItem>
                    )}
                    <DropdownItem>
                      <center>
                      <Button onClick={this.handleAddMember} color="link">Add</Button>
                      </center>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              {/* Description */}
              <div style={{ padding: "10px" }}>
                <i className="fas fa-grip-lines"></i>
                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>Description</b>
                {!this.state.description ?
                  <b>
                  <Button style={{padding: "0px 10px", marginLeft: "10px", marginTop: "-5px"}} onClick={() => this.descriptionEditing(this.props.job.jobDetail.job_description)}>Edit</Button>
                  </b>
                  :
                  <b>
                  <Button style={{padding: "0px 10px", marginLeft: "10px", marginTop: "-5px"}} onClick={this.handleChangeJodDescription}>Edit</Button>
                  <Button color="link">
                      <i style={{ fontSize: "20px", position: "relative", cursor: "pointer" }} 
                      onClick={() => this.descriptionEditing("")} className="fas fa-times"></i>
                  </Button>
                  </b>
                }
                <br/>
                {this.state.description ?
                  <textarea onChange={this.onEdit} value={this.state.value} rows="3" cols="45" placeholder="Add some description..." />
           
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
                <div>
                {this.props.task.taskList ? this.props.task.taskList.map(
                  item =>
                    <div>
                      {item.task_tick == 0 ?
                      <p>
                        {this.state.id != item.id ? 
                          <span key={item.id} style={{ cursor: "pointer" }} className="task">
                            <i className="far fa-circle" onClick={() => this.tickTask(item.id, item.task_tick)}></i>
                            <span onClick={() => this.clickTaskName(item.id, item.task_name) } style={{marginLeft: "5px", marginRight: "15px" }}>{item.task_name}</span>
                            <span className="delete-task" onClick={() => this.handleDeleteTask(item.id)}>
                              <i class="fas fa-trash-alt"></i>
                            </span>
                          </span>
                          :
                          <span key={item.id} style={{ cursor: "pointer" }} className="task">
                            <i className="far fa-circle"></i>{" "}
                            <span className="change-task">
                              <input onChange={this.onChangeTaskName} value={this.state.taskName} placeholder="new name..." />
                            <Button color="link" onClick={() => this.handleChangeTaskName(item.id)}>
                              <i style={{ fontSize: "14px", position: "relative", cursor: "pointer" }} 
                              className="fas fa-pen"></i>
                            </Button>
                            <span style={{color: "blue"}}>|</span>
                            <Button color="link">
                                <i style={{ fontSize: "14px", position: "relative", cursor: "pointer" }} 
                                onClick={this.cancelChangeTaskName} className="fas fa-times"></i>
                            </Button>
                            </span>
                          </span>
                          }
                      </p>
                      : null}
                    </div>
                ): null}
                </div>

                <div> 
                  {this.props.task.taskList ? this.props.task.taskList.map(
                    item =>
                    <div>
                    { (item.task_tick != 0) ?
                      <p>
                        {this.state.id != item.id ? 
                          <span key={item.id} style={{ cursor: "pointer" }} className="task">
                            <i class="far fa-check-circle" onClick={() => this.tickTask(item.id, item.task_tick)}
                              style={{color: "grey"}}
                            ></i>
                            <span onClick={() => this.clickTaskName(item.id, item.task_name) } style={{marginLeft: "5px", marginRight: "15px", color: "grey" }}>
                            <strike>{item.task_name}</strike>
                            </span>
                            <span className="delete-task" onClick={() => this.handleDeleteTask(item.id)}>
                              <i class="fas fa-trash-alt"></i>
                            </span>
                          </span>
                          :
                          <span key={item.id} style={{ cursor: "pointer" }} className="task">
                            <i className="far fa-check-circle"></i> {" "}
                            <span className="change-task">
                              <input onChange={this.onChangeTaskName} value={this.state.taskName} placeholder="New name..." />
                            <Button color="link" onClick={() => this.handleChangeTaskName(item.id)}>
                              <i style={{ fontSize: "14px", position: "relative", cursor: "pointer" }} 
                              className="fas fa-pen"></i>
                            </Button>
                            <span style={{color: "blue"}}>|</span>
                            <Button color="link">
                                <i style={{ fontSize: "14px", position: "relative", cursor: "pointer" }} 
                                onClick={this.cancelChangeTaskName} className="fas fa-times"></i>
                            </Button>
                            </span>
                          </span>
                        }
                      </p>
                    : null}
                  </div>
                  )
                  :null}
                </div>

              {/* Comments */}
              <div style={{ padding: "10px" }}>
                <i className="fas fa-comment"></i>
                <b style={{ paddingLeft: "5px", fontSize: "20px" }}>Comment</b><br />
                <div style={{ marginTop: "10px"}}>
                  {this.props.comment.commentList ? this.props.comment.commentList.map(
                    item => 
                      <p>
                        <span className="member-job">
                          <Avatar
                            name={item.user_name}
                            border="1px solid #474d56"
                            size="30px"
                            textSizeRatio="2"
                            round={true}
                          />
                        <span className="member-name">{item.user_name}</span>
                        </span>
                        <i>   </i>
                        { this.state.idEditComment != item.id ? 
                          <span>
                          {item.content}
                          </span>
                        :
                        <span>
                          <input style={{ borderRadius: "10px" }} value={this.state.content} onChange={this.onChangeComment} placeholder="new content..." />
                          <Button color="link" onClick={this.handleEditComment}>
                            <i style={{ fontSize: "30px", paddingLeft: "-4px", paddingTop: "-5px  " }} class="fas fa-arrow-alt-circle-up"></i>
                          </Button>
                          <span style={{color: "blue"}}>|</span>
                          <Button color="link" onClick={() => this.clickEditComment(item.id)}>
                              <i style={{ fontSize: "30px", position: "relative", cursor: "pointer" }} 
                              className="fas fa-times"></i>
                          </Button>

                        </span>
                        }

                        { item.user_id == localStorage.getItem('userId') ?
                        <p>
                          <span className="comment" onClick={() => this.clickEditComment(item.id, item.content)}>Edit</span>
                          <span className="comment" onClick={() => this.handleDeleteComment(item.id)}>Delete</span>
                        </p>
                        :null}
                      </p>
                  ):null}  
                </div>

                <span>
                  <Avatar
                    name={localStorage.getItem('name')}
                    border="1px solid #474d56"
                    size="30px"
                    textSizeRatio="2"
                    round={true}
                  />
                  <i>   </i>
                  <input style={{ borderRadius: "10px" }} onChange={this.onChangeComment} placeholder="add a comment..." />
                  <Button color="link" onClick={this.addComment}>
                    <i style={{ fontSize: "30px", paddingLeft: "-4px", paddingTop: "-5px  " }} class="fas fa-arrow-alt-circle-up"></i>
                  </Button>
                </span>
              </div>
              <div style={{ padding: "10px",paddingLeft: "5px" }}>
              <i className="fas fa-check-circle"></i>
              <b> Activities</b>
              { !this.state.showHistory ? 
                <span className="show-history">
                  <i className="fas fa-angle-down" onClick={this.clickShowHistory}></i>
                </span>
                :
                <span className="show-history">
                  <i className="fas fa-angle-up" onClick={this.clickShowHistory}></i>
                </span>             
              }
              {this.props.job.historyList.length > 0 && this.state.showHistory ? (this.props.job.historyList.map(
                (item, index) => (this.props.job.historyList)[this.props.job.historyList.length - 1 - index]
              )).map(
                item =>
                <p style={{marginLeft: "20px"}}>
                  <i className="fas fa-history"></i>
                  <span> {item.content}</span>
                </p>
              ):null}
              </div>
            </div>
            </div>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle} style={{ marginRight: "13.5em"}}>Ok</Button>
          </ModalFooter>
          </div>
          </div>
        </Modal>
    </div>
    )
  }
}
const mapStatetoProps = state => {
  return {
    job: state.job,
    task: state.task,
    member: state.memberJob,
    project: state.project,
    comment: state.comment
  }
}

const mapActiontoProps = dispatch => {
 return {
   //Action with job
   getAllJob: id => dispatch(getAllJob(id)),
   getJobWithId: id => dispatch(getJobWithId(id)),
   updateJobName: (id, name) => dispatch(updateJobName(id, name)),
   updateJobDescription: (id, desc) => dispatch(updateJobDescription(id, desc)),
   updateJobStartDate: (id, startDate) => dispatch(updateJobStartDate(id, startDate)),
   updateJobEndDate: (id, endDate) => dispatch(updateJobEndDate(id, endDate)),
   getAllHistory: id => dispatch(getAllHistory(id)),
  
   //Action with task
   getAllTask: id => dispatch(getAllTask(id)),
   getTaskWithId: id => dispatch(getTaskWithId(id)),
   addNewTask: (id, name) => dispatch(addNewTask(id, name)),
   updateTaskName: (id, name) => dispatch(updateTaskName(id, name)),
   updateTaskTick: (id, taskTick) => dispatch(updateTaskTick(id, taskTick)),
   deleteTask: id => dispatch(deleteTask(id)),

   //Action with members of job
   getAllMemberJob: id => dispatch(getAllMemberJob(id)),
   addNewMemberJob: (job_id, user_id) => dispatch(addNewMemberJob(job_id, user_id)),
   deleteMemberJob: (job_id, user_id) => dispatch(deleteMemberJob(job_id, user_id)),

   //Action with members of project
   getProjectUser: id => dispatch(getProjectUser(id)),

   //Actions with comment
   getAllComment: id => dispatch(getAllComment(id)),
   addNewComment: (id, content) => dispatch(addNewComment(id, content)),
   updateComment: (id, content) => dispatch(updateComment(id, content)),
   deleteComment: (id) => dispatch(deleteComment(id))
  }
}

export default withRouter(connect(mapStatetoProps, mapActiontoProps)(detailTask))