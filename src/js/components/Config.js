import React, { Component } from "react";

class Config extends Component {
    constructor(props) {
		super(props);
		this.state = {low: 10, high: 15, hue: 360};
    }

    doFetchValues = async () =>{
        const response = await fetch("/api/configs"); //fetch
        const data = await response.json();
        this.setState(data);
    }

    updateLow = (event) =>{
        //valueUpdate();
        this.setState({low: event.target.value});
    }
    updateHigh = (event) =>{
        //valueUpdate();
        this.setState({high: event.target.value});
    }
    updateHue = (evemt) =>{
        //valueUpdate();
        this.setState({hue:event.target.value});
    }


    async componentDidMount() { //UseEffect Lifecycle Method
        doFetchValues();
    }

    componentWillUnmount(){
    }

    // valueUpdate(){
    //     this.setState({
    //         low: event.target.value, //not this.state.low
    //         high: this.state.high,
    //         hex: this.state.hue //hue
    //     });
    // }

    asyncSubmit = async () => {
        const response = await fetch('/api/configs', { //configs
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(({low, high, hue})),
        });
        if (response.status === 200) {
            this.setState({
                low: "",
                high: "",
                hue: ""
            });
            if (props.onSent) props.onSent();
        }
    }

    handleSubmit = (event) =>{
        asyncSubmit();
        event.preventDefault;
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
            </form>
		</div>
		);
	}
}

export default Graph;