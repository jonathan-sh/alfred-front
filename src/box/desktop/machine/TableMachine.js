import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import BuildIco from 'material-ui/svg-icons/av/playlist-play';
import PubSub from 'pubsub-js';
import BuildModal from './BuildModal';


class TableFind extends Component {


    constructor() {
        super();
        this.state = { rows: [], machines: []};
        this.httpService = new httpService();

    }

    componentDidMount() {
        this.fncGetMachines();
        PubSub.subscribe('table-update-machines', this.fncGetMachines);
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    fncCrudMachine = (machine) => {
        PubSub.publish('show-crud-machine', machine);
    };

    fncDeleteMachine = (machine) => {
        this.makeDelete(machine);
    };

    fncBuildMachine = (machine) => {
        PubSub.publish('show-build-modal', machine);
    };

    fncGetMachines = () => {
        this.httpService.get('/machine', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(success => {
                this.setState({machines: success})
                this.fncMakeRows();
            })
            .catch(error => {
                this.setState({msg: error.message});
            });
    };

    makeDelete = (machine) => {
        this.httpService.delete('/machine', machine, localStorage.getItem('auth-token'))
            .then(response => {
                return response;
            })
            .then(success => {
                if (success.status === 200) {
                    this.fncGetMachines();
                }
                if (success.status === 446) {
                    alert("error");
                }

            })
            .catch(error => {
                console.log(error)
            });

    };

    fncMakeRows = () => {
        let rows = this.state.machines.map((machine) =>
            <TableRow key={machine._id}>
                <TableRowColumn>{machine.name}</TableRowColumn>
                <TableRowColumn>{machine.ip}</TableRowColumn>
                <TableRowColumn>{machine.status ? 'active' : 'deactivated'}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="build"
                        backgroundColor="#25576f"
                        disabled={!machine.status}
                        onTouchTap={() => this.fncBuildMachine(machine)}
                        icon={<BuildIco color="#FFF"/>}
                        labelStyle={{color: 'white'}}/>
                    <RaisedButton
                        label="edit"
                        backgroundColor="#00a1fc"
                        onTouchTap={() => this.fncCrudMachine(machine)}
                        style={{marginLeft: '3%'}}
                        icon={<EditIco color="#FFF"/>}
                        labelStyle={{color: 'white'}}/>
                    <RaisedButton
                        label="delete"
                        backgroundColor="#ff2930"
                        onTouchTap={() => this.fncDeleteMachine(machine)}
                        icon={<DeleteIco color="#FFF"/>}
                        style={{marginLeft: '3%'}}
                        labelStyle={{color: 'white'}}/>
                </TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
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
                            <TableHeaderColumn>Machine name</TableHeaderColumn>
                            <TableHeaderColumn>IP</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}
                               showRowHover={true}
                               style={this.styles.tableBody}>
                        {this.state.rows}
                    </TableBody>
                </Table>

                <BuildModal/>

            </div>

        )
    }
}

export default TableFind;
