import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddPlayer from '../views/AddPlayer';
import Home from '../views/Home';
import Players from '../views/Players';
import SinglePlayer from '../views/SinglePlayer';
import NotFound from '../views/NotFound';

// The PrivateRoute function is creating a private route and returing the specified route based on the props
// We specify the specific props we want to use in the routeChecker and pass the rest with the spread
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // when we call this function in the return, it is looking for an argument. `props` here is taco.
  const routeChecker = (obj) => (user
    ? (<Component {...obj} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: obj.location } }} />));
    // this render method is one we can use instead of component. Since the components are being dynamically created, we use render. Read the docs for more info: https://reactrouter.com/web/api/Route/render-func
  // Just like in the routes if we want the dynamically rendered component to have access to the Router props, we have to pass `props` as an argument.
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

export default function Routes({ players, setPlayers, user }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/not-found' component={NotFound} />
        <PrivateRoute
          exact
          path='/players'
          user={user}
          component={() => <Players players={players} setPlayers={setPlayers} />}
        />
        <PrivateRoute
          path='/players/:firebaseKey'
          user={user}
          component={SinglePlayer}
        />
        <PrivateRoute
          path='/add-player'
          user={user}
          component={() => <AddPlayer setPlayers={setPlayers} />}
        />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired,
  user: PropTypes.any
};
