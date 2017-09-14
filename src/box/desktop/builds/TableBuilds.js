import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';


class TableBuilds extends Component {


    constructor() {
        super();
        this.state = {rows: [], builds: [],};
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
        this.httpService.get('/build', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(success => {
                this.setState({builds: success})
                this.fncMakeRows();
            })
            .catch(error => {
                this.setState({msg: error.message});
            });

    };

    fncMakeRows = () => {
        let rows = this.state.builds.map((build) =>
            <TableRow key={build._id}>
                <TableRowColumn>{build.server.name}</TableRowColumn>
                <TableRowColumn>{build.application}</TableRowColumn>
                <TableRowColumn>{build.branch}</TableRowColumn>
                <TableRowColumn>{build.order}</TableRowColumn>
                <TableRowColumn>{this.treatsDate(build.dateTime)}</TableRowColumn>
                <TableRowColumn>{build.status}</TableRowColumn>
                <TableRowColumn>{build.details}</TableRowColumn>
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
                            <TableHeaderColumn>Server name</TableHeaderColumn>
                            <TableHeaderColumn>Application</TableHeaderColumn>
                            <TableHeaderColumn>Branch</TableHeaderColumn>
                            <TableHeaderColumn>Order</TableHeaderColumn>
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

export default TableBuilds;
