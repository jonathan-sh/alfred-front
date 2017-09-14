import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import PubSub from 'pubsub-js';


class TableFind extends Component {


    constructor() {
        super();
        this.state = {rows: [], profiles: [],};
        this.httpService = new httpService();

    }

    componentDidMount() {
        this.fncGetProfiles();
        PubSub.subscribe('table-update-profiles', this.fncGetProfiles);
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    fncCrudUser = (profile) => {
        PubSub.publish('show-crud-profile', profile);
    };

    fncDeleteProfile = (profile) => {
        this.makeDelete(profile);
    };

    fncGetProfiles = () => {
        this.httpService.get('/profile', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(success => {
                this.setState({profiles: success})
                this.fncMakeRows();
            })
            .catch(error => {
                this.setState({msg: error.message});
            });
    };

    makeDelete = (profile) => {
        this.httpService.delete('/profile', profile, localStorage.getItem('auth-token'))
            .then(response => {
                return response;
            })
            .then(success => {
                if (success.status === 200) {
                    this.fncGetProfiles();
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
        let rows = this.state.profiles.map((profile) =>
            <TableRow key={profile._id}>
                <TableRowColumn>{profile.name}</TableRowColumn>
                <TableRowColumn>{profile.email}</TableRowColumn>
                <TableRowColumn>{profile.status ? 'active' : 'deactivated'}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="edit"
                        backgroundColor="#00a1fc"
                        onTouchTap={() => this.fncCrudUser(profile)}
                        icon={<EditIco color="#FFF"/>}
                        labelStyle={{color: 'white'}}/>
                    <RaisedButton
                        label="delete"
                        backgroundColor="#ff2930"
                        onTouchTap={() => this.fncDeleteProfile(profile)}
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
                            <TableHeaderColumn>User name</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
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
