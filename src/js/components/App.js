import React, { Component } from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";
import Config from "./Config";
import { Tabs, Tab, TabList, Panel, PanelList } from 'react-tabtab';
import * as customStyle from 'react-tabtab/lib/themes/material-design';

class App extends Component {
    render() {
        return (
            <div>
                <Tabs customStyle={customStyle}>
                    <TabList>
                        <Tab>Hourly</Tab>
                        <Tab>Daily</Tab>
                        <Tab>Weekly</Tab>
                    </TabList>
                    <PanelList>
                        <Panel>
                            <Graph type={'hourly'}/>
                        </Panel>
                        <Panel>
                            <Graph type={'daily'}/>    
                        </Panel>
                        <Panel>
                            <Graph type={'weekly'}/>
                        </Panel>
                    </PanelList>
                </Tabs>
                <div><Config onSent={doFetchValues}/></div>
            </div>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById("main"));