import React, { Component } from 'react'
import Header from './header'
import UserLeft from './userInfoPage/userLeft'
import Information from './userInfoPage/information'

export default class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem('name')
    }
  }

  changeName = (name) => {
    this.setState({
      name: name
    })
  }

  render() {
    return (
      <div>
        <Header/>
        <UserLeft name={this.state.name}/>
        <Information changeName={this.changeName}/>
      </div>
    )
  }
}
