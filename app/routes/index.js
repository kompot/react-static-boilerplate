import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from 'routes/Home';
import SignIn from 'routes/SignIn';
import Root from 'routes/Root';

export default (
  <Route component={Root}>
    <Route path='/' component={Home} />
    <Route path='/signin' component={SignIn} />
  </Route>
);
