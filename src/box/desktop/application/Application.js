import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import NewIco from 'material-ui/svg-icons/content/add';
import CrudApplication from './CrudApplication';
import TableApplication from './TableApplication';

class Application extends Component {

    componentWillMount()
    {
        PubSub.publish('header-label', 'Applications');
    };

    styles =
    {
        inputText: {width: '72%'},
        btn: {width: '26%', marginLeft: '2%'}
    };

    render()
    {
        return (
            <div>
                <br/>
                <br/>
                <CrudApplication
                    profile={null}
                    btLabel={"New"}
                    btBackgroundColor={'#0ac752'}
                    btIcon={<NewIco color='#FFF'/>}
                    btStyle={{width:'100%'}}
                />
                <TableApplication/>
            </div>
        )
    };
}


export default Application;
