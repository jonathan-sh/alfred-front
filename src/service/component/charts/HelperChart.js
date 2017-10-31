class HelperChart {
    static validChartData(chartData){
        return chartData!== null && typeof chartData === "object";
    }
}
export default HelperChart;
