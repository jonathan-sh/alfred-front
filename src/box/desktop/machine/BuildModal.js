import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BuildIco from 'material-ui/svg-icons/content/reply-all';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import applicationService from '../../../service/repository/ApplicationService';
import profileService from '../../../service/repository/ProfileService';
import _ from 'lodash';
import HttpService from "../../../service/http/HttpService";
import LinearProgress from 'material-ui/LinearProgress';


class BuildModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            count:0,
            calls:0
        };
        this.enabled = (props.enabled) ? props.enabled : [];
        this.selected = [];
        this.state = {open: false, applications: []};

    };

    componentDidMount() {
        this.fncGetApplications();
    }

    fncGetApplications = () => {
        applicationService.getAll()
            .then(success => this.fncSuccessGetApplications(success))
            .catch(error => console.log(error));
    };

    fncSuccessGetApplications = (success) => {
        let all = success;
        let enable = [];
        _.forEach(all, (item) => {
            _.forEach(this.enabled, (o) => {
                if (o === item._id) {
                    enable.push(item);
                }
            });
        });
        this.setState({applications: enable});
        this.fncMakeRows(enable);
    };

    fncMakeRows = (applications) => {
        let rows = applications.map((application, index) =>

            <TableRow key={index} id={application._id}
                      selected={this.fncIsRowSelected(application._id)}>
                <TableRowColumn>{application.name}</TableRowColumn>
                <TableRowColumn>{application.type}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    fncIsRowSelected = (id) => {
        return _.filter(this.selected, (item) => {
            return item === id
        }).length > 0;
    };


    fncRowSelected = (item) => {

        let id = this.state.rows[item].props.id;

        if (this.selected.length === 0 || !this.fncIsRowSelected(id)) {
            this.selected.push(id);
        }
        else {
            this.selected = _.filter(this.selected, (item) => {
                return item !== id
            });
        }

        this.fncMakeRows(this.state.applications);
    };

    fncHandleClose = () => this.setState({open: false});

    fncHandleOpen = () => this.setState({open: true});

    progress(completed) {
        if (completed >= 100)
        {
            this.setState({'completed': 100});
            this.fncHandleClose();
        }
        else
        {
            this.setState({'completed':completed});
        }
    }

    fncMakeBuild = () => {
        this.setState({'calls': this.selected.length});
        this.setState({'count': 0});
        _.forEach(this.selected, (o) =>
        {
            let app = _.filter(this.state.applications, (f) => {return f._id === o})[0];
            let webhooks =
            {
                ref: (this.branch.input.value) ? this.branch.input.value : "not declared",
                after: "build-manual",
                head_commit: {
                    message: "Manual build . Started by " + profileService.getName(),
                    url: "build-manual"
                },
                repository: {
                    name: app.name,
                    full_name: app.name
                },
                pusher: {
                    name: profileService.getName(),
                    email: profileService.getEmail()
                }
            };

            HttpService.make().post('/web-hook', webhooks)
                              .then(success => { console.log(success);})
                              .catch(error => {console.log(error);})
                              .finally(() =>
                              {
                                  this.setState({'count':this.state.count+1});
                                  this.progress((100*this.state.count)/this.state.calls)
                              });

        });
    };

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
                    label={'Shoot'}
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    onTouchTap={this.fncMakeBuild}
                    style={{float: 'right', marginRight: '10px'}}/>
                ,
            ];

        return (
            <div>
                <RaisedButton
                    label={'build'}
                    backgroundColor={'#dd2864'}
                    icon={<BuildIco color='#FFF'/>}
                    style={{marginRight: '0'}}
                    onTouchTap={this.fncHandleOpen}
                    labelStyle={{color: 'white'}}/>

                <Dialog
                    title={"Start build manually "}
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>

                    <TextField
                        hintText="Name of branch"
                        floatingLabelText="Branch"
                        type="text"
                        fullWidth={true}
                        ref={(input) => this.branch = input}/>

                    <Table
                        height={this.tableStyle.height}
                        fixedHeader={this.tableStyle.fixedHeader}
                        fixedFooter={this.tableStyle.fixedFooter}
                        selectable={this.tableStyle.selectable}
                        multiSelectable={this.tableStyle.multiSelectable}
                        onCellClick={(item) => {
                            this.fncRowSelected(item);
                        }}>
                        <TableHeader
                            displaySelectAll={this.tableStyle.showCheckboxes}
                            adjustForCheckbox={this.tableStyle.showCheckboxes}
                            enableSelectAll={this.tableStyle.enableSelectAll}>

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
                    {
                        (this.state.calls>0)?
                        <div>
                            <LinearProgress mode="indeterminate"/>
                            <h3 style={{textAlign:'center'}}>{this.state.count}/{this.state.calls}</h3>
                        </div>
                        :
                        null
                    }
                </Dialog>

            </div>
        );
    };
}

export default BuildModal;