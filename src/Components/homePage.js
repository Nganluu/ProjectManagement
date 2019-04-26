import React, { Component } from 'react';
import UserBoard from './homePage/userBoard';
import ProjectList from './homePage/projectList';
import Header from './header'

export default class homePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="row">
          <UserBoard />
          <ProjectList />
        </div>
      </div>
    )
  }
}