import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import HostWaitingRoom from './pages/host/HostWaitingRoom';
import EditPage from './pages/host/EditPage';
import PlayerWaitingRoom from './pages/player/PlayerWaitingRoom';

export default function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/nickname" component={MainPage} />
      </Switch>
      <Route exact path="/host" component={HostWaitingRoom} />
      <Route exact path="/player" component={PlayerWaitingRoom} />
      <Route exact path="/edit" component={EditPage} />
    </Router>
  );
}
