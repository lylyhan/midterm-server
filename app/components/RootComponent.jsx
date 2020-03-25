/*
const React = require("react");
const ClockFace = require("./ClockFace");
const TwitterForm = require("./TwitterForm");
const TwitterList = require("./TwitterList");
const TwitterSearch = require("./TwitterSearch");
const style = require("../../public/style.css");


const RootComponent = function() {

  const [tweets, setTweets] = React.useState([]);

  const fetchTweets = async () => {
    const response = await fetch("api/tweets");
    const body = await response.json();
    setTweets(body);
  }

  //calls the endpoint to search for a user's tweets, and sets that to the list body.
  const searchTweets = async (name) => {
    const response = await fetch("user/"+name.user);
    const body = await response.json();
    setTweets(body);
  }

  //calls the endpoint to delete a specific tweet identified by user&msg, and updates list body.
  const deleteTweets = async (user, message) => {
    const response = await fetch('/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(({user, message})),
    });
    if (response.status === 200) {
        fetchTweets();
    }
  }

  //only run when specific states in the [] change. But here it is empty so it will only run once.
  //running within the browser, not on the server
  //declare as async because we are using fetch 
  // When this component loads, fetch tweets from the API
  React.useEffect(() => {
    fetchTweets();
  }, []); // Remember, an empty array as the second argument means "just do this once"


  return (
    <div>
      <h1>Hello! Welcome to Dummy Twitter!</h1>

      <p>You can search for a someone's tweet, or send out your own!</p>

      <TwitterSearch onSearched={searchTweets} reset={fetchTweets}/>
      <TwitterForm onTweeted={fetchTweets}/>
      <TwitterList tweets={tweets} onDelete={deleteTweets}/>
    </div>
  );

}

module.exports = RootComponent;



var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('canvasjs');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];   //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;

class RootComponent extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		dps.push({x: xVal,y: yVal});
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		this.chart.render();
	}
	render() {
		const options = {
			title :{
				text: "Dynamic Line Chart"
			},
			data: [{
				type: "line",
				dataPoints : dps
			}]
		}
		return (
		<div>
      <CanvasJSChart 
        options = {options} onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/ /*}
		
    </div>
		);
	}
}

module.exports = RootComponent;
*/
