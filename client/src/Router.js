import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import HostPage from './pages/host/WaitingRoom';
import PlayerPage from './pages/player/WaitingRoom';

export default function () {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/nickname" component={MainPage} />
      </Switch>
      <Route exact path="/host" component={HostPage} />
      <Route exact path="/player" component={PlayerPage} />
    </Router>
  );
}
