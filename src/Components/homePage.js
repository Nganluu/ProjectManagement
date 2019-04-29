import React, { Component } from 'react';
import UserBoard from './homePage/userBoard';
import ProjectList from './homePage/projectList';
import PersonalProjectList from './homePage/personalProjectList'
import Header from './header'

export default class homePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="row">
          <UserBoard />
          <div className="col-md-9 project">
          <div className="content">
            <i class="fas fa-star"></i>
            <span> Projects with your teams</span>
          </div>
          <ProjectList />
          <div className="content">
            <i class="fas fa-star"></i>
            <span> Your project - List of job</span>
          </div>
            <PersonalProjectList />
          </div>
        </div>
      </div>
    )
  }
}
