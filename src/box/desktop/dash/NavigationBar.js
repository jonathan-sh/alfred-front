import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AboutIco from 'material-ui/svg-icons/action/perm-identity';
import Marketing from 'material-ui/svg-icons/action/dashboard';
import CourseIco from 'material-ui/svg-icons/social/school';
import WebHooksIco from 'material-ui/svg-icons/social/notifications';
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
                            leftIcon={<AboutIco  />}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/application'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Application"
                            leftIcon={<ApplicationIco  />}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/machines'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Machines"
                            leftIcon={<Marketing/>}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/hooks'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Hooks"
                            leftIcon={<WebHooksIco/>}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/alfred/builds'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Builds"
                            leftIcon={<CourseIco/>}
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
