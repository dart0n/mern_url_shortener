import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { AuthContext } from '../context/AuthContext'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import CreateLink from './links/CreateLink'
import LinkDetail from './links/LinkDetail'
import Links from './links/Links'
import Header from './Header'
import Loader from './Loader'

function Routes({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact component={Links} />
        <Route path="/links/:id" component={LinkDetail} />
        <Route path="/create" component={CreateLink} />
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Redirect to="/" />
    </Switch>
  )
}

function App() {
  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = !!token

  if (!ready) {
    // if async function from useAuth doesn't get token yet
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <Router>
        <div className="container">
          <Header />

          <Routes isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
