import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import LogoutIco from 'material-ui/svg-icons/navigation/arrow-forward';
import FlatButton from 'material-ui/FlatButton';
import profileService from '../../../service/repository/ProfileService';
import history from '../../../service/router/History';
import PubSub from 'pubsub-js';

class HeaderBar extends Component {

    constructor() {
        super();
        this.state = {label: ''};
        PubSub.subscribe('header-label', this.fncChangeHeaderLabel);
    };

    fncChangeHeaderLabel = (key, label) => {
        this.setState({'label': label});
    };

    fncLogOut = () => {
        localStorage.removeItem('auth-token');
        history.push('/');
    };

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

                                <FlatButton rippleColor="#fff"
                                            disabled={true}
                                            hoverColor="#43bdd4"
                                            style={{color: "#fff", marginTop: "5px"}}
                                            label={profileService.getName()}
                                            secondary={false}
                                />

                                <FlatButton rippleColor="#fff"
                                            hoverColor="#43bdd4"
                                            icon={<LogoutIco color="#fff"/>}
                                            style={{color: "#fff", marginTop: "5px"}}
                                            onClick={() => {this.fncLogOut()}}
                                />


                            </custom>
                        }
                />
            </div>
        )
    };
}

export default HeaderBar;
