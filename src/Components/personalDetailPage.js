import React, { Component } from 'react';
import UserBoard from './homePage/userBoard';
import PersonalJobList from './personalDetailPage/personalJobList';
import Header from './header';
import {connect} from 'react-redux';
import {Spinner} from 'reactstrap';

class PersonalDetailPage extends Component {
  render() {
    return (
      <div>
        <Header/>
          <div className="row">
          <UserBoard />
          <PersonalJobList />
        </div>
      </div>
    )
  }
}
const mapStatetoProps = state => ({
  personalProject: state.personalProject
})
export default connect(mapStatetoProps)(PersonalDetailPage)