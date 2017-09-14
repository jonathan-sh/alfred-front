import React, {Component} from 'react';
import httpService from './../../../service/HttpService';
import PubSub from 'pubsub-js';
import FindIco from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import NewIco from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TableProfile from './TableProfile';
import CrudProfile from './CrudProfile';

class Profile extends Component {
    constructor() {
        super();
        this.httpService = new httpService();
    };

    componentWillMount() {
        PubSub.publish('header-label', 'Profiles');
    };


    fncCrudUser = (profile) =>{
        PubSub.publish('show-crud-profile', profile);
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
                        onTouchTap={() => this.fncCrudUser(null)}
                        labelStyle={{color: 'white'}}/>
                </span>
                <br/>
                <br/>
                <TableProfile/>

                <CrudProfile/>

            </div>
        )
    }
}

export default Profile;
