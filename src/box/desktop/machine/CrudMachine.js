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
                ip: ''
            },
            machine: {
                _id: null,
                name: '',
                ip: '',
                status: false
            }
        };

    }

    componentWillMount() {
        PubSub.subscribe('show-crud-machine',this.fillMachineData)
    }

    fillMachineData = (key, machine) => {
        if (machine !== undefined && machine !== null)
        {

            this.setState({'machine': machine, 'isUpdate': true});
        }
        else
        {
            let machineModal ={_id: null, name: '',ip: '', status: false};
            this.setState({'machine': machineModal , 'isUpdate': false, 'makeSave': false});
        }
        this.setState({open: true, makeSave: false});
    };

    fncHandleClose = () => {
        this.setState({open: false});
    };

    makeSave = () => {
        if (this.fncValidData()) {
            this.setState({makeSave: true});
            this.httpService.post('/machine', this.state.machine, localStorage.getItem('auth-token'))
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

    makeUpdate = () => {
        if (this.fncValidData()) {
            this.setState({makeSave: true});

            this.httpService.put('/machine', this.state.machine, localStorage.getItem('auth-token'))
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
        let machine = this.state.machine;

        let errorText = {
            name: '',
            ip: ''
        };

        this.setState({'errorText': errorText});

        _.forEach(machine, (value, key) => {
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
        let machine = this.state.machine;
        machine[attribute] = value;
        this.setState(machine);
    };

    isValid = (obj) => {
        return obj !== undefined && obj !== null;
    };


    handleChangeStatus = () => {
        let machine = this.state.machine;
        machine['status'] = !this.state.machine.status;
        this.setState(machine);
    };

    render() {

        let actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                label={(this.isValid(this.state.machine._id)) ? 'Update' : 'Save'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                onTouchTap={(this.isValid(this.state.machine._id)) ? this.makeUpdate : this.makeSave}
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
                        label="Machine is active"
                        defaultToggled={this.state.machine.status}
                        onToggle={this.handleChangeStatus}
                        labelPosition="right"/>
                    <br/>

                    <TextField
                        hintText="Name of machine server"
                        floatingLabelText="Name machine"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        onChange={(event, value) => this.setData(event, value, 'name')}
                        value={this.state.machine.name}/>
                    <TextField
                        hintText="IP: 192.168.010.001"
                        floatingLabelText="IP"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.ip}
                        fullWidth={true}
                        onChange={(event, value) => this.setData(event, value, 'ip')}
                        value={this.state.machine.ip}/>

                </Dialog>

            </div>
        );
    }
}

export default NewProfile;