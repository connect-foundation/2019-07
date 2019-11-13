import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

export default function () {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route path="/nickname" component={MainPage} />
    </Router>
  );
}
