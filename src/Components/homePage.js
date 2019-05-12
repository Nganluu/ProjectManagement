import React, { Component } from 'react';
import UserBoard from './homePage/userBoard';
import ProjectList from './homePage/projectList';
import PersonalProjectList from './homePage/personalProjectList';
import Header from './header';
import image from '../images/getting.png';
import ModalAddProject from './homePage/modalAddProject'

export default class homePage extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      projectLength: 0,
      personalLength: 0,
      personalId: "",
      modallAdd: false
    })
  }

  choosePersonal = (id) => {
    this.setState({
      personalId: id
    })
  }

  closeDetailPersonal = () => {
    this.setState({
      personalId: ""
    })
  }

  changeProjectLength = (prjLength) => {
    this.setState({
      projectLength: prjLength
    })
  }

  changePersonalLength = (perlLength) => {
    this.setState({
      personalLength: perlLength
    })
  }

  toggleAdd = () => {
    this.setState({
      modallAdd: !this.state.modallAdd
    })
  }

  render() {
    console.log(this.state.projectLength);
    console.log(this.state.personalLength);
    return (
      <div>
        <Header/>
        <div className="row">
          <UserBoard choosePersonal={this.choosePersonal}/>
          {(this.state.projectLength != 0) || (this.state.personalLength != 0) ?
            <div className="col-md-9 project">
              <div className="content">
                <i className="fas fa-star"></i>
                <span> Projects with your teams</span>
              </div>
              <ProjectList changeLength={this.changeProjectLength}/>
              <div className="content">
                <i className="fas fa-star"></i>
                <span> Your project - List of job</span>
              </div>
                <PersonalProjectList changeLength={this.changePersonalLength} 
                                     idChoose={this.state.personalId}
                                     closeDetailPersonal={this.closeDetailPersonal}
                                     />
            </div>
            : 
            <div className="col-md-10 project bg">
              <p style={{margin: "7em 11em", fontSize: "2em"}} onClick={this.toggleAdd}>
                GETTING STARTED!!!
              </p>
              <ProjectList changeLength={this.changeProjectLength}/>
              <PersonalProjectList changeLength={this.changePersonalLength}/>
              <ModalAddProject modal={this.state.modallAdd} toggle={this.toggleAdd} ></ModalAddProject>
            </div>}
        </div>
      </div>
    )
  }
}
