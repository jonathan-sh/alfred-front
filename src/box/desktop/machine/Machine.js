import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import NewIco from 'material-ui/svg-icons/content/add';
import TableMachine from './TableMachine';
import CrudMachine from './CrudMachine';

class Machine extends Component {

    componentWillMount()
    {
        PubSub.publish('header-label', 'Machines');
    };

    render()
    {
        return (
            <div>
                <br/>
                <br/>
                <CrudMachine
                    machine={null}
                    btLabel={"New"}
                    btBackgroundColor={'#0ac752'}
                    btIcon={<NewIco color='#FFF'/>}
                    btStyle={{width:'100%'}}
                />

                <TableMachine/>
            </div>
        )
    };
}

export default Machine;
