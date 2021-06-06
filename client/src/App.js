import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PostScreen from "./screens/PostScreen";
import EditPostScreen from "./screens/EditPostScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={HomeScreen} />
                <Route path="/login" exact component={LoginScreen} />
                <Route path="/register" exact component={RegisterScreen} />
                <Route path="/profile" exact component={ProfileScreen} />
                <Route path="/post/:id" component={PostScreen} />
                <Route path="/edit/post/:id" component={EditPostScreen} />
                <Route
                    path="/"
                    render={() => <div className="fourOfour">404🐔</div>}
                />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
