import React, { Component } from 'react'
import Header from './header'
import UserLeft from './userInfoPage/userLeft'
import Information from './userInfoPage/information'

export default class userInfo extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserLeft />
        <Information />
      </div>
    )
  }
}
