import React, {Component} from "react";
import PubSub from 'pubsub-js';
import HighCharts from "highcharts";
import AddFunnel from "highcharts/modules/funnel";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Analytical extends Component {

    constructor(props){
        super(props);
        this.state = {value: 1};
    }

    componentDidMount(){
        PubSub.publish('header-label','Analises');
        PubSub.subscribe('switch-to-crud', this.fncInCrud);
        this.setChart();
    }

    setChart = () =>{
        AddFunnel(HighCharts);
        HighCharts.chart('chart', {

            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },

            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }]

        });
    };

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <div>
                <br/>
                <DropDownMenu value={this.state.value}
                              onChange={this.handleChange}
                              autoWidth={false}
                              style={{width:"50%"}}>
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </DropDownMenu>
                <DropDownMenu value={this.state.value}
                              onChange={this.handleChange}
                              autoWidth={false}
                              style={{width:"50%"}}>
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </DropDownMenu>
                <br/>
                <br/>
                <div id="chart">

                </div>

            </div>
        )
    }
}

export default Analytical;