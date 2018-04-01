import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import BuildService from '../../../service/service/BuildService';
import Avatar from 'material-ui/Avatar';
import Log from 'material-ui/svg-icons/action/description';
import data from '../../../service/treats/TreatsData';
import _ from 'lodash';


class TableBuilds extends Component {


    constructor() 
    {
        super();
        this.state = {rows: [], builds: [],};
    }

    componentDidMount()
    {
        this.fncGetBuilds();
    }

    fncGetBuilds = () =>
    {
        BuildService.getAll()
                    .then(success =>this.fncSuccessRequest(success.builds))
                    .catch(error => console.log(error));

    };

    fncSuccessRequest = (builds) =>
    {
        this.setState({builds: builds});
        this.fncMakeRows(builds);
    };

    fncMakeRows = (builds) =>
    {

        builds = _.reverse(_.sortBy(builds, ['id_friendly']));

        let rows = builds.map((build) =>

            <TableRow key={build.id}>
                <TableRowColumn style={this.styles.numberRow}>{data.notNull(data.notNull(build.id_friendly))}</TableRowColumn>
                <TableHeaderColumn style={this.styles.nameRow}>
                    <Avatar
                        src={build.gitHubWh.sender.avatar_url}
                        size={30}
                        style={{margin: 5}}
                        data-toggle="tooltip" title={build.gitHubWh.sender.login}
                    />

                </TableHeaderColumn>
                <TableRowColumn>{data.notNull(data.notNull(build.slave).name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(data.notNull(build.application).name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(build.branch)}</TableRowColumn>
                <TableRowColumn style={this.styles.logRow}>
                    <a href={"http://127.0.0.1:4212/v1/build/log/"+ build.id} target="_blank">
                        <Log  color={(build.status==='FAIL')? "#ff2930":"#a9a9a9"} hoverColor={"#000"}  />
                    </a>
                </TableRowColumn>
                <TableRowColumn style={this.styles.dateTimeRow}>{data.toDateString(build.start)}</TableRowColumn>
                <TableRowColumn style={this.styles.dateTimeRow}>{data.toDateString(build.finish)}</TableRowColumn>
                <TableRowColumn>{data.notNull(build.status, )}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
        numberRow: {width: '20px'},
        logRow: {width: '30px'},
        nameRow: {width: '20px'},
        dateTimeRow: {width: '100px'},
    };

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn style={this.styles.numberRow}>Nº</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.nameRow}>Sender</TableHeaderColumn>
                            <TableHeaderColumn>Server name</TableHeaderColumn>
                            <TableHeaderColumn>Application</TableHeaderColumn>
                            <TableHeaderColumn>Branch</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.logRow}>Log</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.dateTimeRow}>Start</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.dateTimeRow}>Stop</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
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
