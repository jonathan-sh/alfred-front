import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LogoutIco from 'material-ui/svg-icons/navigation/arrow-forward';
import history from '../../../service/router/History';
import PubSub from 'pubsub-js';

class HeaderBar extends Component
{
    logOut = () =>
    {
       localStorage.removeItem('auth-token');
       history.push('/');
    };

    constructor() {
        super();
        this.state = {label:''};
        PubSub.subscribe('header-label', this.fncChangeHeaderLabel);
    }

    fncChangeHeaderLabel = (key, label)=> {
        this.setState({'label':label});
    };

    render()
    {
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    style={{paddingLeft:'220px'}}
                    title={this.state.label}
                    iconElementRight=
                    {
                        <IconButton tooltip="Out"
                        onTouchTap={this.logOut}>
                            <LogoutIco/>
                        </IconButton>
                    }
                />
            </div>
        )
    };
}

export default HeaderBar;
