import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ReactAutocomplete from 'react-autocomplete';
import axios from 'axios';


const styles = {
    textbox: {
        color: 'blue'
    }
}
class Addkalaform extends Component {

    constructor(props) {
        super(props);
        this.state = {

            products: 'click submit',
            //form_value:[]

        };
        //this.alert_msg = this.alert_msg.bind(this);

        this.HandleTest = this.HandleTest.bind(this);
    }

    HandleSubmit() {

        alert('salllllll');
        const send_obj = {
            'method': 'get',
            'url': 'http://localhost:80/1/2.php',
            'params': this.state
        }
        axios(send_obj)
            .then((response) => {
                this.setState({
                    products: response.data

                });
            })
            .catch((error) => {
                console.log(error);
                alert(error)
            });
    }
    HandleTest(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(name + ": " + value);
        console.log(this.state);
        // console.log(React.version);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <nav class="navbar navbar-dark bg-primary">

                </nav>
                <form noValidate autoComplete="off">
                    <input type="text"
                        name="user_name"
                        style={styles.textbox}
                        onChange={this.HandleTest}
                    />
                    <br /><br />
                    <input type="text" name="password"
                        onChange={this.HandleTest}
                    />
                    <br /><br />
                    <ReactAutocomplete
                        items={[
                            { id: 'foo', label: 'foo' },
                            { id: 'bar', label: 'bar' },
                            { id: 'baz', label: 'baz' },
                        ]}
                        name="autoselect"
                        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.label}
                        renderItem={(item, highlighted) =>
                            <div
                                key={item.id}
                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                            >
                                {item.label}
                            </div>
                        }
                        value={this.state.value}
                        onChange={e => this.setState({ value: e.target.value })}
                        //onSelect={value => this.setState({ value })}
                        onSelect={this.HandleTest}
                    />
                    <p>{this.state.products}</p>
                </form>
                <button onClick={() => this.HandleSubmit()}>SUBMIT</button>
            </div>
        );
    }
}
export default (Addkalaform);