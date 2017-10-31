import React,{Component} from "react";
import HighCharts from "highcharts";
import HelperChart from "./HelperChart";

class PieChart extends Component
{

    constructor(props)
    {
        super(props);
        this.notDataMessage ='not have data for chart build';
    }

    componentDidMount()
    {
        this.validPropsData();
    }

    validPropsData = () => {
        if(HelperChart.validChartData(this.props.chartData))
        {
            this.buildChart();
        }
        else
        {
            if (this.props.notDataMessage)
            {
                this.notDataMessage = this.props.notDataMessage;
            }
        }
    };

    buildChart = () =>
    {
        HighCharts.chart(this.chartDiv,
            {
                chart:
                    {
                        plotBackgroundColor: this.props.chartData.plotBackgroundColor,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                title:
                    {
                        text:  this.props.chartData.title
                    },
                subtitle: {
                        text:  this.props.chartData.subtitle
                },
                tooltip:
                    {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                plotOptions:
                    {
                        pie:
                            {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels:
                                    {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style:
                                            {
                                                color: 'black'
                                            },
                                        connectorColor: 'silver'
                                    }
                            }
                    },
                series: this.props.chartData.series
            });
    };

    render()
    {
        return (
                <div>
                    <div ref={item => this.chartDiv = item}
                         style={this.props.style}
                         className={this.props.className}>
                    </div>
                    {(this.props.chartData)? null : <span>{this.notDataMessage}</span>}
                </div>
               )
    }
}

export default PieChart;
