import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class GetResponseYesNoService extends React.Component {
    constructor(props)
    {
        super(props);
        this.state ={ open: false };
    }


    fncHandleOpen = () => {
        this.setState({open: true});
    };

    fncYesCase = () =>
    {
        try {this.props.fncOnYesCase();}
        catch (error){console.log(error);}
        this.fncHandleClose();
    };

    fncNoCase = () =>
    {
        try {this.props.fncOnNoCase();}
        catch (error){console.log(error);}
        this.fncHandleClose();
    };

    fncHandleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions =
            [
                <FlatButton
                    label="Yes"
                    primary={true}
                    onClick={this.fncYesCase}
                />,
                <FlatButton
                    label="No"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.fncNoCase}
                />
            ];

        return (
            <div>
                <RaisedButton
                    label={this.props.btLabel}
                    backgroundColor={this.props.btBackgroundColor}
                    icon={this.props.btIcon}
                    style={this.props.btStyle}
                    disabled={this.props.disabled}
                    labelStyle={this.props.btLabelStyle}
                    onClick={this.fncHandleOpen} />
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.fncHandleClose}>
                    {this.props.question}
                </Dialog>
            </div>
        );
    }
}