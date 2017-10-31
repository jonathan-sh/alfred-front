import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import BuildIco from 'material-ui/svg-icons/content/reply-all';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import applicationService from '../../../service/repository/ApplicationService';
import _ from 'lodash';


class BuildModal extends Component {

    constructor(props)
    {
        super(props);
        this.state ={open: false,applications:[],selected:[]};
    };

    componentDidMount()
    {
        this.fncGetApplications();
    }

    fncGetApplications = () =>
    {
        applicationService.getAll()
            .then(success => this.fncSuccessGetApplications(success))
            .catch(error => console.log(error));
    };

    fncSuccessGetApplications = (success)=>
    {
        this.setState({applications: success});
        this.fncMakeRows(success);
    };

    fncMakeRows = (applications) =>
    {
        let rows = applications.map((application, index) =>

            <TableRow key={index} id={application._id} selected={this.fncIsRowSelected(application._id)}>
                <TableRowColumn>{application.name}</TableRowColumn>
                <TableRowColumn>{application.name}</TableRowColumn>
            </TableRow>

        );

        this.setState({'rows': rows});
    };

    fncIsRowSelected = (id) =>
    {
        return _.filter(this.state.selected,(item)=>{return item === id}).length >0;
    };


    fncRowSelected = (item) =>
    {
        let id = this.state.rows[item].props.id;
        let selected = this.state.selected;

        if(selected.length ===0 || !this.fncIsRowSelected(id))
        {
            selected.push(id);
        }
        else
        {
            selected = _.filter(this.state.selected,(item)=>{return item !== id});
        }

        this.setState({'selected':selected});
        this.fncMakeRows(this.state.applications);
    };

    fncHandleClose = () => this.setState({open:false});

    fncHandleOpen =  () => this.setState({open: true});

    tableStyle =
    {
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: true,
        selectable: true,
        multiSelectable: true,
        enableSelectAll: false,
        deselectOnClickaway: false,
        showCheckboxes: true,
        height: '200px',
    };

    render()
    {

        let actions =
        [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                label={'Shoot'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                onTouchTap={this.makeUpdate}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <RaisedButton
                    label={'build'}
                    backgroundColor={'#dd2864'}
                    icon={<BuildIco color='#FFF' />}
                    style={{marginRight: '0'}}
                    onTouchTap={this.fncHandleOpen}
                    labelStyle={{color: 'white'}}/>

                <Dialog
                    title={"Start build manually "}
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>


                    <Table
                        height={this.tableStyle.height}
                        fixedHeader={this.tableStyle.fixedHeader}
                        fixedFooter={this.tableStyle.fixedFooter}
                        selectable={this.tableStyle.selectable}
                        multiSelectable={this.tableStyle.multiSelectable}
                        onCellClick ={(item, key) =>{this.fncRowSelected(item, key);}}>
                        <TableHeader
                            displaySelectAll={this.tableStyle.showCheckboxes}
                            adjustForCheckbox={this.tableStyle.showCheckboxes}
                            enableSelectAll={this.tableStyle.enableSelectAll}>

                            <TableRow>
                                <TableHeaderColumn colSpan="2" tooltip="Applications" style={{textAlign: 'center'}}>
                                    Applications
                                </TableHeaderColumn>
                            </TableRow>

                            <TableRow>
                                <TableHeaderColumn tooltip="Application name">Name</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Application type">Type</TableHeaderColumn>
                            </TableRow>

                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.tableStyle.showCheckboxes}
                            deselectOnClickaway={this.tableStyle.deselectOnClickaway}
                            showRowHover={this.tableStyle.showRowHover}
                            stripedRows={this.tableStyle.stripedRows}>

                            {this.state.rows}

                        </TableBody>
                    </Table>





                </Dialog>

            </div>
        );
    };
}

export default BuildModal;