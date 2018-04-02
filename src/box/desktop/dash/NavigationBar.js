import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ProfileIco from 'material-ui/svg-icons/action/perm-identity';
import MachineIco from 'material-ui/svg-icons/hardware/dock';
import BuildIco from 'material-ui/svg-icons/action/build';
import WebHooksIco from 'material-ui/svg-icons/file/cloud-download';
import AnalyticIco from 'material-ui/svg-icons/action/trending-up';
import ApplicationIco from 'material-ui/svg-icons/navigation/apps';
import {Link} from 'react-router-dom';

class NavigationBar extends Component 
{
    render()
    {
        return (
            <div>
                <Drawer open={true} width={200}>
                    <AppBar
                        title="Alfred"
                        showMenuIconButton={false}
                    />
                    <Link to={'/alfred/profile'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Profile"
                            leftIcon={<ProfileIco  />}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/application'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Applications"
                            leftIcon={<ApplicationIco  />}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/machine'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Machines"
                            leftIcon={<MachineIco/>}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/webhook'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Hooks"
                            leftIcon={<WebHooksIco/>}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/build'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Builds"
                            leftIcon={<BuildIco/>}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/analytical'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Analytics"
                            leftIcon={<AnalyticIco  />}
                        />
                    </Link>
                    <Divider />
                </Drawer>
            </div>
        );
    }
}

export default NavigationBar;
