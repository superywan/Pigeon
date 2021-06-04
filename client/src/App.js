import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TaskScreen from "./screens/TaskScreen";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={TaskScreen} />
            </Switch>
        </Router>
    );
}

export default App;
