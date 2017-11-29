import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import BuildService from '../../../service/repository/BuildService';
import TextField from 'material-ui/TextField';
import MoreInformation from '../webhook/MoreInformation'
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
                    .then(success =>this.fncSuccessRequest(success))
                    .catch(error => console.log(error));

    };

    fncSuccessRequest = (builds) =>
    {
        this.setState({builds: builds});
        this.fncMakeRows(builds);
    };

    fncMakeRows = (builds) =>
    {

        builds = _.forEach(builds, (item) => {return item.z = data.toDate(item.start)});

        builds = _.reverse(_.sortBy(builds, ['order']));

        let rows = builds.map((build) =>

            <TableRow key={build._id}>
                <TableRowColumn>{data.notNull(data.notNull(build.machine).name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(data.notNull(build.application).name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(build.branch)}</TableRowColumn>
                <TableRowColumn>
                    <MoreInformation message={data.notNull(build.commit)}
                                     log={data.notNull(build.log)}
                                     status={data.notNull(build.status)}
                                     url={data.notNull(data.notNull(build.commitUrl))}/>
                </TableRowColumn>
                <TableRowColumn>{data.toDateString(build.start)}</TableRowColumn>
                <TableRowColumn>{data.toDateString(build.end)}</TableRowColumn>
                <TableRowColumn>{data.notNull(build.time)}</TableRowColumn>
                <TableRowColumn>{data.notNull(build.status, )}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    render() {
        return (

            <div>

              <span className="display-block">
                  <TextField
                      hintText="Search builds"
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
                            <TableHeaderColumn>Server name</TableHeaderColumn>
                            <TableHeaderColumn>Application</TableHeaderColumn>
                            <TableHeaderColumn>Branch</TableHeaderColumn>
                            <TableHeaderColumn>Commit</TableHeaderColumn>
                            <TableHeaderColumn>Start</TableHeaderColumn>
                            <TableHeaderColumn>End</TableHeaderColumn>
                            <TableHeaderColumn>Time</TableHeaderColumn>
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
