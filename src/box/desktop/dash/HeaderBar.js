import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LogoutIco from 'material-ui/svg-icons/navigation/arrow-forward';
import history from '../../../service/router/History';
import PubSub from 'pubsub-js';

class HeaderBar extends Component
{

    constructor()
    {
        super();
        this.state = {label:''};
        PubSub.subscribe('header-label', this.fncChangeHeaderLabel);
    };

    fncChangeHeaderLabel = (key, label)=>
    {
        this.setState({'label':label});
    };

    fncLogOut = () =>
    {
        localStorage.removeItem('auth-token');
        history.push('/');
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
                        <IconButton tooltip="Out" onTouchTap={this.fncLogOut}>
                            <LogoutIco/>
                        </IconButton>
                    }
                />
            </div>
        )
    };
}

export default HeaderBar;
