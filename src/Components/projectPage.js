import React, { Component } from 'react';
import UserBoard from './homePage/userBoard';
import MemberList from './homePage/memberList';
import JobGroupList from './job_group/job_group_list';
import Header from './header'
import {connect} from 'react-redux'
import {Spinner} from 'reactstrap'
class projectPage extends Component {
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
const mapStatetoProps = state => ({
  project: state.project
})
export default connect(mapStatetoProps)(projectPage)