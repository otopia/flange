import React, { Component } from 'react';
import Header from './layout/Header';
import Main_page from './pages/Main_page';
import Footer from './layout/Footer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Addkala from "./pages/Newrequest";
import TableOfPishfactors from "./pages/TableOfPishfactors";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
    };

    this.clickhandle = this.clickhandle.bind(this);
  }

  clickhandle() {
    this.setState({
      name: 'havij'

    });
  }
  componentWillUpdate() {
    alert(this.state.name);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <CustomLink />
         <Footer />
        </div>
      </Router>
    );
  }
  componentDidMount() {
    //alert("salam");
  }
}
export default App;
const CustomLink = () => (
  <div>
    <Route exact path="/" render={() => <TableOfPishfactors />} />
    <Route path="/about" component={() => <h1>About</h1>} />
    <Route path="/newrequest" component={() => <Addkala />} />
  </div>

);