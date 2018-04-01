import React, {Component} from "react";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';
import userService from '../../../service/service/UserService';
import _ from 'lodash';

class NewProfile extends Component {

    constructor(props)
    {
        super(props);
        this.isUpdate = false;
        this.label = 'Crate a new user';
        this.state = {
            open: false,
            makeSave: false,
            errorText: {name: '', email: '', password:''},
            profile:{id: null, name: '', password: '', email: '', enable: false}
        };
    };

    componentWillMount()
    {
        if(this.props.profile && this.props.profile.id)
        {
            let profile = this.props.profile;
            profile['password'] ='';
            this.setState({'profile':  profile});
            this.label = 'Update user';
            this.isUpdate = true;
        }
    };

    makeSave = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});
            userService.save(this.state.profile)
                       .then(success =>
                       {
                           this.fncHandleClose();
                           this.fncSuccessRequest();
                       })
                       .catch(error => console.log(error));
        }
    };

    makeUpdate = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});

            userService.update(this.state.profile)
                       .then(success => this.fncSuccessRequest())
                       .catch(error => console.log(error));
        }
    };

    fncValidData = () =>
    {
        let enable = true;
        let profile = this.state.profile;

        let errorText = {
            name: '',
            email: '',
            password:''
        };

        this.setState({'errorText': errorText});

        _.forEach(profile, (value, key) => {
            if (!this.fncValidValue(value)) {
                enable = false;
                errorText[key] = 'this is required';
            }
        });

        this.setState({'errorText': errorText});

        return enable;

    };

    fncValidValue = (value) =>
    {
        return value !== undefined && value !== ""
    };

    fncSuccessRequest = () =>
    {
        if (!this.isUpdate)
        {
            this.setState({profile:{id: null, name: '', password: '', email: '', level: 'DEVELOPMENT', enable: false}});
            this.setState({errorText:{name: '', email: '', level: '', password:''}});
        }
        this.setState({makeSave: false});
        this.fncHandleClose();
        PubSub.publish('table-update-profiles', true);
    };

    fncSetData = (event, value, attribute) =>
    {
        let profile = this.state.profile;
        profile[attribute] = value;
        this.setState(profile);
    };

    fncHandleChangeAdminLevel = (event,value) =>
    {
        console.log(value);
        let profile = this.state.profile;
        profile['level'] = value;
        this.setState({'profile':profile});
    };

    fncHandleChangeEnable = () =>
    {
        let profile = this.state.profile;
        profile['enable'] = !this.state.profile.enable;
        this.setState(profile);
    };

    fncHandleClose = () => this.setState({open: false});

    fncHandleOpen = () =>  this.setState({open: true});

    render()
    {

        let actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                label={(this.isUpdate) ? 'Update' : 'Save'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                onTouchTap={(this.isUpdate) ? this.makeUpdate : this.makeSave}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <RaisedButton
                    label={this.props.btLabel}
                    backgroundColor={this.props.btBackgroundColor}
                    icon={this.props.btIcon}
                    style={this.props.btStyle}
                    onTouchTap={this.fncHandleOpen}
                    labelStyle={{color: 'white'}}/>

                <Dialog
                    title={this.label}
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave ? <LinearProgress mode="indeterminate"/> : null}


                    <div style={{'width':'100%','height':'22px','paddingTop':'22px'}}>

                        <Toggle
                            style={{'width':'50%','float':'left'}}
                            label="Account is active"
                            defaultToggled={this.state.profile.enable}
                            onToggle={this.fncHandleChangeEnable}
                            labelPosition="right"/>

                        <span style={{float:'left', width:'auto', marginRight:'2%'}} >Level: </span>
                        <RadioButtonGroup onChange={(event,value)=>this.fncHandleChangeAdminLevel(event,value)}
                                          style={{'width':'40%','float':'left'}}
                                          name="rb_profile_level" defaultSelected="DEVELOPER">

                             <RadioButton
                                 value="ADMIN"
                                 label="ADMIN"
                                 style={{float:'left', width:'auto'}}
                             />
                             <RadioButton
                                 value="DEVELOPER"
                                 label="DEVELOPER"
                                 style={{float:'left', width:'auto', marginLeft:'4%'}}
                             />
                        </RadioButtonGroup>
                    </div>

                    <TextField
                        hintText="Name of user"
                        floatingLabelText="Name"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'name')}
                        value={this.state.profile.name}/>
                    <TextField
                        hintText="Email of user"
                        floatingLabelText="Email"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.email}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'email')}
                        value={this.state.profile.email}/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.password}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'password')}
                        value={this.state.profile.password}/>

                </Dialog>

            </div>
        );
    };
}

export default NewProfile;