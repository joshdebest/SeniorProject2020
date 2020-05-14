import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
 
const initState = {};

if (module.hot) {
   module.hot.accept('./reducers/',() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
   });
}

export const history = createBrowserHistory();
export const store = createStore(rootReducer(history), initState, composeWithDevTools(applyMiddleware(thunk)));
