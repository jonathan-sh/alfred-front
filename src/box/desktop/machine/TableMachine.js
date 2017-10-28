import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import CrudMachine from './CrudMachine';
import Build from './BuildModal';
import GetResponseYesNo from '../../../service/component/GetResponseYesNoService';
import machineService from '../../../service/repository/MachineService';
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
        this.setState({machines: success});
        this.fncMakeRows(success);
    };

    fncMakeRows = (machines) =>
    {
        let rows = machines.map((machine) =>
            <TableRow key={machine._id}>
                <TableRowColumn>{data.notNull(machine.name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(machine.ip)}</TableRowColumn>
                <TableRowColumn>{machine.status? 'active' : 'deactivated'}</TableRowColumn>
                <TableRowColumn style={this.styles.machineRow}>
                    <div style={{display:'inline-flex'}}>

                        <Build  machine={machine} />

                        <CrudMachine
                            machine={machine}
                            btLabel={"Edit"}
                            btStyle={{margin: '0 12%'}}
                            btBackgroundColor={'#00a1fc'}
                            btIcon={<EditIco color='#FFF'/>}
                        />

                        <GetResponseYesNo
                            question={"You really want delete this machine ? ("+machine.name+")"}
                            fncOnYesCase={() => machineService.delete(machine).then(this.fncGetMachines)}
                            btLabel={"delete"}
                            btBackgroundColor={"#ff2930"}
                            btIcon={<DeleteIco color="#fff"/>}
                            btStyle={{marginLeft: '20%'}}
                            btLabelStyle={{color: '#fff'}}
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
                <TextField
                    hintText="Search machine"
                    floatingLabelText="Search"
                    type="text"
                    fullWidth={true}
                    style={{marginBottom:'20px'}}
                    ref={(input) => this.search = input}/>
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
