import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class MoreInformation extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = { open: false, };
    }

    handleOpen = () =>  this.setState({open: true});

    handleClose = () => this.setState({open: false});

    render() {
        const actions =
        [
            <FlatButton
                label="Close"
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <FlatButton label="COMMIT-MESSAGE"
                            labelStyle={{padding:'0px',fontSize:'12px', textTransform: 'lowercase'}}
                            primary={true}
                            onClick={this.handleOpen} />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div style={{textAlign:'center'}}>
                        <div style={{fontSize:'20px', fontFamily:'monospace'}}>
                            {this.props.message}
                        </div>
                        <br/>
                        <div style={{marginTop:'10px'}}>
                            <a target="_blank" href={this.props.url} style={{textDecoration:'none', color:'#000'}}> -- COMMIT --</a>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default MoreInformation;