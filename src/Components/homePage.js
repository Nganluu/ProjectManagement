import React, { Component } from 'react'
import UserBoard from './homePage/userBoard'
import Header from './header'

export default class homePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserBoard/>
      </div>
    )
  }
}
