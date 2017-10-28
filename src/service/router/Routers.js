import AlfredProfile from '../../box/desktop/profile/Profile';
import AlfredMachines from '../../box/desktop/machine/Machine';
import AlfredBuilds from '../../box/desktop/builds/Builds';
import AlfredWebhooks from '../../box/desktop/webhook/WebHook';
import AlfredAnalytical from '../../box/desktop/analytical/Analytical';
import AlfredApplication from '../../box/desktop/application/Application';

const DashRoute = 
{
    dash:
    [
        { uri: "profile", item: AlfredProfile },
        { uri: "application", item: AlfredApplication },
        { uri: "hooks", item: AlfredWebhooks },
        { uri: "machines", item: AlfredMachines },
        { uri: "builds", item: AlfredBuilds },
        { uri: "analytical", item: AlfredAnalytical }
    ],
    all: function() { return this.dash },
    get: function(way)
    {
        const Route = route => route.uri === way
        return this.dash.find(Route)
    }
}

export default DashRoute