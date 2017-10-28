import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';
import PubSub from 'pubsub-js';
import applicationService from '../../../service/repository/ApplicationService';
import _ from 'lodash';

class NewProfile extends Component {

    constructor(props)
    {
        super(props);
        this.isUpdate = false;
        this.state = {
            open: false,
            isUpdate: false,
            makeSave: false,
            errorText: {name: '',type: '' },
            application: { _id: null, name: '', type: '', status: false }
        };

    };

    componentWillMount()
    {
        if(this.props.application && this.props.application._id)
        {
            this.setState({'application':  this.props.application});
            this.label = 'Update application';
            this.isUpdate = true;
        }
    };

    makeSave = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});

            applicationService.save(this.state.application)
                              .then(success => this.fncSuccessRequest())
                              .catch(error => console.log(error));
        }
    };

    makeUpdate = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});
            applicationService.update(this.state.application)
                              .then(success => this.fncSuccessRequest())
                              .catch(error => console.log(error));
        }
    };

    fncValidData = () =>
    {
        let status = true;
        let application = this.state.application;

        let errorText = {
            name: '',
            type: ''
        };

        this.setState({'errorText': errorText});

        _.forEach(application, (value, key) => {
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
            this.setState({application: {_id: null, name: '', type: '', status: false}});
            this.setState({errorText:{name: '', type: ''}});
        }
        this.setState({makeSave: false});
        this.fncHandleClose();
        PubSub.publish('table-update-applications', true);
    };

    fncSetData = (event, value, attribute) =>
    {
        let application = this.state.application;
        application[attribute] = value;
        this.setState(application);
    };

    fncHandleChangeStatus = () =>
    {
        let application = this.state.application;

        application['status'] = !this.state.application.status;
        this.setState(application);
    };

    fncHandleClose = () => this.setState({open: false});

    fncHandleOpen = () =>  this.setState({open: true});

    render()
    {

        let actions =
        [
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
                    title='Crud application'
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave ? <LinearProgress mode="indeterminate"/> : null}


                    <Toggle
                        label="Application is active"
                        defaultToggled={this.state.application.status}
                        onToggle={this.fncHandleChangeStatus}
                        labelPosition="right"/>
                    <br/>

                    <TextField
                        hintText="Name of application server"
                        floatingLabelText="Name application"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'name')}
                        value={this.state.application.name}/>
                    <TextField
                        hintText="(jar or war)"
                        floatingLabelText="Type"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.type}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'type')}
                        value={this.state.application.type}/>

                </Dialog>

            </div>
        );
    };
}

export default NewProfile;