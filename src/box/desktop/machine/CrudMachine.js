import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import machineService from '../../../service/repository/MachineService';
import applicationService from '../../../service/repository/ApplicationService';
import _ from 'lodash';

class NewProfile extends Component {

    constructor(props)
    {
        super(props);
        this.isUpdate = false;
        this.state = {
            open: false,
            makeSave: false,
            errorText: {
                name: '',
                ip: '',
                branch: ''
            },
            machine: {
                _id: null,
                name: '',
                ip: '',
                branch: '',
                status: false
            },
            applications:[],
            rows:[]
        };

    };

    componentWillMount()
    {
        this.fncGetApplications();
        if(this.props.machine && this.props.machine._id)
        {
            this.setState({'machine':  this.props.machine});
            this.label = 'Update machine';
            this.isUpdate = true;
        }
    };

    fncGetApplications = () =>
    {
        applicationService.getAll()
                          .then(success => this.fncSuccessGetApplications(success))
                          .catch(error => console.log(error));
    };

    fncSuccessGetApplications = (success)=>
    {
        this.setState({applications: success});
        this.fncMakeRows(success);
    };

    fncMakeRows = (applications) =>
    {
        let rows = applications.map((application, index) =>

            <TableRow key={index}>
                <TableRowColumn>{application.name}</TableRowColumn>
                <TableRowColumn>{application.name}</TableRowColumn>
            </TableRow>

        );

        this.setState({'rows': rows});
    };

    makeSave = () =>
    {
        if (this.fncValidData())
        {
           this.setState({makeSave: true});

           machineService.save(this.state.machine)
                         .then(success => this.fncSuccessRequest())
                         .catch(error => console.log(error));
        }
    };

    makeUpdate = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});

            machineService.update(this.state.machine)
                          .then(success => this.fncSuccessRequest())
                          .catch(error => console.log(error));
        }
    };

    fncValidData = () =>
    {
        let status = true;
        let machine = this.state.machine;

        let errorText = {
            name: '',
            ip: '',
            branch: ''
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

    fncValidValue = (value) =>
    {
        return value !== undefined && value !== ""
    };

    fncSuccessRequest = () =>
    {
        if (!this.isUpdate)
        {
            this.setState({machine: {_id: null, name: '', ip: '', branch: '', status: false, applications:[]}});
            this.setState({errorText:{name: '', ip: '', branch: ''}});
        }
        this.setState({makeSave: false});
        this.fncHandleClose();
        PubSub.publish('table-update-machines', true);
    };

    fncSetData = (event, value, attribute) =>
    {
        let machine = this.state.machine;
        machine[attribute] = value;
        this.setState(machine);
    };

    fncHandleChangeStatus = () =>
    {
        let machine = this.state.machine;
        machine['status'] = !this.state.machine.status;
        this.setState(machine);
    };

    fncHandleClose = () => this.setState({open: false});

    fncHandleOpen = () =>  this.setState({open: true});

    tableStyle =
    {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: false,
            deselectOnClickaway: false,
            showCheckboxes: true,
            height: '200px',
    };

    render() {

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
                    title='Crud machine'
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave ? <LinearProgress mode="indeterminate"/> : null}


                    <Toggle
                        label="Machine is active"
                        defaultToggled={this.state.machine.status}
                        onToggle={this.fncHandleChangeStatus}
                        labelPosition="right"/>
                    <br/>

                    <TextField
                        hintText="Name of machine server"
                        floatingLabelText="Name machine"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'name')}
                        value={this.state.machine.name}/>
                    <TextField
                        hintText="IP: 192.168.10.1"
                        floatingLabelText="IP"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.ip}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'ip')}
                        value={this.state.machine.ip}/>
                    <TextField
                        hintText="my branch"
                        floatingLabelText="Branch"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.branch}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'branch')}
                        value={this.state.machine.branch}/>


                    <div>

                        <Table
                            height={this.tableStyle.height}
                            fixedHeader={this.tableStyle.fixedHeader}
                            fixedFooter={this.tableStyle.fixedFooter}
                            selectable={this.tableStyle.selectable}
                            multiSelectable={this.tableStyle.multiSelectable}>
                            <TableHeader
                                displaySelectAll={this.tableStyle.showCheckboxes}
                                adjustForCheckbox={this.tableStyle.showCheckboxes}
                                enableSelectAll={this.tableStyle.enableSelectAll}>

                                <TableRow>
                                    <TableHeaderColumn colSpan="2" tooltip="Applications" style={{textAlign: 'center'}}>
                                        Applications
                                    </TableHeaderColumn>
                                </TableRow>

                                <TableRow>
                                    <TableHeaderColumn tooltip="Application name">Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Application type">Type</TableHeaderColumn>
                                </TableRow>

                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.tableStyle.showCheckboxes}
                                deselectOnClickaway={this.tableStyle.deselectOnClickaway}
                                showRowHover={this.tableStyle.showRowHover}
                                stripedRows={this.tableStyle.stripedRows}>

                                {this.state.rows}

                            </TableBody>
                        </Table>

                    </div>


                </Dialog>

            </div>
        );
    };
}

export default NewProfile;