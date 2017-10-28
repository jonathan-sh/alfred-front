import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CrudAplication from './CrudApplication';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import PubSub from 'pubsub-js';
import applicationService from '../../../service/repository/ApplicationService';
import data from '../../../service/treats/TreatsData';
import GetResponseYesNo from '../../../service/component/GetResponseYesNoService';
import TextField from 'material-ui/TextField';


class TableFind extends Component {

    constructor()
    {
        super();
        this.state = { rows: [], applications: []};
    };

    componentDidMount()
    {
        this.fncGetApplications();
        PubSub.subscribe('table-update-applications', this.fncGetApplications);
    };

    fncGetApplications = () =>
    {
        applicationService.getAll()
                          .then(success => this.fncSuccessRequest(success))
                          .catch(error => console.log(error));
    };

    fncSuccessRequest = (success)=>
    {
        this.setState({applications: success});
        this.fncMakeRows(success);
    };

    fncMakeRows = (applications) =>
    {
        let rows = applications.map((application, index) =>
            <TableRow key={index}>
                <TableRowColumn>{data.notNull(application.name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(application.type)}</TableRowColumn>
                <TableRowColumn>{application.status ? 'active' : 'deactivated'}</TableRowColumn>
                <TableRowColumn>
                    <div style={{display:'inline-flex'}}>

                        <CrudAplication
                            application={application}
                            btLabel={"Edit"}
                            btBackgroundColor={'#00a1fc'}
                            btIcon={<EditIco color='#FFF'/>}
                        />

                        <GetResponseYesNo
                            question={"You really want delete this application ? ("+application.name+")"}
                            fncOnYesCase={() => applicationService.delete(application).then(this.fncGetApplications)}
                            btLabel={"delete"}
                            btBackgroundColor={"#ff2930"}
                            btIcon={<DeleteIco color="#fff"/>}
                            btStyle={{marginLeft: '3%'}}
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
    };

    render()
    {
        return (

            <div>
                <TextField
                    hintText="Search application"
                    floatingLabelText="Search"
                    type="text"
                    fullWidth={true}
                    style={{marginBottom:'20px'}}
                    ref={(input) => this.search = input}/>
                <br/>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Type</TableHeaderColumn>
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

            </div>

        )
    }
}

export default TableFind;
