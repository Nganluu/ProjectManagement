import React, { Component } from 'react'
import UserBoard from './userPage/userBoard'
import Header from './header'

export default class userPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserBoard/>
      </div>
    )
  }
}
