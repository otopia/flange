import React, { Component } from 'react';

class Main_page extends Component {
    constructor(props)
    {
        super(props);
        
        //this.alert_msg = this.alert_msg.bind(this);
    }

    alert_msg(msg) {
        //e.preventDefault ; 
        alert(msg);
    }
    render() {
        return (
            <div className="Main_page">
                <h1>Main Page</h1>
                <h3>Welcome {this.props.title}</h3>
                <h2>Salamon ALaykom</h2>
                <button onClick={() => this.alert_msg('click')}>Test</button>
            </div>
        );
    }
}

export default Main_page;