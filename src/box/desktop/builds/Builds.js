import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import TableBuilds from './TableBuilds';

class Builds extends Component {
    componentWillMount()
    {
        PubSub.publish('header-label', 'Builds');
    };

    render()
    {
        return (
            <div>
                <TableBuilds/>
            </div>
        )
    };
}

export default Builds;
