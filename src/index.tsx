import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import * as shortid from 'shortid';
import * as moment from 'moment';
import 'typeface-roboto';
import configureStore from './configureStore';
import './index.css';
import './material-icons.css'
import registerServiceWorker from './registerServiceWorker';
import * as RoutesModule from './routes';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

let routes = RoutesModule.routes;

const history = createBrowserHistory();
const initialState = undefined; // loadState();
const store = configureStore(history, initialState);
localStorage.debug = 'y*,card-manager';

let terminalId = localStorage.getItem('terminalId');
if (!terminalId) {
  terminalId = shortid.generate();
}
let networkName = localStorage.getItem('networkName');
if (!networkName) {
  networkName = 'DEMO';
}

(moment as any).defaultFormat = localStorage.getItem('dateFormat') || 'DD.MM.YYYY HH:mm';
const branchName = localStorage.getItem('branchName') || '';
const serverName = localStorage.getItem('serverName') || '';

store.dispatch({ type: 'SET_TERMINAL_ID', terminalId, networkName, serverName, branchName });

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing configuration
  // and injects the app into a DOM element.
  ReactDOM.render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ConnectedRouter history={history} children={routes} />
      </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root')
  );
}

renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require<typeof RoutesModule>('./routes').routes;
    renderApp();
  });
}

registerServiceWorker();

window.addEventListener('beforeinstallprompt', (e: any) => {
  e.preventDefault();
  e.prompt();
});

