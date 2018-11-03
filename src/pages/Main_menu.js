import React, { Component } from 'react';

class Main_menu extends Component {
    // constructor(props) {
    //     super(props);
    //     this.props.t
    // }
    render() {
        return (
            <div className="Header">
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}

export default Header;