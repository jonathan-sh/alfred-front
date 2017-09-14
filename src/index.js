import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Router, Route, Redirect } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import history from './service/router/History';
import App from './App';
import Dash from './box/desktop/dash/Dash';

injectTapEventPlugin(); 

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = {props => (
        localStorage.getItem('auth-token') !== null ?
        (<Component {...props}/>) : (<Redirect to={{pathname: '/'}}/>)
    )}/>
)

const Main = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <Router history={history}>
                <div>
                    <Route exact path='/' component={App} />
                    <PrivateRoute path='/alfred/:way' component={Dash} />
                </div>
            </Router>
        </BrowserRouter>
    </MuiThemeProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();
