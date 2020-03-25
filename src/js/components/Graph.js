import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var readings = [
	{ x: new Date('2020-03-04T21:12:55.618Z'), y: 10 },
	{ x: new Date('2020-03-04T21:13:55.618Z'), y: 13 },
	{ x: new Date('2020-03-04T21:14:55.618Z'), y: 18 },
	{ x: new Date('2020-03-04T21:15:54.618Z'), y: 20 },
	{ x: new Date('2020-03-04T21:16:55.618Z'), y: 17 },
	{ x: new Date('2020-03-04T21:17:56.618Z'), y: 10 },
	{ x: new Date('2020-03-04T21:18:55.618Z'), y: 13 },
	{ x: new Date('2020-03-04T21:19:53.618Z'), y: 18 },
	{ x: new Date('2020-03-04T21:20:55.618Z'), y: 20 },
	{ x: new Date('2020-03-04T21:21:55.618Z'), y: 17 }
];


var xDate = readings[readings.length - 1]['x']; //grab the last date 
var yTemp = 15;

class Graph extends Component {
	constructor() {
		super();
		this.state = {
			intervalId: 0, 
			readings: [],
			axisXConfig: {
				title: "Time",
				interval: 2,
				intervalType: "minute"
			}
		}
		this.updateChart = this.updateChart.bind(this);
	}

	componentDidMount() {								//when graph starts, define the type and update chart.
		this.changeType(this.props.type);
		this.updateChart();	
	}

	componentWillUnmount() {								//stop the live graph once it goes out of DOM
		clearInterval(this.state.intervalId);
	}

	componentDidUpdate(prevProps) {							//check if the type of graph changed
		if (prevProps.type !== this.props.type) {
			clearInterval(this.state.intervalId);			//stop the graph from updating
			this.changeType(this.props.type);				//change the type of the graph
			this.updateChart();								//re-render the graph and update readings
		}
	}

	changeType(type) {									
		switch(type) {									//change the X axis intervals depending on type
			case 'hourly':
				this.setState({axisXConfig: {
					title: "Time",
					interval: 2,
					intervalType: "minute"
				}});
				this.startInterval(1000 * 2);			//update the graph every 2 seconds
				break;
			case 'daily':
				this.setState({axisXConfig: {
					title: "Time",
					interval: 1,
					intervalType: "hour"
				}});
				this.startInterval(1000 * 60 * 60);		//update the graph every hour
				break;
			case 'weekly':
				this.setState({axisXConfig: {
					title: "Time",
					interval: 6,
					intervalType: "hour"
				}});
				this.startInterval(1000 * 60 * 60 * 6);	//update the graph every 6 hours
				break;
		}
	}

	startInterval(milliseconds) {						//Determine how frequently the graph will refresh
		var intervalId = setInterval(this.updateChart, milliseconds);
		this.setState({intervalId: intervalId});
	}

	async grabReadings(type) {
		//fetch api call
		const response = await fetch('/api/readings/'+type, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
		//filter depending on the type of graph, select data points
		if (response.status === 200) {
            return response.body;
        } else {
			return {};
		}
	}

	AddMinutesToDate(date, minutes) {
		return new Date(date.getTime() + minutes * 60000);
	}

	updateChart() {
		var newReadings = this.grabReadings(this.props.type);	//grab a new array of readings and render it
		this.setState({readings: newReadings});
		this.chart.render();
	}

	render() {
		const options = {
			title: {
				text: "Past Hour Temperature Readings"
			},
			axisX: this.state.axisXConfig, 
			axisY: {
				title: "Temperature in Celsius"
			},
			data: [{
				type: "line",
				dataPoints: readings
			}]
		}
		return (
			<div>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}


export default Graph;