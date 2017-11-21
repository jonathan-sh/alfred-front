import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class MoreInformation extends React.Component {

    constructor(props) {
        super(props);
        this.log="";
        this.state = {open: false,};
    }

    handleOpen = () => this.setState({open: true});

    handleClose = () => this.setState({open: false});

    treatsLog = (log) =>
    {
       try
       {
           this.log = log.split(":;:").map((txt, key) =>
               <div key={key}>
                   <span>{txt}</span>
                   <br></br>
               </div>);
       }
       catch (err)
       {
           return '-';
       }

        return this.log;
    };

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
                            labelStyle={{padding: '0px', fontSize: '12px', textTransform: 'lowercase'}}
                            primary={true}
                            onClick={this.handleOpen}/>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    title={"Build status : "+this.props.status}
                    onRequestClose={this.handleClose}
                >
                    <div>
                        <div style={{fontWeight: '800', textAlign: 'left', fontFamily: 'monospace'}}>
                            Message:
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <a target="_blank" href={this.props.url}
                               style={{
                                   textDecoration: 'none',
                                   color: "rgba(0, 0, 0, 0.6)"
                               }}>
                                <div style={{fontSize: '14px', fontFamily: 'monospace'}}>
                                    {this.props.message}
                                </div>
                            </a>
                        </div>
                        <div style={{fontWeight: '800', textAlign: 'left', fontFamily: 'monospace', marginTop: '10px'}}>
                            Log:
                        </div>
                        <div style={{marginTop: '10px', fontSize: '14px', fontFamily: 'monospace'}}>
                            {this.treatsLog(this.props.log)}
                        </div>


                    </div>
                </Dialog>
            </div>
        );
    }
}

export default MoreInformation;