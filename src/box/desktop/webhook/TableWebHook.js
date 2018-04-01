import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import data from '../../../service/treats/TreatsData';
import webHookService from '../../../service/service/WebHookService';
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
                      .then(success => this.fncSuccessRequest(success.githubwhs))
                      .catch(error => console.log(error));
    };

    fncSuccessRequest = (hooks) =>
    {
        this.setState({hooks: hooks});
        this.fncMakeRows(hooks);
    };

    fncMakeRows = (hooks) =>
    {
        hooks = _.reverse(_.sortBy(hooks, ['id_friendly']));

        let rows = hooks.map((hook) =>


            <TableRow key={hook.id} selectable={false}>
                <TableRowColumn  style={this.styles.numberRow}>{hook.id_friendly}</TableRowColumn>
                <TableHeaderColumn style={this.styles.numberRow}>
                    <Avatar
                        src={hook.sender.avatar_url}
                        size={30}
                        style={{margin: 5}}
                        data-toggle="tooltip" title={hook.sender.login}
                    />

                </TableHeaderColumn>
                <TableRowColumn style={this.styles.eventRow}>{data.notNull(hook.event)}</TableRowColumn>
                <TableRowColumn style={this.styles.eventRow}>{data.notNull(hook.ref)}</TableRowColumn>
                <TableRowColumn style={this.styles.dateRow}>{data.notNull(data.notNull(hook.head_commit).timestamp)}</TableRowColumn>
                <TableRowColumn style={this.styles.statusRow}>{hook.status}</TableRowColumn>
                <TableRowColumn>{this.getErrors(data.notNull(hook.errors))}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});

    };

    getErrors = (errors) =>
    {
        let error ="";
         _.forEach(errors, (item) => {error = error + ' | ' + item});
         return error
    };





    styles =
    {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
        numberRow: {width: '10px'},
        eventRow: {width: '100px'},
        picRow: {width: '10px'},
        nameRow: {width: '100px'},
        dateRow: {width: '180px'},
        statusRow: {width: '100px'},
    };

    render()
    {
        return (

            <div>
                <br/>
                <br/>
                <br/>
                <Table>
                    <TableHeader
                        fixedHeader={true}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn style={this.styles.numberRow}>Nº</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.numberRow}>Sender</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.eventRow}>Event</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.eventRow}>Branch</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.dateRow}>Timestamp</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.statusRow}>Status</TableHeaderColumn>
                            <TableHeaderColumn>Errors</TableHeaderColumn>
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
