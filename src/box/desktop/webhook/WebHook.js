import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import TableWebHook from './TableWebHook';

class WebHook extends Component {

    componentWillMount()
    {
        PubSub.publish('header-label', 'Web Hooks');
    };

    render()
    {
        return (
            <div>
                <TableWebHook/>
            </div>
        )
    };
}
export default WebHook;
