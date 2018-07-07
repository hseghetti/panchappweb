import './PanchoAddPage.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import _ from 'lodash';

class PanchoAddPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            reason: '',
            panched: ''
        };
    }

    render() {
        const { classes, users } = this.props;

        return (
            <div className="PanchoAddPage">
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="panched">Who was panched?</InputLabel>
                        <Select
                            value={this.state.panched}
                            onChange={this.handleSelectChange}
                            inputProps={{
                                name: 'panched',
                                id: 'panched',
                            }}
                        >
                        {_.map(users, this.renderMenuItem)}
                        </Select>
                        <TextField
                            id="reason"
                            label="Reason"
                            className={classes.textField}
                            value={this.state.reason}
                            onChange={this.handleInputChange}
                            margin="normal"
                        />
                        <Button variant="contained" size="small" className={classes.button} onClick={this.handleButtonClick}>
                            <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Save
                        </Button>
                    </FormControl>
                </form>
                {this.renderError()}
            </div>
        );
    }

    renderMenuItem = (user, index) => {
        return (
            <MenuItem value={index} key={index}>{user.name || user.email}</MenuItem>
        );
    };

    renderError = () => {
        let dataToRender;

        if (this.state.error) {
            dataToRender = (
                <Dialog
                    open={this.state.error}
                    onClose={this.handleModalClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Complete the required Information"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        You must select who was panched and the reason
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} color="primary">
                        Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }

        return dataToRender;
    };

    handleModalClose = () => {
        this.setState({error: false});
    };

    handleButtonClick = () => {
        const {panched, reason} = this.state;
        const panchedData = this.props.users[panched];

        if (panched && reason) {
            this.props.addToFirebase({
                panchado: panchedData.name || panchedData.email,
                photoURL: panchedData.photoURL || '',
                reason: reason,
                date: moment().toString(),
                group: this.props.group
            });

            this.setState({panched: '', reason: ''});
        } else {
           this.setState({error: true});
        }
    };

    handleSelectChange = event => {
        this.setState({ panched: event.target.value });
    };

    handleInputChange = event => {
        this.setState({
            reason: event.target.value,
        });
    };
}

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    }
  });

  PanchoAddPage.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    addToFirebase: PropTypes.func.isRequired,
    group: PropTypes.string.isRequired
  };

export default withStyles(styles)(PanchoAddPage);