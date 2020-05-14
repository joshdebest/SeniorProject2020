import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap
import './index.css';

ReactDOM.render((
   <Provider store={store}>
      <ConnectedRouter history={history}>
         <Switch>
            <Route path="/" component={App} />
         </Switch>
      </ConnectedRouter>
   </Provider>
), document.getElementById('root'));
