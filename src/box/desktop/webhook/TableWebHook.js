import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';


class TableWebHook extends Component {


    constructor() {
        super();
        this.state = {rows: [], webhooks: [],};
        this.httpService = new httpService();

    }

    componentDidMount() {
        this.fncWebHooks();
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    fncWebHooks = () => {
        this.httpService.get('/web-hook', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(success => {
                this.setState({webhooks: success})
                this.fncMakeRows();
            })
            .catch(error => {
                this.setState({msg: error.message});
            });
    };

    fncMakeRows = () => {
        let rows = this.state.webhooks.map((webhook) =>
            <TableRow key={webhook._id}>
                <TableRowColumn>{webhook.pusher.name}</TableRowColumn>
                <TableRowColumn>{webhook.event}</TableRowColumn>
                <TableRowColumn>{webhook.ref}</TableRowColumn>
                <TableRowColumn>{webhook.branch}</TableRowColumn>
                <TableRowColumn>{webhook.serverName}</TableRowColumn>
                <TableRowColumn>{this.treatsDate(webhook.dateTime)}</TableRowColumn>
                <TableRowColumn>{webhook.isValid ? 'valid' : 'not-valid'}</TableRowColumn>
                <TableRowColumn>{webhook.details}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    treatsDate = (v) =>{
        return v[2]+'/'+v[1]+'/'+v[0]+' - '+v[3]+':'+v[4];
    };


    render() {
        return (

            <div>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn>Pusher</TableHeaderColumn>
                            <TableHeaderColumn>Event</TableHeaderColumn>
                            <TableHeaderColumn>Branch ref</TableHeaderColumn>
                            <TableHeaderColumn>Branch action</TableHeaderColumn>
                            <TableHeaderColumn>Server name</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Details</TableHeaderColumn>
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
    }
}

export default TableWebHook;
