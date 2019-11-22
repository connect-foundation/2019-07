import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HostWaitingRoom from './pages/host/HostWaitingRoom';
import EditPage from './pages/host/EditPage';
import PlayerWaitingRoom from './pages/player/PlayerWaitingRoom';
import CallBackPage from './pages/login/CallBackPage';

export default function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/nickname" component={MainPage} />
        <Route path="/login" component={MainPage} />
      </Switch>
      <Route exact path="/host" component={HostWaitingRoom} />
      <Route exact path="/player" component={PlayerWaitingRoom} />
      <Route exact path="/edit" component={EditPage} />
      <Route exact path="/callback" component={CallBackPage} />
    </Router>
  );
}
