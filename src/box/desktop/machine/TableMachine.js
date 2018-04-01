import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import PubSub from 'pubsub-js';
import CrudMachine from './CrudMachine';
import Build from './BuildModal';
import authService from '../../../service/service/ProfileService';
import GetResponseYesNo from '../../../service/component/GetResponseYesNoService';
import machineService from '../../../service/service/MachineService';
import data from '../../../service/treats/TreatsData';

class TableFind extends Component {

    constructor()
    {
        super();
        this.state = { rows: [], machines: []};
    };

    componentDidMount()
    {
        this.fncGetMachines();
        PubSub.subscribe('table-update-machines', this.fncGetMachines);
    };

    fncGetMachines = () =>
    {
        machineService.getAll()
                      .then(success => this.fncSuccessRequest(success))
                      .catch(error => console.log(error));
    };

    fncSuccessRequest = (success)=>
    {
        this.setState({machines: success.slaves});
        this.fncMakeRows(success.slaves);
    };

    fncMakeRows = (machines) =>
    {

        let rows = machines.map((machine) =>
            <TableRow key={machine.id} >
                <TableRowColumn>{data.notNull(machine.name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(machine.ip)}</TableRowColumn>
                <TableRowColumn>{machine.enable? 'active' : 'deactivated'}</TableRowColumn>
                <TableRowColumn>{data.notNull(machine.level)}</TableRowColumn>
                <TableRowColumn style={this.styles.machineRow}>
                    <div style={{display:'inline-flex'}}>

                        <Build  disabled={!authService.isAdminLevel() && machine.level === 'PRODUCTION'}
                                machine={machine}
                                enabled={machine.applications} />

                        <CrudMachine
                            machine={machine}
                            btLabel={"Edit"}
                            disabled={!authService.isAdminLevel() && machine.level === 'PRODUCTION'}
                            btStyle={{margin: '0 12%'}}
                            btBackgroundColor={'#00a1fc'}
                            btIcon={<EditIco color='#FFF'/>}
                        />

                        <GetResponseYesNo
                            question={"You really want delete this machine ? ("+machine.name+")"}
                            fncOnYesCase={() => machineService.delete(machine.id).then(this.fncGetMachines)}
                            btLabel={"delete"}
                            btBackgroundColor={"#ff2930"}
                            btIcon={<DeleteIco color="#fff"/>}
                            btStyle={{marginLeft: '20%'}}
                            btLabelStyle={{color: '#fff'}}
                            disabled={!authService.isAdminLevel()}
                        />
                    </div>
                </TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    styles =
    {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
        machineRow: {width: '400px'},
    };

    render()
    {
        return (

            <div>
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
                            <TableHeaderColumn>Machine name</TableHeaderColumn>
                            <TableHeaderColumn>IP</TableHeaderColumn>
                            <TableHeaderColumn>Enable</TableHeaderColumn>
                            <TableHeaderColumn>Level</TableHeaderColumn>
                            <TableHeaderColumn style={this.styles.machineRow}>Action</TableHeaderColumn>
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

export default TableFind;
