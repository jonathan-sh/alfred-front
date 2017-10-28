import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import BuildIco from 'material-ui/svg-icons/content/reply-all';

class BuildModal extends Component {

    constructor()
    {
        super();
        this.state ={open: false };
    };

    fncHandleClose = () => this.setState({open:false});

    fncHandleOpen =  () => this.setState({open: true});

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



                </Dialog>

            </div>
        );
    };
}

export default BuildModal;