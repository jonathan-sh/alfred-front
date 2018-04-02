import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import history from './../../../service/router/History';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import userService from '../../../service/service/UserService';
import profileService from "../../../service/service/ProfileService";

export default class DialogExampleSimple extends React.Component {
    state = {
        open: true,
        label: '',
        in_request:false,
        password_is_valid:false,
        input:'password'
    };

    handleClose = () => {
        window.location.reload();
    };

    handleOpen = () => {
        history.push("/alfred/build");
    };

    fncMakeRequest = () =>{
        this.setState({'in_request':true});
        let data =
        {
            'id':profileService.getId(),
            'new_password':this.new_password.input.value,
            'old_password':this.old_password.input.value
        };
        userService.post("/change-password",data)
                   .then(success =>
                   {
                        if(success.changed === true)
                        {
                            history.push("/");
                        }
                        else
                        {
                            this.setState({'in_request':false});
                            this.setState({'label':'invalid old password'});
                        }
                   })
                   .catch(error => console.log(error));
    };

    fncValidPass = () =>{
        let ops = this.old_password.input.value.length;
        let np1 = this.new_password_1.input.value;
        let np2 = this.new_password.input.value;
        let is_valid = false;
        if (np1>5)
        {
            is_valid = (np1 === np2) && ops > 0
        }
        this.setState({'password_is_valid':is_valid})
    };

    fncChangeInput = ()=> {
        if (this.state.input === 'password')
        {
            this.setState({input:'text'});
        }
        else
        {
            this.setState({input:'password'});
        }
    };

    render() {
        let actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => {this.handleClose()}}
            />,
            <RaisedButton
                label={'Update'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                disabled={!this.state.password_is_valid}
                onTouchTap={() => {this.fncMakeRequest()}}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <Dialog
                    title="Change password"
                    contentStyle={{width: '20%', maxWidth: 'none',marginTop:'-80px'}}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    {this.state.in_request ? <LinearProgress mode="indeterminate"/> : null}
                    <br/>
                    <br/>
                    <Toggle label="Show password"
                            onToggle={() => this.fncChangeInput()}
                            labelPosition="right"/>
                    <TextField
                        hintText="old password"
                        floatingLabelText="Old password"
                        type={this.state.input}
                        onChange={() => this.fncValidPass()}
                        disabled={this.state.in_request}
                        ref={(input) => {this.old_password = input;}}
                        fullWidth={true}/>
                    <TextField
                        hintText="new password"
                        floatingLabelText="New password"
                        type={this.state.input}
                        onChange={() => this.fncValidPass()}
                        disabled={this.state.in_request}
                        ref={(input) => {this.new_password_1 = input;}}
                        fullWidth={true}/>
                    <TextField
                        hintText="confirm password"
                        floatingLabelText="Confirm password"
                        type={this.state.input}
                        onChange={() => this.fncValidPass()}
                        disabled={this.state.in_request}
                        ref={(input) => {this.new_password = input;}}
                        fullWidth={true}/>
                    <br/>
                    <br/>
                    <span className={"title"} style={{textAlign:'center', display:'block',fontWeight:'500'}} >{this.state.label}</span>
                    <br/>
                    <br/>
                </Dialog>
            </div>
        );
    }
}