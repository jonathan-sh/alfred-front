import React from "react";
import HeaderBar from './HeaderBar';
import NavigationBar from './NavigationBar';
import '../../../style/css/desktop/dash.css';
import Routers from './../../../service/router/Routers';

const Dash = (props) => 
{
    const dash = Routers.get(props.match.params.way);

    if (!dash) 
    {
        return <div><h1>404 Not Found</h1></div>
    }

    return (
        <div>
            <HeaderBar />
            <NavigationBar />
            <div className="content-child center padding-left-200">
                <dash.item />
            </div>
        </div>
    );
}

export default Dash;


