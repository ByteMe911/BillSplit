import React from 'react';
import { Route, IndexRoute } from 'react-router';
// Components
import Layout from './containers/Layout';
import Home from './containers/Home';
import Test from './containers/Test';
import CreateEvent from './Components/CreateEvent';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="test" component={Test} />
    <Route path="/create_event" component={CreateEvent}>
  </Route>
);