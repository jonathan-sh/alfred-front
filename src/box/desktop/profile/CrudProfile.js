import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';
import history from '../../../service/router/History';
import profileService from '../../../service/repository/ProfileService';
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
            errorText: {name: '', email: '', level: '', password:''},
            profile:{_id: null, name: '', password: '', email: '', adminLevel: false, status: false}
        };
    };

    componentWillMount()
    {
        if(this.props.isFirstAcess)
        {
            let profile = {_id: null, name: '', email: '', password: '', adminLevel: true, status: true};
            this.setState({'profile': profile});
            this.setState({'open': true});
            this.label = 'First access';
            this.isUpdate = false;
        }

        if(this.props.profile && this.props.profile._id)
        {
            this.setState({'profile':  this.props.profile});
            this.label = 'Update user';
            this.isUpdate = true;
        }
    };

    makeSave = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});
            profileService.save(this.state.profile)
                          .then(success =>
                          {
                              this.fncHandleClose();
                              if(this.props.isFirstAcess)
                              {
                                  history.push('/');
                                  document.location.reload(true);
                              }
                              else
                              {
                                  this.fncSuccessRequest();
                              }

                          })
                          .catch(error => console.log(error));
        }
    };

    makeUpdate = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});

            profileService.update(this.state.profile)
                          .then(success => this.fncSuccessRequest())
                          .catch(error => console.log(error));
        }
    };

    fncValidData = () =>
    {
        let status = true;
        let profile = this.state.profile;

        let errorText = {
            name: '',
            email: '',
            password:''
        };

        this.setState({'errorText': errorText});

        _.forEach(profile, (value, key) => {
            if (!this.fncValidValue(value)) {
                status = false;
                errorText[key] = 'Informe este campo';
            }
        });

        this.setState({'errorText': errorText});

        return status;

    };

    fncValidValue = (value) =>
    {
        return value !== undefined && value !== ""
    };

    fncSuccessRequest = () =>
    {
        if (!this.isUpdate)
        {
            this.setState({profile:{_id: null, name: '', password: '', email: '', adminLevel: false, status: false}});
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

    fncHandleChangeAdminLevel = () =>
    {
        let profile = this.state.profile;
        profile['adminLevel'] = !this.state.profile.adminLevel;
        this.setState(profile);
    };

    fncHandleChangeStatus = () =>
    {
        let profile = this.state.profile;
        profile['status'] = !this.state.profile.status;
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

                    <Toggle
                        label="Account is active"
                        defaultToggled={this.state.profile.status}
                        onToggle={this.fncHandleChangeStatus}
                        labelPosition="right"/>
                    <br/>
                    <Toggle
                        label="Account admin level"
                        defaultToggled={this.state.profile.adminLevel}
                        onToggle={this.fncHandleChangeAdminLevel}
                        labelPosition="right"/>
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