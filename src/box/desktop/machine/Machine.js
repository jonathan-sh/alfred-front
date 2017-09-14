import React, {Component} from 'react';
import httpService from './../../../service/HttpService';
import PubSub from 'pubsub-js';
import FindIco from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import NewIco from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import CrudMachine from './CrudMachine';
import TableMachine from './TableMachine';

class Machine extends Component {

    constructor(){
        super();
        this.httpService = new httpService();
    }

    componentWillMount() {
        PubSub.publish('header-label', 'Machines');
    };

    fncCrudMachine = (machine) => {
        PubSub.publish('show-crud-machine', machine);
    };

    styles = {
        inputText: {width: '72%'},
        btn: {width: '12%', marginLeft: '2%'}
    };

    render() {
        return (
            <div>
                <span className="display-block">
                    <TextField
                        hintText="Search user"
                        floatingLabelText="Search"
                        type="text"
                        fullWidth={false}
                        style={this.styles.inputText}
                        ref={(input) => this.search = input}/>
                    <RaisedButton
                        label="Search"
                        backgroundColor="#ff7500"
                        icon={<FindIco color="#FFF"/>}
                        style={this.styles.btn}
                        labelStyle={{color: 'white'}}/>
                    <RaisedButton
                        label={'New'}
                        backgroundColor={'#0ac752'}
                        icon={<NewIco color='#FFF'/>}
                        style={this.styles.btn}
                        onTouchTap={() => this.fncCrudMachine(null)}
                        labelStyle={{color: 'white'}}/>
                </span>
                <br/>
                <br/>
                <TableMachine/>

                <CrudMachine/>

            </div>
        )
    }
}


export default Machine;
