import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import TableProfile from './TableProfile';
import CrudProfile from './CrudProfile';
import NewIco from 'material-ui/svg-icons/content/add';

class Profile extends Component {

    componentWillMount()
    {
        PubSub.publish('header-label', 'Profiles');
    };

    render()
    {
        return (
            <div>
                <br/>
                <br/>
                <CrudProfile
                    profile={null}
                    btLabel={"New"}
                    btBackgroundColor={'#0ac752'}
                    btIcon={<NewIco color='#FFF'/>}
                    btStyle={{width:'100%'}}
                />
                <TableProfile/>
            </div>
        )
    };
}

export default Profile;
