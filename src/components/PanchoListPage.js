import './PanchoListPage.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InteractiveList from './InteractiveList';
import logo from '../icon.png';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PanchoListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panchos: props.panchos
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            panchos: props.panchos
        })
    }

    render() {
        return (
            <div className="PanchoListPage">
                <div className="PanchoListPage-logo-container">
                    <img src={logo} className="PanchoListPage-logo" alt="logo" />
                </div>
                <div className="PanchoListPage-list-container">
                    <InteractiveList panchos={this.state.panchos} removePancho={this.onRemovePancho} />
                </div>
                {this.renderConfirmation()}
            </div>
        );
    }

    renderConfirmation = () => {
        let dataToRender;

        if (this.state.panchoToRemove) {
            dataToRender = (
                <Dialog
                    open={Boolean(this.state.panchoToRemove)}
                    onClose={this.handleModalNo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Was the pancho paid ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalNo} color="primary">
                        No
                        </Button>
                        <Button onClick={this.handleModalYes} color="primary">
                        Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }

        return dataToRender;
    };
    
    onRemovePancho = (panchoToRemove) => {
        this.setState({panchoToRemove: panchoToRemove});
    }

    handleModalNo = () => {
        this.setState({panchoToRemove: ''});
    }

    handleModalYes = () => {
        const {panchoToRemove} = this.state;
        
        if (panchoToRemove) {
            this.props.removePancho(panchoToRemove);
        }

        this.setState({panchoToRemove: ''});
    }
};

PanchoListPage.propTypes = {
    panchos: PropTypes.arrayOf({
        date: PropTypes.string,
        panchado: PropTypes.string,
        reason: PropTypes.string,
        _key: PropTypes.string
    }),
    removePancho: PropTypes.func.isRequired
};

export default PanchoListPage;