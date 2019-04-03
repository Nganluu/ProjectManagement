import React, { Component } from 'react'
import Header from './header'
import ContactPage from './contactPage/contact'

export default class contactPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <ContactPage />
        </div>
      </div>
    )
  }
}
