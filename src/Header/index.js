import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const loggingOut = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <ul className="nav-card">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="home-logo"
            />
          </Link>
        </li>

        <li className="menu">
          <Link to="/" className="link">
            <p>Home</p>
          </Link>

          <Link to="/jobs" className="link">
            <p>Jobs</p>
          </Link>
        </li>
        <li className="home-btn-card">
          <button type="button" className="log-out" onClick={loggingOut}>
            Logout
          </button>
        </li>
      </ul>
    </>
  )
}

export default withRouter(Header)
