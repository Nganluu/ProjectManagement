import React, { Component } from 'react';
import BoardList from './detailPage/boardList';
import Header from './header';
import { connect } from 'react-redux';
import { getJobGroupWithId } from '../Actions/jobGroupAction';

class detailPage extends Component {
  render() {
      return (
      <div>
      <Header/>
      <BoardList />
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    jobGroup: state.jobGroup
  }
}

export default connect( mapStatetoProps, {getJobGroupWithId} ) (detailPage) 
