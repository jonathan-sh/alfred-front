import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import machineService from '../../../service/service/MachineService';
import applicationService from '../../../service/service/ApplicationService';


import _ from 'lodash';

class NewProfile extends Component {

    constructor(props)
    {
        super(props);
        this.isUpdate = false;
        this.state = {
            style:{selectApplication:{fail:{
                                          display: 'block',
                                          background: 'red',
                                          color: 'white',
                                          padding: '5px 5px 5px 5px',
                                          transition: 'all 0.5s',
                                         },
                                     ok:{
                                          display: 'block',
                                          background: 'white',
                                          padding: '5px 5px 5px 0',
                                          transition: 'all 0.5s',
                                     }}},
            open: false,
            makeSave: false,
            errorText: {
                name: '',
                ip: '',
                branches: '',
                key_file: '',
                root_path: '',
                user:''
            },
            machine: {
                id: null,
                name: '',
                ip: '',
                branches: '',
                user: '',
                key_file: '',
                root_path: '',
                enable: true,
                level: 'PRODUCTION',
                applications:[]
            },
            set_level:'PRODUCTION',
            applications:[],
            rows:[]
        };

    };

    componentWillMount()
    {
        this.fncGetApplications();
        if(this.props.machine && this.props.machine.id)
        {
            this.setState({'set_level':  this.props.machine.level});
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
        if(!success.not_found)
        {
            this.setState({applications: success.applications});
            this.fncMakeRows(this.state.applications);
        }
    };

    fncMakeRows = (applications) =>
    {

        let rows = applications.map((application, index) =>

            <TableRow key={index} name={application.name} selected={this.fncIsRowSelected(application.name)}>
                <TableRowColumn>{application.name}</TableRowColumn>
                <TableRowColumn>{application.type}</TableRowColumn>
                <TableRowColumn>{(application.enable)? 'active' : 'deactivated'}</TableRowColumn>
            </TableRow>

        );

        this.setState({'rows': rows});

    };

    fncIsRowSelected = (name) =>
    {
        return _.filter(this.state.machine.applications,(item)=>{return item === name}).length >0;
    };


    fncRowSelected = (item, key) =>
    {
        console.log(this.state.rows[item]);
        let name = this.state.rows[item].props.name;
        let selected = this.state.machine.applications;

        if(selected.length === 0 || !this.fncIsRowSelected(name))
        {
            selected.push(name);
        }
        else
        {
            selected = _.filter(this.state.machine.applications,(item)=>{return item !== name});
        }
        let  machine = this.state.machine;
        machine.applications = selected;
        this.setState({'machine':machine});
        this.fncMakeRows(this.state.applications);
    };

    makeSave = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});

            machineService.save(this.fncGetData(this.state.machine))
                          .then(success => this.fncSuccessRequest())
                          .catch(error => console.log(error));
        }
    };

    makeUpdate = () =>
    {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});
            machineService.update(this.fncGetData(this.state.machine))
                          .then(success => this.fncSuccessRequest())
                          .catch(error => console.log(error));
        }
    };

    fncGetData = (data) =>{
        let found = data;
        found['branches'] = _.split(found.branches, ',');
        return found;
    };


    fncValidData = () =>
    {
        let enable = true;
        let machine = this.state.machine;

        let errorText = {
            name: '',
            ip: '',
            branches: '',
            user:''
        };

        this.setState({'errorText': errorText});

        _.forEach(machine, (value, key) => {
            if (!this.fncValidValue(value)) {
                enable = false;
                errorText[key] = 'this field is required';
            }
        });

        this.setState({'errorText': errorText});

        return enable && this.state.machine.applications[0];

    };

    fncValidValue = (value) =>
    {
        return value !== undefined && value !== ""
    };

    fncSuccessRequest = () =>
    {
        this.setState({makeSave: false});
        this.fncHandleClose();
        window.location.reload();
    };

    fncSetData = (event, value, attribute) =>
    {
        let machine = this.state.machine;
        machine[attribute] = value;
        this.setState({'machine':machine});
    };

    fncHandleChangeEnable = () =>
    {
        let machine = this.state.machine;
        machine['enable'] = !this.state.machine.enable;
        this.setState(machine);
    };
    fncHandleChangeLevel = (event,value) =>
    {
        let machine = this.state.machine;
        machine['level'] =value;
        this.setState({'machine':machine});
    };

    fncHandleClose = () => {
        window.location.reload();
        this.setState({open: false})
    };

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
                    disabled={this.props.disabled}
                    onTouchTap={this.fncHandleOpen}
                    labelStyle={{color: 'white'}}/>

                <Dialog
                    title='Crud machine'
                    actions={actions}
                    style={{'marginTop':'-50px','height':'800px'}}
                    modal={true}
                    autoScrollBodyContent={true}
                    autoDetectWindowHeight={false}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave ? <LinearProgress mode="indeterminate"/> : null}


                    <TextField
                        hintText="ex: ubuntu"
                        floatingLabelText="Name of machine server"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'name')}
                        value={this.state.machine.name}/>


                    <div style={{'width':'100%','height':'22px','paddingTop':'22px'}}>

                        <Toggle
                            style={{'width':'50%','float':'left'}}
                            label="ACTIVATED"
                            defaultToggled={this.state.machine.enable}
                            onToggle={this.fncHandleChangeEnable}
                            labelPosition="right"/>

                        <span style={{float:'left', width:'auto', marginRight:'2%'}} >Level: </span>
                        <RadioButtonGroup onChange={(event,value)=>this.fncHandleChangeLevel(event,value)}
                                          style={{'width':'40%','float':'left'}}
                                          name="rb_level" defaultSelected={this.state.set_level}>

                            <RadioButton
                                value="PRODUCTION"
                                label="PROD"
                                style={{float:'left', width:'auto'}}
                            />
                            <RadioButton
                                value="DEVELOPMENT"
                                label="DEV"
                                style={{float:'left', width:'auto', marginLeft:'4%'}}
                            />
                        </RadioButtonGroup>

                    </div>

                    <TextField
                        hintText="ex: jarvis"
                        floatingLabelText="OS user name"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.user}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'user')}
                        value={this.state.machine.user}/>

                    <TextField
                        hintText="ex: 192.168.10.1"
                        floatingLabelText="IP"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.ip}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'ip')}
                        value={this.state.machine.ip}/>

                    <TextField
                        hintText="ex: /home/user/.ssh/key.pem"
                        floatingLabelText="Key file path"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.key_file}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'key_file')}
                        value={this.state.machine.key_file}/>

                    <TextField
                        hintText="ex: /home/user/alfred"
                        floatingLabelText="Root path"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.root_path}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'root_path')}
                        value={this.state.machine.root_path}/>


                    <TextField
                        hintText="ex: branches-a, branches-b, branches-c"
                        floatingLabelText="brancheses"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.branches}
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'branches')}
                        value={this.state.machine.branches}/>


                    <div>
                        <br/>
                        <span
                        style={(this.state.machine.applications[0])? this.state.style.selectApplication.ok :
                                                                     this.state.style.selectApplication.fail}
                        >Select applications: </span>
                        <br/>
                        <Table
                            height={this.tableStyle.height}
                            fixedHeader={this.tableStyle.fixedHeader}
                            fixedFooter={this.tableStyle.fixedFooter}
                            selectable={this.tableStyle.selectable}
                            multiSelectable={this.tableStyle.multiSelectable}
                            onCellClick ={(item, key) =>{this.fncRowSelected(item, key);}}>
                            <TableHeader
                                displaySelectAll={this.tableStyle.showCheckboxes}
                                adjustForCheckbox={this.tableStyle.showCheckboxes}
                                enableSelectAll={this.tableStyle.enableSelectAll}>

                                <TableRow>
                                    <TableHeaderColumn tooltip="Application name">Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Application type">Type</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Application status">Enable</TableHeaderColumn>
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