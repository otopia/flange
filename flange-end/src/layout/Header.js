import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
let testvar="havijiab";
class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-light navbar-fixed-top" style={{ "backgroundColor": "#e3f2fd" }} >
                    <div className="container-fluid">
                        <form className="form-inline">
                            <Link to="/"><button className="btn btn-outline-success" type="button" style={{ "backgroundColor": "#e3f2fd", 'marginLeft': '10px' }}>صفحه اصلی</button></Link>
                            <Link to="/newrequest"><button className="btn btn-outline-success" type="button" style={{ "backgroundColor": "#e3f2fd", 'marginLeft': '10px' }} >ثبت سفارش</button></Link>
                            <Link to="/confirmfactors"><button className="btn btn-outline-success" type="button" style={{ "backgroundColor": "#e3f2fd", 'marginLeft': '10px' }} >سفارشهای تایید شده </button></Link>
                            <Link to="/about"><button className="btn btn-outline-success" type="button" style={{ "backgroundColor": "#e3f2fd", 'marginLeft': '10px' }}>درباره </button></Link>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Header;
