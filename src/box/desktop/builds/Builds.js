import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import FindIco from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TableBuilds from './TableBuilds';


class Builds extends Component {
    componentWillMount() {
        PubSub.publish('header-label', 'Builds');
    };

    styles = {
        inputText: {width: '73%'},
        btn: {width: '25%', marginLeft: '2%'}
    };

    render() {
        return (
            <div>
                <span className="display-block">
                    <TextField
                        hintText="Search builds"
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
                </span>
                <br/>
                <br/>
                <TableBuilds/>
            </div>
        )
    }
}

export default Builds;
