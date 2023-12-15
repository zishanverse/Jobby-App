import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  failure = msg => this.setState({errorMsg: msg, error: true})

  success = jwt => {
    Cookie.set('jwt_token', jwt, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginSite = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  changeUsername = event => this.setState({username: event.target.value})

  changePass = event => this.setState({password: event.target.value})

  render() {
    const {username, password, errorMsg, error} = this.state
    const jwt = Cookie.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form onSubmit={this.loginSite}>
            <label htmlFor="name" className="label">
              USERNAME
            </label>
            <br />
            <input
              id="name"
              type="text"
              onChange={this.changeUsername}
              value={username}
              className="input"
              placeholder="Username"
            />
            <br />

            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              onChange={this.changePass}
              value={password}
              className="input"
              placeholder="Password"
            />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {error && <p className="error-msg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
