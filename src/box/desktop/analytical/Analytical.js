import React, {Component} from "react";
import PubSub from 'pubsub-js';
import HighCharts from "highcharts";
import AddFunnel from "highcharts/modules/funnel";
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import FindIco from 'material-ui/svg-icons/editor/multiline-chart';
import applicationService from '../../../service/repository/ApplicationService';
import machineService from '../../../service/repository/MachineService';
import httpService from '../../../service/http/HttpService';

class Analytical extends Component {

    constructor(props)
    {
        super(props);
        this.state = { server: 0, application: 0,servers:[], applications:[],  apps:[],series:[], machines:[]};
    };

    componentDidMount()
    {
        PubSub.publish('header-label','Analytics');
        this.fncGetMachines();
        this.fncApplications();
    };
    styles =
    {
        btn: {width: '15%', marginTop: '2%'}
    };


    fncGetMachines = () =>
    {
        machineService.getAll()
                      .then(success =>
                      {
                          this.setState({machines: success});
                          this.fncMakeBoxServer();
                      })
                      .catch(error => console.log(error));
    };


    fncApplications = () =>
    {
        applicationService.getAll()
                          .then(success =>
                          {
                              this.setState({applications: success});
                              this.fncMakeBoxApplication();
                          })
                          .catch(error => console.log(error));

    };

    getSeries = (data) =>
    {
        httpService.make()
                   .post('/build/analytical',data)
                   .then(success =>
                   {
                       this.setState({series: success});
                       this.setChart();
                   })
                   .catch(error => console.log(error));

    };

    setChart = () =>
    {
        AddFunnel(HighCharts);
        HighCharts.chart('chart',{
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Builds history'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color:'black'
                        }
                    }
                }
            },
            series: this.state.series
        });
    };

    handleChangeServer= (event, index, value) => this.setState({server:value});

    handleChangeApplication = (event, index, value) => this.setState({application:value});

    buildChart = () =>
    {
        let appSelected = this.state.application;
        let machineSelected = this.state.server;
        let build = {application:{name:this.state.applications[appSelected].name},
                         machine:{name:this.state.machines[machineSelected].name}};

        this.getSeries(build);
    };


    fncMakeBoxApplication = () =>
    {
        let applications = this.state.applications.map((app,index) =>
            <MenuItem key={index} value={index} primaryText={app.name} />
        );
        this.setState({'apps': applications});
    };

    fncMakeBoxServer = () =>
    {
        let servers = this.state.machines.map((server, index) =>
            <MenuItem key={index} value={index} primaryText={server.name} />
        );

        this.setState({'servers': servers});
    };

    render()
    {
        return (
            <div>
                <br/>


                <SelectField
                    floatingLabelText="Server"
                    value={this.state.server}
                    style={{width:'40%', float:'left', marginRight:'2%'}}
                    onChange={this.handleChangeServer}
                >
                    {this.state.servers}
                </SelectField>

                <SelectField
                    floatingLabelText="Application"
                    value={this.state.application}
                    style={{width:'40%', float:'left', marginRight:'2%'}}
                    onChange={this.handleChangeApplication}
                >
                    {this.state.apps}
                </SelectField>


                <RaisedButton
                    label="BUILD CHART"
                    backgroundColor="#ff7500"
                    icon={<FindIco color="#FFF"/>}
                    style={this.styles.btn}
                    onTouchTap={this.buildChart}
                    labelStyle={{color: 'white'}}/>

                <br/>
                <br/>
                <br/>
                <br/>
                <div id="chart">

                </div>

            </div>
        )
    };
}

export default Analytical;