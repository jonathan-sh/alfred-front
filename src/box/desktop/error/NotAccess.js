import React, {Component} from "react";
import PubSub from 'pubsub-js';
import WebHooksIco from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import history from "../../../service/router/History";
class NotAccess extends Component {

    componentDidMount()
    {
        PubSub.publish('header-label','');
    };

    render()
    {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <h1 className={"title"}>access denied</h1>
                <br/>
                <br/>
                <div className={"alien"} />
                <br/>
                <br/>
                <br/>
                <FlatButton
                    label="back to builds"
                    onClick={() =>{ history.push('/alfred/build');}}
                    icon={<WebHooksIco/>}
                />
            </div>
        )
    }
}

export default NotAccess;