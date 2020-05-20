import React from 'react'
import Cookies from 'js-cookie'
import Router from "next/router"

export default class extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render () {
    return (
      <></>
    )
  }

  async componentDidMount() {
    Cookies.remove('token')
    Router.push('/')
  }
}