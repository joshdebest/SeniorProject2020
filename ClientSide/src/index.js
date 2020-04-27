import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap
import './index.css';

const router = (
   <Provider store={store}>
      <BrowserRouter><App/></BrowserRouter>
   </Provider>
)

ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. 
serviceWorker.unregister();