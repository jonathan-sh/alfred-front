import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import PubSub from 'pubsub-js';

class BuildModal extends Component {

    constructor() {
        super();
        this.httpService = new httpService();
        this.state = {
            open: false,building:false, value: 1
        };

    }

    componentDidMount() {
        PubSub.subscribe('show-build-modal', this.fillData);
    }

    fillData = (key, machine) => {
        this.setState({open: true});
        console.log(machine);
    };


    fncHandleClose = () => {
        this.setState({open: false});
    };

    makeBuild = () => {
        this.setState({open: false});
    };

    handleChange = (event, index, value) => this.setState({value});

    render() {

        let actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                label={'Shoot'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                onTouchTap={this.makeBuild}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <Dialog
                    title='Build rotine: '
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>

                    <SelectField
                        floatingLabelText="Application"
                        value={this.state.value}
                        fullWidth={true}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={1} primaryText="sgpa-api" />
                        <MenuItem value={2} primaryText="sgpa-journey-service" />
                        <MenuItem value={3} primaryText="sgpa-data-integration" />
                        <MenuItem value={4} primaryText="sgpa-web-hooks " />
                        <MenuItem value={5} primaryText="sgpa-integration-server" />
                        <MenuItem value={6} primaryText="sgpa-map-api" />
                    </SelectField>

                    <TextField
                        hintText="Branch"
                        floatingLabelText="Branch"
                        type="text"
                        fullWidth={true}
                        ref={(input) => this.search = input}/>




                </Dialog>

            </div>
        );
    }
}

export default BuildModal;