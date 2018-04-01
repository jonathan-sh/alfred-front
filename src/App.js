import FlatButton from 'material-ui/FlatButton';
import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import history from './service/router/History';
import HttpService from './service/http/HttpService';
import './style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import "./style/css/index.css";

class App extends Component {

    constructor(props){
        super(props);
        this.state = {response:0}
    }

    handleClose = () => history.push('/');

    makeLogin = () =>
    {
        localStorage.removeItem('auth-token');
        HttpService.make().post('/auth', this.makeDataForLogin())
        .then(success =>
        {
            localStorage.setItem('auth-token',success.token);
            localStorage.setItem('profile',JSON.stringify(success.user));
            history.push('/alfred/webhook');
        })
        .catch(error =>
        {
            this.setState({'response':401});
        });
    };

    makeDataForLogin= () =>
    {
        return {
                 email:this.email.input.value,
                 password:this.password.input.value,
                }
    };


    getResponse = (response) =>
    {
        switch (response)
        {
            case 0 :
                return "";
            case 401:
                return (
                          <div className="home-ysnp"/>
                       );
            case -1:
                return (
                          <FlatButton label={"Obviously you need help, please click here if you forgot your password"} />
                      );
            default :
                return "";

        }

    };

    getStart = () =>
    {
        return(
                <div  style={{width: '40%', margin: 'auto', textAlign: 'center', paddingTop: '2%'}}>
                <h3 className="title">Welcome to Alfred</h3>

                <div className="home-logo"/>

                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    type="text"
                    fullWidth={true}
                    onKeyPress={ (e) =>{this.setState({'response':0});}}
                    ref={(input) => {this.email = input;}}
                />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    fullWidth={true}
                    onKeyPress={ (e) =>
                        {
                            if (e.key === 'Enter')
                            {
                                this.makeLogin()
                            }
                            else
                            {
                                this.setState({'response':0});
                            }
                        }
                    }
                    ref={(input) => {this.password = input;}}
                />
                <br/>
                <br/>
                <div style={{textAlign: 'right'}}>
                    <RaisedButton label="Login"
                                  onClick={() => this.makeLogin()}
                                  primary={true}/>
                </div>
                <br/>
                <br/>
                {this.getResponse(this.state.response)}
            </div>
        );
    };

    render()
    {

        return (this.getStart());
    };
}

export default App;
