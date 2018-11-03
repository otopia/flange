
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from './About';
import Login from './LoginForm'

class Home extends Component {
    render() {
        return (
            <h1>azina</h1>
        );

    }
}
class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                    <Route exact path="/login" component={Login} />
                    <hr />
                    
                    <Route exact path="/" component={Home} />
                    <hr />
                    <Route exact path="/about" component={About} />
                    <hr />
                </div>
            </Router>
        );
    }
}
export default Routes;