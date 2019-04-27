import React, { Component } from 'react'
import BoardList from './detailPage/boardList'
import Header from './header'
export default class detailPage extends Component {
  render() {
    return (
      <div>
      <Header/>
      <BoardList/>
      </div>
    )
  }
}
