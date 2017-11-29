import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import GetResponseYesNo from '../../../service/component/GetResponseYesNoService';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import CrudProfile from './CrudProfile';
import data from '../../../service/treats/TreatsData';
import profileService from '../../../service/repository/ProfileService';

class TableFind extends Component {

    constructor()
    {
        super();
        this.state = {rows: [], profiles: [],};
    };

    componentDidMount()
    {
        this.fncGetProfiles();
        PubSub.subscribe('table-update-profiles', this.fncGetProfiles);
    };

    fncGetProfiles = () =>
    {
        profileService.getAll()
                      .then(success => this.fncMakeRows(success))
                      .catch(error =>  console.log(error));
    };

    fncMakeRows = (profiles) =>
    {
        let rows = profiles.map((profile,index) =>
            <TableRow key={index}>
                <TableRowColumn>{data.notNull(profile.name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(profile.email)}</TableRowColumn>
                <TableRowColumn>{profile.status ? 'active' : 'deactivated'}</TableRowColumn>
                <TableRowColumn>
                    <div style={{display:'inline-flex'}}>
                        <CrudProfile
                            profile={profile}
                            btLabel={"Edit"}
                            btBackgroundColor={'#00a1fc'}
                            btIcon={<EditIco color='#FFF'/>}
                        />
                        <GetResponseYesNo
                            question={"You really want delete this profile ? ("+profile.email+")"}
                            fncOnYesCase={() => profileService.delete(profile).then(this.fncGetProfiles)}
                            btLabel={"delete"}
                            btBackgroundColor={"#ff2930"}
                            btIcon={<DeleteIco color="#fff"/>}
                            btStyle={{marginLeft: '5%'}}
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
        return(
            <div>
                <TextField
                    hintText="Search user"
                    floatingLabelText="Search"
                    type="text"
                    fullWidth={true}
                    style={{marginBottom:'20px'}}
                    ref={(input) => this.search = input}/>
                <br/>
                <Table>
                    <TableHeader
                        fixedHeader={true}
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
    };
}

export default TableFind;
