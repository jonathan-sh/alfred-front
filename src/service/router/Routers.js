import AlfredProfile from '../../box/desktop/profile/Profile';
import AlfredMachines from '../../box/desktop/machine/Machine';
import AlfredBuilds from '../../box/desktop/builds/Builds';
import AlfredWebhooks from '../../box/desktop/webhook/WebHook';
import AlfredNotAccess from '../../box/desktop/error/NotAccess';
import AlfredAnalytical from '../../box/desktop/analytical/Analytical';
import AlfredApplication from '../../box/desktop/application/Application';
import AuthService from '../../service/service/ProfileService';

const DashRoute = 
{
    restricted :['profile','application'],
    dash:
    [
        { uri: "profile", item: AlfredProfile },
        { uri: "application", item: AlfredApplication },
        { uri: "webhook", item: AlfredWebhooks },
        { uri: "machine", item: AlfredMachines },
        { uri: "build", item: AlfredBuilds },
        { uri: "not-access", item: AlfredNotAccess },
        { uri: "analytical", item: AlfredAnalytical }
    ],
    all: function() { return this.dash },
    get: function(way)
    {
        if (this.restricted.find((i) =>i === way) && !AuthService.isAdminLevel())
        {
            console.log("restricted");
            way="not-access";
        }
        const Route = route => route.uri === way;
        return this.dash.find(Route)
    }
};

export default DashRoute