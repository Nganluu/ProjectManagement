import React, { Component } from 'react';
import UserBoard from './homePage/userBoard';
import MemberList from './homePage/memberList';
import JobGroupList from './job_group/job_group_list';
import Header from './header'

export default class homePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="row">
          <UserBoard />
          <JobGroupList />
          <MemberList />
        </div>
      </div>
    )
  }
}
