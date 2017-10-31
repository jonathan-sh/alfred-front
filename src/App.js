import "./style/css/index.css";
import React, {Component} from "react";
import './style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import history from './service/router/History';
import HttpService from './service/http/HttpService';
import ProfileCrud from './box/desktop/profile/CrudProfile'

class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {httpStatus : 0, isFirst:0};
        this.attempts = 0;

    };

    componentWillMount()
    {
        HttpService.make().get('/login/is-first')
        .then(success =>
        {
            if(success)
            {
                this.setState({'isFirst':1});
            }
            else
            {
                this.setState({'isFirst':0});
            }
        })
        .catch(error =>
        {
             console.log(error);
        });

    };

    handleClose = () => history.push('/');

    makeLogin = () =>
    {
        localStorage.removeItem('auth-token');
        HttpService.make().post('/login', this.makeDataForLogin())
        .then(success =>
        {
            console.log(success);
            localStorage.setItem('auth-token',success.token);
            localStorage.setItem('profile',success.entity);
            history.push('/alfred/profile');
        })
        .catch(error =>
        {
            console.log(error);
            this.countError();
        });
    };

    countError = () =>
    {
        this.attempts ++;
        if (this.attempts === 3)
        {
            this.attempts = 0;
            this.setState({'httpStatus':-1});
        }
    };

    makeDataForLogin= () =>
    {
        return {
                 email:this.email.input.value,
                 password:this.password.input.value,
                 entity:'provider'
                }
    };

    resetStatus= () => this.setState({'httpStatus':0});

    getResponse = () =>
    {
        switch (this.state.httpStatus)
        {
            case 0 :
                return "";
            case 501:
                return (
                          <div className="home-ysnp"></div>
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
        switch (this.state.isFirst)
        {
            case 0 :
                return(
                        <div  style={{width: '60%', margin: 'auto', textAlign: 'center', paddingTop: '2%'}}>
                        <h3 className="title">Welcome to Alfred</h3>

                        <div className="home-logo"></div>

                        <TextField
                            hintText="Email"
                            floatingLabelText="Email"
                            type="text"
                            fullWidth={true}
                            onChange={this.resetStatus}
                            ref={(input) => {this.email = input;}}
                        />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            fullWidth={true}
                            onChange={this.resetStatus}
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
                        {this.getResponse()}

                    </div>
                      );
            case 1:
                return (
                         <ProfileCrud isFirstAcess={true} />
                       );
            default :
                return "";

        }

    };

    render()
    {

        return (this.getStart());
    };
}

export default App;
