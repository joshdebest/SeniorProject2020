import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import history from './store';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap
import './index.css';

ReactDOM.render((
   <Provider store={store}>
      <BrowserRouter>
         <Switch>
            <Route path="/" component={App} />
         </Switch>
      </BrowserRouter>
   </Provider>
), document.getElementById('root'));

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();