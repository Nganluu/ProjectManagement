import React, { Component } from 'react'
import UserBoard from './homePage/userBoard'
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
