import React, { Component } from "react";
// Don't delete note

class Config extends Component {
    constructor(props) {
		super(props);
        this.state = {low: undefined, high: undefined, hue: undefined};
    }

    doFetchValues = async () =>{                          
        const response = await fetch("/api/configs"); //Lily to confirm if this is the right path
        const data = await response.json();

        //Validate
        if (typeof(data.low) === "number" && typeof(data.high) === "number" && typeof(data.hue) === "number"){
            this.setState(data);
        }else{
            console.log("not number for fetch data");
        }
    }

    updateLow = (event) =>{
        const intLow = Number.parseFloat(event.target.value);
        this.setState({low: intLow});
    }
    updateHigh = (event) =>{
        const intHigh = Number.parseFloat(event.target.value);
        this.setState({high: intHigh});
    }
    updateHue = (event) =>{
        const intHue = Number.parseInt(event.target.value);
        this.setState({hue: intHue});
    }

    async componentDidMount() { //UseEffect Lifecycle Method
        doFetchValues();
    }

    componentWillUnmount(){
    }

    asyncSubmit = async () => {
        const response = await fetch('/api/configs', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(({low, high, hue})),
        });
    }

    handleSubmit = (event) =>{
        asyncSubmit();
        event.preventDefault; //so it doesnt navigate to a new page
    }
    
	render() {
		return (
		<div>
			<form onSubmit={handleSubmit}>
            <label>
                Low: 
                <input type="number" value={this.state.low} onChange={updateLow}/>
            </label>
            <label>
                High: 
                <input type="number" value={this.state.high} onChange={updateHigh}/>
            </label>
            <label>
                Hue Color (0-360):
                <input type="number" value= {this.state.hue} onChange={updateHue}/> 
            </label>
            <input type="submit" value="Submit"/>
            <h4>Configs History</h4>
            <h6> The low is {this.state.low}. The high is {this.state.high}. The hue is {this.state.hue}.</h6>

            </form>
		</div>
		);
	}
}

export default Config;


