import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class Report extends Component {

    state = {  open: true, };

    handleOpen = () => this.setState({open: true});

    handleClose = () => this.setState({open: false});

    render() {
        const actions =
        [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Build report :"
                    titleStyle={{borderBottom:'1px solid #c4c4c4'}}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >

                    <div style={{fontSize:'20px', fontFamily:'monospace'}}>
                        {this.props.logText}
                    </div>

                </Dialog>
            </div>
        );
    }
}
export default Report;