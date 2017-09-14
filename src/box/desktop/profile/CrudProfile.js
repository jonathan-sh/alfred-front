import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import PubSub from 'pubsub-js';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';

class NewProfile extends Component {

    constructor(props) {
        super(props);
        this.httpService = new httpService();
        this.state = {
            open: false,
            isUpdate: false,
            makeSave: false,
            errorText: {
                name: '',
                email: '',
                level: ''
            },
            profile: {
                _id: null,
                name: '',
                email: '',
                adminLevel: false,
                status: false
            }
        };

    }

    componentWillMount() {
        PubSub.subscribe('show-crud-profile',this.fillProfileData)
    }

    fillProfileData = (key, profile) => {
        if (profile !== undefined && profile !== null)
        {

            this.setState({'profile': profile, 'isUpdate': true});
        }
        else
        {
            let profileModal ={_id: null, name: '',email: '', adminLevel: false, status: false};
            this.setState({'profile': profileModal , 'isUpdate': false, 'makeSave': false});
        }
        this.setState({open: true, makeSave: false});
    };

    fncHandleClose = () => {
        this.setState({open: false});
    };

    makeSave = () => {
        if (this.fncValidData()) {
            this.setState({makeSave: true});
            this.httpService.post('/profile', this.state.profile, localStorage.getItem('auth-token'))
                .then(response => {
                    return response;
                })
                .then(success => {
                    if (success.status === 200) {
                        this.fncHandleClose();
                        PubSub.publish('table-update-profiles', true);
                    }
                    if (success.status === 446) {
                        alert("error");
                    }

                })
                .catch(error => {
                    console.log(error)
                });
        }
    };

    makeUpdate = () => {
        if (this.fncValidData()) {
            this.setState({makeSave: true});

            this.httpService.put('/profile', this.state.profile, localStorage.getItem('auth-token'))
                .then(response => {
                    return response;
                })
                .then(success => {
                    if (success.status === 200) {
                        this.fncHandleClose();
                        PubSub.publish('table-update-machines', true);
                    }
                    if (success.status === 446) {
                        alert("error");
                    }

                })
                .catch(error => {
                    console.log(error)
                });
        }
    };


    fncValidData = () => {
        let status = true;
        let profile = this.state.profile;

        let errorText = {
            name: '',
            email: ''
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

    fncValidValue = (value) => {
        return value !== undefined && value !== ""
    };

    setData = (event, value, attribute) => {
        let profile = this.state.profile;
        profile[attribute] = value;
        this.setState(profile);
    };

    isValid = (obj) => {
        return obj !== undefined && obj !== null;
    };

    handleChangeAdminLevel = () => {
        let profile = this.state.profile;
        profile['adminLevel'] = !this.state.profile.adminLevel;
        this.setState(profile);
    };

    handleChangeStatus = () => {
        let profile = this.state.profile;
        profile['status'] = !this.state.profile.status;
        this.setState(profile);
    };

    render() {

        let actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                label={(this.isValid(this.state.profile._id)) ? 'Update' : 'Save'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                onTouchTap={(this.isValid(this.state.profile._id)) ? this.makeUpdate : this.makeSave}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <Dialog
                    title='Crate a new user'
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave ? <LinearProgress mode="indeterminate"/> : null}


                    <Toggle
                        label="Account is active"
                        defaultToggled={this.state.profile.status}
                        onToggle={this.handleChangeStatus}
                        labelPosition="right"/>
                    <br/>
                    <Toggle
                        label="Account admin level"
                        defaultToggled={this.state.profile.adminLevel}
                        onToggle={this.handleChangeAdminLevel}
                        labelPosition="right"/>
                    <TextField
                        hintText="Name of user"
                        floatingLabelText="Name"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        onChange={(event, value) => this.setData(event, value, 'name')}
                        value={this.state.profile.name}/>
                    <TextField
                        hintText="Email of user"
                        floatingLabelText="Email"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.email}
                        fullWidth={true}
                        onChange={(event, value) => this.setData(event, value, 'email')}
                        value={this.state.profile.email}/>

                </Dialog>

            </div>
        );
    }
}

export default NewProfile;