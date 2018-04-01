import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import profileService from '../../../service/service/ProfileService';
import history from '../../../service/router/History';
import PubSub from 'pubsub-js';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ChangePassword from './ChangePassword';
import SettingsIco from 'material-ui/svg-icons/action/settings';

class HeaderBar extends Component {

    constructor() {
        super();
        this.state = {label: '',changePass:false};
        PubSub.subscribe('header-label', this.fncChangeHeaderLabel);
    };

    fncChangeHeaderLabel = (key, label) => {this.setState({'label': label}); };

    fncLogOut = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('profile');
        history.push('/');
    };

    fncOpenChangePass = () => {this.setState({'changePass':true})};

    handleClick = (event) => {
        event.preventDefault();
        this.setState({ open: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => { this.setState({open: false }); };

    render() {
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    style={{paddingLeft: '220px', position: 'fixed'}}
                    title={this.state.label}
                    iconElementRight=
                        {
                            <custom>
                                <div style={{marginTop:'6px'}}>
                                    <FlatButton
                                        onClick={this.handleClick}
                                        style={{color:'#fff'}}
                                        label={profileService.getName()}
                                        icon={<SettingsIco />}
                                    />
                                    <Popover
                                        open={this.state.open}
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        animation={PopoverAnimationVertical}
                                        onRequestClose={this.handleRequestClose}
                                    >
                                        <Menu>
                                            <MenuItem onClick={() => {this.fncOpenChangePass()}} primaryText="Change password" />
                                            <MenuItem onClick={() => {this.fncLogOut()}} primaryText="Logout" />
                                        </Menu>
                                    </Popover>
                                </div>
                            </custom>
                        }
                />
                {(this.state.changePass)? <ChangePassword /> : null}
            </div>
        )
    };
}

export default HeaderBar;
