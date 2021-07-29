import { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
  const { logout, isAuthenticated } = useContext(AuthContext)
  const history = useHistory()

  const logoutHandler = (event) => {
    event.preventDefault()
    logout()
    history.push('/') // redirect to /
  }

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" className="nav-link">
            Url Shortener
          </NavLink>

          <ul className="navbar-nav ms-auto d-flex flex-row">
            <li className="nav-item">
              <NavLink to="/create" className="nav-link p-2">
                Create
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/links" className="nav-link p-2">
                Links
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <a href="/" className="nav-link p-2" onClick={logoutHandler}>
                  Log Out
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link p-2">
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
