import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddPlayer from '../views/AddPlayer';
import Home from '../views/Home';
import Players from '../views/Players';
import SinglePlayer from '../views/SinglePlayer';
import NotFound from '../views/NotFound';

export default function Routes({ players, setPlayers, user }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/players'
          user={user}
          component={() => <Players players={players} setPlayers={setPlayers} />}
        />
        <Route
          path='/players/:firebaseKey'
          component={SinglePlayer}
          user={user}
        />
        <Route
          path='/add-player'
          component={() => <AddPlayer setPlayers={setPlayers} />}
          user={user}
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
