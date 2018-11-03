import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});
class LoginForm extends Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };
    render() {
        const { classes } = this.props;
        return (
            <form noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="Pass"
                    className={classes.textField}
                    value={this.state.name}
                   
                    margin="normal"
                    variant="outlined"
                />
             
            </form>
        );
    }
}
export default withStyles(styles)(LoginForm);