import {Switch, Redirect, Route} from 'react-router-dom'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute'
import Job from './Job'
import JobItemDetails from './JobItemDetails'
import NotFound from './NotFound'
import Login from './Login'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Job} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
