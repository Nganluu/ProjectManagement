import React, { Component } from 'react'
import Header from './header'
import UserInfoPage from './userInfoPage/userInfoPage'
import Information from './userRight/information'

export default class userInfo extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserInfoPage/>
        <Information />
      </div>
    )
  }
}
