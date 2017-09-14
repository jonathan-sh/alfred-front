import "./style/css/index.css";
import React, {Component} from "react";
import './style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import history from './service/router/History';

class App extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    handleClose = () => {
        history.push('/');
    };
    makeLogin = () => {
        localStorage.setItem('auth-token','token-valido');
        history.push('/alfred/profile');
    };

    render() {

        return (
            <div style={{width: '60%', margin: 'auto', textAlign: 'center', paddingTop: '2%'}}>
                <h3 className="title">Welcome to Alfred</h3>

                <div className="home-logo"></div>

                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    type="text"
                    fullWidth={true}
                    ref={(input) => {
                        this.email = input;
                    }}
                />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="text"
                    fullWidth={true}
                    ref={(input) => {
                        this.password = input;
                    }}
                />
                <br/>
                <br/>
                <div style={{textAlign: 'right'}}>
                    <FlatButton
                        label="Cancel"
                        primary={false}
                        style={{color: "#767676"}}
                        onClick={() => this.handleClose()}
                    />
                    <FlatButton
                        label="Forgot password"
                        primary={true}
                        onClick={() => this.handleClose()}
                    />
                    <RaisedButton label="Login"
                                  onClick={() => this.makeLogin()}
                                  primary={true}/>
                </div>


            </div>
        );
    }
}

export default App;
