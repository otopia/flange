import React, { Component } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NewRequest from "./pages/NewRequest";
import TableOfRequest from "./pages/TableOfRequest";
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <CustomLink server="http://localhost/Flange2/flange-back/public/main/" />
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
const CustomLink = (props) => (
  <div>
    <Route exact path="/" render={() => <TableOfRequest progress="pishfactor" server={props.server} />} />
    <Route path="/about" component={() => <h1>About</h1>} />
    <Route path="/newrequest" component={() => <NewRequest server={props.server} />} />
    <Route path="/confirmfactors" component={() => <TableOfRequest progress="factor" server={props.server} />} />
  </div>
);