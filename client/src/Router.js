import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HostGameRoom from './pages/host/HostGameRoom';
import HostDetailRoom from './pages/host/HostDetailRoom';
import EditPage from './pages/host/EditPage';
import PlayerGameRoom from './pages/player/PlayerGameRoom';
import CallBackPage from './pages/login/CallBackPage';
import SelectRoom from './pages/host/SelectRoom';
import GameOver from './pages/Gameover';

export default function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/join/:roomNumber" component={MainPage} />
        <Route exact path="/login" component={MainPage} />
        <Route exact path="/host" component={HostGameRoom} />
        <Route exact path="/player" component={PlayerGameRoom} />
        <Route exact path="/edit" component={EditPage} />
        <Route exact path="/callback" component={CallBackPage} />
        <Route exact path="/host/room/select" component={SelectRoom} />
        <Route exact path="/host/room/detail" component={HostDetailRoom} />
        <Route component={GameOver} />
      </Switch>
    </Router>
  );
}
