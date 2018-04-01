import React, {Component} from "react";
import PubSub from 'pubsub-js';
import HighCharts from "highcharts";
import AddFunnel from "highcharts/modules/funnel";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import FindIco from 'material-ui/svg-icons/editor/multiline-chart';
import machineService from '../../../service/service/MachineService';

class Analytical extends Component {

    constructor(props)
    {
        super(props);
        this.state = { };
    };

    componentDidMount()
    {
        PubSub.publish('header-label','Analytics');
        this.fncGetMachines();
    };

    fncGetMachines = () =>
    {
        machineService.getAll()
                      .then(success =>
                      {
                          this.setState({machines: success.slaves});
                          this.fncMakeBoxServer();
                      })
                      .catch(error => console.log(error));
    };

    fncMakeBoxServer = () =>
    {
        let servers = this.state.machines.map((server, index) =>
            <MenuItem key={index} value={index} primaryText={server.name} />
        );

        this.setState({'servers': servers});
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


    render()
    {
        return (
            <div>
                <br/>


                <SelectField
                    floatingLabelText="Server"
                    value={this.state.server}
                    style={{width:'64%',marginRight:'4%',float:'left'}}
                    onChange={this.handleChangeServer}
                >
                    {this.state.servers}
                </SelectField>

                <RaisedButton
                    label="BUILD CHARTS"
                    backgroundColor="#ff7500"
                    icon={<FindIco color="#FFF"/>}
                    style={{width: '32%',float:'left', marginTop:'2.5%'}}
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