import React from 'react'
import styles from '../styles/signin.module.scss'
import { is_login, request } from '../lib/api'
import Cookies from 'js-cookie'
import Router from "next/router"

export default class extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = { email: "", password: "" }

    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  render () {
    return (
      <>
        <p>ログインだよ</p>
        <form className={styles.login_form} onSubmit={this.handleFormSubmit} method='post'>
          <label>
            email:
            <input type="email" name="email" placeholder='xxxxx@xxxxxx.xxx' onChange={this.handleFormChange} />
          </label>
          <label>
            password:
            <input type="password" name="password" placeholder='********' onChange={this.handleFormChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </>
    )
  }

  handleFormChange(e: any) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleFormSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res_data = await request({
                                      path: '/signin/',
                                      method: 'post',
                                      params: this.state
                                    })
      const token = res_data.data.token
      console.log(token)

      Cookies.set('token', token)

      alert(`success! - token: ${token}`)
      await Router.push('/profile')
    } catch (error) {
      alert(error)
      await Router.push('/signin')
    }
  }

  async componentDidMount() {
    const token = Cookies.get('token')
    if (await is_login(token)) {
      Router.push('/profile')
    }
  }
}