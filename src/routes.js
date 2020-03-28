import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import Login from './pages/login/index';
import Register from './pages/register/index';
import Home from './pages/home/index';
import NewEvent from './pages/newEvent/index';
import EventDetails from './pages/eventDetails/index';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return(
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/app" component={Home} />
      <PrivateRoute path="/createEvent" component={NewEvent} />
      <PrivateRoute path="/eventDetail" component={EventDetails} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
  );
}
