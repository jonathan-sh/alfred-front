import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import MoreInformation from './MoreInformation';
import data from '../../../service/treats/TreatsData';
import webHookService from '../../../service/repository/WebHookService';
import _ from 'lodash';


class TableWebHook extends Component {

    constructor()
    {
        super();
        this.state = {rows: [], hooks: [],};
    };

    componentDidMount()
    {
        this.fncGetWebHooks();
    };

    fncGetWebHooks = () =>
    {
        webHookService.getAll()
                      .then(success => this.fncSuccessRequest(success))
                      .catch(error => console.log(error));
    };

    fncSuccessRequest = (hooks) =>
    {
        this.setState({hooks: hooks});
        this.fncMakeRows(hooks);
    };

    fncMakeRows = (hooks) =>
    {
        hooks = _.reverse(_.sortBy(hooks, ['order']));

        let rows = hooks.map((hook) =>

            <TableRow key={hook._id} selectable={false}>
                <TableRowColumn>{data.notNull(data.notNull(hook.pusher).name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(hook.event)}</TableRowColumn>
                <TableRowColumn>{data.notNull(hook.ref)}</TableRowColumn>
                <TableRowColumn>
                    <MoreInformation message={data.notNull(data.notNull(hook.head_commit).message)}
                                     url={data.notNull(data.notNull(hook.head_commit).url)}/>
                </TableRowColumn>
                <TableRowColumn>{data.notNull(data.notNull(hook.machine).name)}</TableRowColumn>
                <TableRowColumn style={this.styles.dateRow} >{data.toDateString(hook.dateTime)}</TableRowColumn>
                <TableRowColumn>{hook.isValid ? 'valid' : 'not-valid'}</TableRowColumn>
                <TableRowColumn style={this.styles.detailsRow} >{hook.details}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});

    };




styles =
    {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
        detailsRow: {width: '200px'},
        dateRow: {width: '120px'},
    };

    render()
    {
        return (

            <div>
                <span className="display-block">
                    <TextField
                        hintText="Search webhook"
                        floatingLabelText="Search"
                        type="text"
                        fullWidth={true}
                        style={this.styles.inputText}
                        ref={(input) => this.search = input}/>
                </span>
                <br/>
                <br/>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn>Pusher</TableHeaderColumn>
                            <TableHeaderColumn>Event</TableHeaderColumn>
                            <TableHeaderColumn>Branch</TableHeaderColumn>
                            <TableHeaderColumn>Commit</TableHeaderColumn>
                            <TableHeaderColumn>Server name</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.dateRow}>Date</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.detailsRow} >Cause</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}
                               showRowHover={true}
                               style={this.styles.tableBody}>
                        {this.state.rows}
                    </TableBody>
                </Table>
            </div>

        )
    };
}

export default TableWebHook;
