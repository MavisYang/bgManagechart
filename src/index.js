import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,Route,Router} from 'react-router';

import Error from './containers/Error';
import HomeScope from './containers/HomeScope';
import createBrowserHistory from 'history/createBrowserHistory';

ReactDOM.render(<HomeScope/>, document.getElementById('root'));