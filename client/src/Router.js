import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import HostWaitingRoom from './pages/host/HostWaitingRoom';

import PlayerWaitingRoom from './pages/player/PlayerWaitingRoom';
import LoginPage from './pages/login/LoginPage';
import CallBackPage from './pages/login/CallBackPage';

export default function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/nickname" component={MainPage} />
      </Switch>
      <Route exact path="/host" component={HostWaitingRoom} />
      <Route exact path="/player" component={PlayerWaitingRoom} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/callback" component={CallBackPage} />
    </Router>
  );
}
